import xlsx from 'xlsx';
import db from '../seka/models';
import { REQUIRED_FIELDS } from '../constants/errorMessages';
import * as constants from '../constants/statusCodes';
import { HTTP_BAD_REQUEST, HTTP_NOT_FOUND } from '../constants/statusCodes';
import { NOT_FOUND, EMPTY_SHEET, UPLOAD_FILE } from '../constants/errorMessages';

/**
 * @description Upload excel file class
 * @returns {object} uploaded file
 */
class Products {

  /**
   * @description Upload excel file function
   * @param {object} req request from the user
   * @param {object} res response to the user
   * @returns {object} uploaded file
   */
  static async uploadFile(req, res ) {
    const uploadingUser = await db.User.findOne({ where: { id: req.user.id }, raw: true });

    if (!uploadingUser) {
      return res.status(constants.HTTP_NOT_FOUND).json({
        status: HTTP_NOT_FOUND,
        err: `User ${NOT_FOUND}`,
      });
    }

    if (!req.file) {
      return res.status(constants.HTTP_BAD_REQUEST).json({
        status: HTTP_BAD_REQUEST,
        message: UPLOAD_FILE,
      });
    }
    const wb = xlsx.readFile(req.file.path, { cellDates: true });

    const sheetnames = wb.SheetNames;

    const { sheet } = req.body;

    let sheetToUpload;

    if (sheetnames.length === 1) {
      sheetToUpload = sheetnames[0];
    }

    if (!sheet && sheetnames.length > 1) {
      return res.status(200).json({
        status: 200,
        sheets: sheetnames,
        massage: 'Please select a sheet to upload',
      });
    }
    if (sheet) sheetToUpload = sheet;

    const ws = wb.Sheets[sheetToUpload];

    const data = xlsx.utils.sheet_to_json(ws);

    if (data.length === 0) {
      return res.status(constants.HTTP_BAD_REQUEST).json({
        status: HTTP_BAD_REQUEST,
        message: EMPTY_SHEET,
      });
    }

    const columns = Object.keys(data[0]).map((v) => v.toLowerCase().trim().replace(/[ ]/g, ''));

    const err = [];

    // the remaining is to make add all possible essential fields

    const validInput = ['title', 'description', 'price', 'image', 'number_of_sales', 'is_featured', 'category'];

    for (const input of validInput) {
      if (!columns.includes(input.toLowerCase())) {
        err.push(`${input} column is missing or it's in a wrong format.`);
      }
    }

    if (err.length) {
      return res.status(HTTP_BAD_REQUEST).json({
        status: HTTP_BAD_REQUEST,
        message: REQUIRED_FIELDS,
        err,
      });
    }

    const sheetData = [];
    data.map(async (info) => {
      const row = {} ;
      Object.keys(info).forEach((key) => {
        row[key.toLowerCase().trim().replace(/[ ]/g, '')] = info[key];
      });
      sheetData.push(row);
    });

    // the remaining is the add the event condition

    await db.Product.destroy({
      where: { registerId: req.user.id },
    });

    // the remaining is to update the object with eventId

    const result = await db.Product.bulkCreate(sheetData.map((record) => ({ ...record, registerId: req.user.id })));

    return res.status(200).json({
      message: 'File uploaded successfully',
      result,
    });
  }
}

export default Products;
