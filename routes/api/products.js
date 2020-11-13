import {Router} from 'express';
import productsCtrl from '../../controllers/products';
import { uploadExcel } from "../../middleware/uploadExcelFile";
import {auth} from '../../middleware/auth';


const router = Router();

router.post("/upload",auth, uploadExcel.single('file'),productsCtrl.uploadFile);

export default router;