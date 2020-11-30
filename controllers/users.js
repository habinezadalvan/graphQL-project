import bcrypt from "bcrypt";
import db from "../seka/models";
import {
  HTTP_BAD_REQUEST,
  HTTP_CREATED,
  HTTP_EXIST,
  HTTP_NOT_FOUND,
  HTTP_OK,
  HTTP_SERVER_ERROR,
} from "../constants/statusCodes";
import {
  EMAIL_EXIST,
  INCORRECT_USER,
  SERVER_ERROR,
} from "../constants/errorMessages";
import { generateToken, hashPassword } from "../helpers/authHelpers";
import { SUCCESS_USER_CREATION } from "../constants/successMessages";
import { findUser } from "../utils/user";

export default class User {
  static async createUser(req, res) {
    try {
      const { username, email, password: passcode, role } = req.body;
      const user = await db.User.findOne({ where: { email }, raw: true });
      if (user) {
        return res.status(HTTP_EXIST).json({
          status: HTTP_EXIST,
          message: EMAIL_EXIST,
        });
      }

      const hash = await hashPassword(passcode);

      const dataToSave = {
        username,
        email,
        password: hash,
        role,
      };

      const data = await db.User.create(dataToSave);

      const token = await generateToken({
        id: data.id,
        email: data.email,
        role: data.role,
      });

      res.setHeader("Authorization", `Bearer ${token}`);

      const { password, ...rest } = data.get();

      return res.status(HTTP_CREATED).json({
        status: HTTP_CREATED,
        message: SUCCESS_USER_CREATION,
        data: rest,
        token,
      });
    } catch (err) {
      console.log("err.message", err.message);
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await db.User.findOne({ where: { email }, raw: true });

      if (!user) {
        return res.status(HTTP_NOT_FOUND).json({
          status: HTTP_NOT_FOUND,
          message: INCORRECT_USER,
        });
      }
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return res.status(HTTP_NOT_FOUND).json({
          status: HTTP_NOT_FOUND,
          message: INCORRECT_USER,
        });
      }

      const token = await generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      res.setHeader("Authorization", `Bearer ${token}`);

      return res.status(HTTP_OK).json({
        status: HTTP_OK,
        token,
      });
    } catch (err) {
      console.log("err.message", err.message);
      return res.status(HTTP_SERVER_ERROR).json({
        status: HTTP_SERVER_ERROR,
        message: SERVER_ERROR,
      });
    }
  }
}
