import { HTTP_OK } from '../constants/statusCodes';
import { ALL_CATEGORIES } from '../constants/successMessages';
import db from '../seka/models';


export default class FetchCategories {
  static async allCategories(_, res) {
    const categories = await db.Category.findAll();
    return res.status(HTTP_OK).json({
      status: HTTP_OK,
      message: ALL_CATEGORIES,
      categories,
    });
  }
  static async SearchByCategory (req, res){
    const {} = req.query;
  }
}