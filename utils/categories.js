import { CATEGORY_NO_FOUND } from '../constants/errorMessages';
import { HTTP_NOT_FOUND } from '../constants/statusCodes';
import db from '../seka/models';


export const findCategory = (id) => async (req, res) => {
    const category = await db.Category.findById({where: {id}, raw: true});
    if(!category){
        return res.status(HTTP_NOT_FOUND).json({
            status: HTTP_NOT_FOUND,
            message: CATEGORY_NO_FOUND,
        })
    }
    return category;
}