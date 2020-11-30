import db from "../seka/models";
import {
  HTTP_EXIST,
  HTTP_OK,
  HTTP_SERVER_ERROR,
} from "../constants/statusCodes";
import { SERVER_ERROR } from "../constants/errorMessages";
import { findCategory } from "../utils/categories";
import {
  ALL_CATEGORIES,
  DELETED_CATEGORY,
  SUCCESSFUL_UPDATE_CATEGORY,
} from "../constants/successMessages";

export default class Category {
  static async addCategory(req, res) {
    const { name } = req.body;
    const category = await db.Category.findOne({
      where: { name: name.toLowerCase().trim().replace(/\s/g, "") },
    });
    if (category) {
      return res.status(HTTP_EXIST).json({
        status: HTTP_EXIST,
        message: CATEGORY_EXIST,
      });
    }

    const data = await db.Category.create({
      name: name.toLowerCase().trim().replace(/\s/g, ""),
    });

    return res.status(HTTP_OK).json({
      status: HTTP_OK,
      message: "Category created successfully",
      data,
    });
  }


  static async updateCategory(req, res) {
    try {
      const { categoryId } = req.params;
      await findCategory(categoryId);
      const [_, data] = await db.Category.update(
        { ...req.body },
        { where: { id: categoryId }, returning: true }
      );
      return res.status(HTTP_OK).json({
        status: HTTP_OK,
        message: SUCCESSFUL_UPDATE_CATEGORY,
        data: data[0],
      });
    } catch (err) {
      console.log(err);

      return res.status(500).json({
        status: HTTP_SERVER_ERROR,
        err: SERVER_ERROR,
      });
    }
  }

  static async deleteCategory(req, res) {
    try {
      const { categoryId } = req.params;

      await findCategory(categoryId);

      await db.Category.destroy({ where: { id: categoryId } });
      return res.status(HTTP_OK).json({
        status: HTTP_OK,
        message: DELETED_CATEGORY,
      });
    } catch (err) {
      console.log(err);

      return res.status(500).json({
        status: HTTP_SERVER_ERROR,
        err: SERVER_ERROR,
      });
    }
  }
}
