import { INVALID_TOKEN, TOKEN_REQUIRED } from '../constants/errorMessages';
import { HTTP_UNAUTHORIZED } from '../constants/statusCodes';
import {decode} from '../helpers/authHelpers';
import db from '../seka/models';
import {checkUser} from '../utils/user';


export const auth = async (req, res, next) => {
let token = req.header('x-access-token') || req.header('Authorization');
  if (!token) {
    return res.status(HTTP_UNAUTHORIZED).json({
      status: HTTP_UNAUTHORIZED,
      message: TOKEN_REQUIRED,
    });
  }
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }
  try {
    const decoded = decode(token);
    const { id, email } = decoded;
    checkUser(email);
    req.user = {
        id,
        email
    };
    return next();
  } catch (err) {
    console.log('err.message', err.message);
    return res.status(HTTP_UNAUTHORIZED).json({
      status: HTTP_UNAUTHORIZED,
      message: INVALID_TOKEN,
    });
  }
}