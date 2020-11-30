import {Router} from 'express';
import categoryCtrl from '../../controllers/categories';
import validateInput from '../../middleware/joiValidator';
import {categorySchema, updateCategorySchema} from '../../utils/schema/userSchema';
import {auth} from '../../middleware/auth';
import {isAdmin} from '../../middleware/admin';
import FetchCategories from '../../controllers/fetch-categories';

const router = Router();

router.get("/", FetchCategories.allCategories);
router.post("/create",auth, isAdmin, validateInput(categorySchema), categoryCtrl.addCategory);
router.put("/:categoryId", auth, isAdmin, validateInput(updateCategorySchema), categoryCtrl.updateCategory);
router.delete("/:categoryId", auth, isAdmin, categoryCtrl.deleteCategory);



export default router;