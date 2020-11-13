/* eslint-disable import/prefer-default-export */
import multer from "multer";

export const uploadExcel = multer({
  storage: multer.diskStorage({}),
  fileFilter: (_, file, cb) => {
    const originalNameArr = file.originalname.split(".");
    const mimtype = originalNameArr[originalNameArr.length - 1];
    if (!mimtype.match(/[xlsx | xlsm| xlsb]/i)) {
      return cb(null, false);
    }
    return cb(null, true);
  },
});
