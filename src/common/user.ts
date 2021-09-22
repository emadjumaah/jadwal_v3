import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";

const CERT_SECRET = "HS1zM6udk7yNJMkFsbe5HazlF917Fti9";
const JWT_SECRET = "gxSI6Coe9CzuXL3t";

const salt = CERT_SECRET.slice(0, 10);

export const hashPassword = (password: any) => {
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return hash;
};

export const validPassword = (password: any, hash: any) => {
  const passwordhash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return hash === passwordhash;
};

export const createToken = ({
  _id,
  type,
  isSuperAdmin,
  isDepartAdmin,
  roles,
  branch,
  systems,
  // expiresIn,
  count,
}: any) => {
  return jwt.sign(
    {
      _id,
      type,
      isSuperAdmin: isSuperAdmin ? isSuperAdmin : false,
      isDepartAdmin: isDepartAdmin ? isDepartAdmin : false,
      roles: roles ? JSON.parse(roles) : "",
      branch: branch ? branch : "",
      systems: systems ? systems : "",
      count,
    },
    JWT_SECRET
    // {
    //   expiresIn,
    // }
  );
};
