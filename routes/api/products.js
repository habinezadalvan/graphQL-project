import {Router} from 'express';
import productsCtrl from '../../controllers/products';
import { uploadExcel } from "../../middleware/uploadExcelFile";
import {auth} from '../../middleware/auth';
import { isAdmin } from '../../middleware/admin';
import { fileParser} from '../../middleware/imageUpload';
import validator from '../../middleware/joiValidator';
import { productSchema, updateProductSchema } from '../../utils/schema/product';
import FetchProductsCtrl from '../../controllers/fetch-products';


const router = Router();

router.get("/", FetchProductsCtrl.allProducts);
router.get("/:productId", FetchProductsCtrl.singleProduct);
router.post("/upload",auth, uploadExcel.single('file'),productsCtrl.uploadFile);
router.post("/create",auth, isAdmin, validator(productSchema),fileParser ,productsCtrl.addProduct);
router.put("/update",auth, isAdmin, validator(updateProductSchema),fileParser ,productsCtrl.updateProduct);

export default router;