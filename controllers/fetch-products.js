import { HTTP_OK } from "../constants/statusCodes";
import { ALL_PRODUCTS } from "../constants/successMessages";
import db from "../seka/models";
import { fetchProduct } from "../utils/products";

export default class FetchProducts {
  static async allProducts(req, res) {
    const products = await db.Product.findAll();
    return res.status(HTTP_OK).json({
      status: HTTP_OK,
      message: ALL_PRODUCTS,
      products,
    });
  }
  static async singleProduct(req, res) {
    const { productId } = req.params;
    const prdt = await fetchProduct(productId);
    return res.status(HTTP_OK).json({
      status: HTTP_OK,
      prdt,
    });
  }
}
