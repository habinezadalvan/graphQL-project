import {Router} from 'express';
import productsRoutes from "./products";
import categoriesRoutes from "./categories";
import usersRoutes from './users';



const router = Router();

router.use("/products", productsRoutes);
router.use("/categories", categoriesRoutes);
router.use("/users", usersRoutes);

export default router;