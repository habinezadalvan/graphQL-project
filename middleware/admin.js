import {checkUser} from '../utils/user';
import {HTTP_ACCESS_DENIED} from '../constants/statusCodes';
import { ACCESS_DENIED } from '../constants/errorMessages';

export const isAdmin = async (req, res,next) => {
    const {email, role} = req.user;

    await checkUser(email);

    if (role !== 'admin'){
        return res.status(HTTP_ACCESS_DENIED).json({
            status: HTTP_ACCESS_DENIED,
            message: ACCESS_DENIED
        })
    }

    return next();

}