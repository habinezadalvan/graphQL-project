import {HTTP_BAD_REQUEST} from '../constants/statusCodes';
import { MISSING_INVALID_FIELDS } from "../constants/errorMessages";

export default (schema) => async (req, res, next) => {
  const { error } = await schema.validate(req.body, { abortEarly: false });
  if(error){
      const errors = [];
      error.details.forEach(err => {
        errors.push(err.message.replace(/"/g, ''))
      });
      return res.status(HTTP_BAD_REQUEST).json({
        status: HTTP_BAD_REQUEST,
        message: MISSING_INVALID_FIELDS,
        errors,
      });
  }
  return next();
};