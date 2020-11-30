"use strict";
const multer = require("multer");
const cloudinary = require("cloudinary");
const { unlinkSync } = require("fs");
import {SERVER_ERROR} from '../constants/errorMessages';
import {HTTP_SERVER_ERROR} from '../constants/statusCodes';

const storage = multer.diskStorage({});
cloudinary.config(process.env.CLOUDINARY_URL);

function filter(req, file, cb) {
  if (/image\//.test(file.mimetype)) {
    cb(null, true);
  } else {
    cb("unsupported file format, we accept only images.", false);
  }
}

export const fileParser = multer({
  storage,
  filter,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5mb is the limit file size
    files: 1,
  },
}).single("file");

export async function uploadFile(req, res) {
  const {
    file: { path },
  } = req;
  cloudinary.uploader
    .upload(path)
    .then((img) => {
      return img.secure_url;
    })
    .catch((err) => {
      res.status(500).json({
        status: HTTP_SERVER_ERROR,
        err: SERVER_ERROR
      });
      console.log(err);
    });
  unlinkSync(path);
}


