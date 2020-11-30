import {Router} from 'express';
import userCtrl from '../../controllers/users';
import validateInput from '../../middleware/joiValidator';
import {signUpSchema, loginSchema} from '../../utils/schema/userSchema';
import {auth} from '../../middleware/auth';
import {isAdmin} from '../../middleware/admin';

const router = Router();

router.post("/create",auth, isAdmin, validateInput(signUpSchema), userCtrl.createUser);
router.post("/login", validateInput(loginSchema), userCtrl.login);



export default router;