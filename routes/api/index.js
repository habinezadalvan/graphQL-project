import {Router} from 'express';
import productsRoutes from './products';
import usersRoutes from './users';



const router = Router();

router.use("/products", productsRoutes);
router.use("/users", usersRoutes);

export default router;