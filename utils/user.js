import db from '../seka/models';
import {HTTP_NOT_FOUND, HTTP_EXIST} from '../constants/statusCodes';
import {NOT_FOUND} from '../constants/errorMessages';


export const checkUser = (email) => async (req, res) => {
  const user = await db.User.findOne({
    where: { email },
    raw: true,
  });
  if (!user) {
    return res.status(HTTP_NOT_FOUND).json({
      status: HTTP_NOT_FOUND,
      message: NOT_FOUND,
    });
  }
  return user;
};