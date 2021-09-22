import fs from "fs";
import { execSync } from "child_process";
import { publicDecrypt, pbkdf2Sync } from "crypto";
import { licenseDirectory, publicKey } from "../constant";

const salt = publicKey.slice(100, 110);

export const getMID = () => {
  const response = execSync("wmic csproduct get UUID");
  const mid = String(response)?.split("\n")?.[1].trim();
  return mid;
};

const decrypt = (msg: any) => {
  try {
    const decryptBuffer = Buffer.from(msg, "base64");
    const decrypted = publicDecrypt(publicKey, decryptBuffer);
    const data = decrypted.toString();
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
};

const validHash = (password: any, hash: any) => {
  const passwordhash = pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(
    `hex`
  );
  return hash === passwordhash;
};

export const checkLicens = async () => {
  // const file = "license.pem";
  const file = `${licenseDirectory}license.pem`;
  const mid: any = getMID();
  if (!fs.existsSync(file)) return false;
  const license = fs.readFileSync(file, "utf8");
  const decLicense = decrypt(license);
  const valid = validHash(mid, decLicense);
  if (valid) {
    console.log("SERVER VALID");
    return true;
  } else {
    return false;
  }
};
