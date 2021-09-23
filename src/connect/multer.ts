/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-use-before-define */
import multer = require("multer");
import path = require("path");
import { fileDirectory, imageDirectory } from "../constant";

const storageimage = multer.diskStorage({
  destination: imageDirectory,
  filename: function (
    req: any,
    file: { originalname: string },
    cb: (arg0: null, arg1: string) => void
  ) {
    cb(null, "image" + "-" + Date.now() + path.extname(file.originalname));
  },
});
const storagefile = multer.diskStorage({
  destination: fileDirectory,
  filename: function (
    req: any,
    file: { originalname: string },
    cb: (arg0: null, arg1: string) => void
  ) {
    cb(null, "file" + "-" + Date.now() + path.extname(file.originalname));
  },
});

export const uploadimage = multer({
  storage: storageimage,
  limits: { fileSize: 5000000 },
  fileFilter: function (req: any, file: any, cb: any) {
    checkImageType(file, cb);
  },
}).single("file");

export const uploadfile = multer({
  storage: storagefile,
  limits: { fileSize: 10000000 },
}).single("file");

function checkImageType(file: any, cb: any) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}
