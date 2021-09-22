/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import * as fs from "fs";
import {
  imageDirectory,
  fileDirectory,
  backupDirectory,
  licenseDirectory,
} from "../constant";

export const createDataDirectories = () => {
  if (!fs.existsSync(imageDirectory)) {
    fs.mkdir(imageDirectory, { recursive: true }, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("New imageDirectory directory successfully created.");
      }
    });
  }
  if (!fs.existsSync(fileDirectory)) {
    fs.mkdir(fileDirectory, { recursive: true }, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("New fileDirectory directory successfully created.");
      }
    });
  }
  if (!fs.existsSync(backupDirectory)) {
    fs.mkdir(backupDirectory, { recursive: true }, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("New backupDirectory directory successfully created.");
      }
    });
  }
  if (!fs.existsSync(licenseDirectory)) {
    fs.mkdir(licenseDirectory, { recursive: true }, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("New licenseDirectory directory successfully created.");
      }
    });
  }
};
