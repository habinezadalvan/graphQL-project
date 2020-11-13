import {Router} from 'express';
import userCtrl from '../../controllers/users';
import validateInput from '../../middleware/joiValidator';
import {signUpSchema, loginSchema} from '../../utils/schema/userSchema';

const router = Router();

router.post("/signup", validateInput(signUpSchema), userCtrl.signUp);
router.post("/login", validateInput(loginSchema), userCtrl.login);



export default router;