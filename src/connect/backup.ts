/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable import/no-unresolved */

import fs = require("fs");
import util = require("util");
import { exec } from "child_process";
import { backupOptions } from "../constant";
import { getTimeDirName } from "./helper";
const asyncExec = util.promisify(exec);

export const autoBackupDB = async () => {
  const { host, port, database, path } = backupOptions;
  const now = new Date();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const pirfex = "auto-";
  const nowPath = path + pirfex + getTimeDirName(now);
  const dayPath = path + pirfex + getTimeDirName(yesterday);
  const removePath = yesterday.getHours() !== 0 ? dayPath : null;
  const cmdloc = `mongodump --host ${host} --port ${port} --db ${database} --out ${nowPath}`;
  // const cmduri = `mongodump --uri ${process.env.DB_URL_BACKUP} --out ${nowPath}`;

  try {
    // if (process.env.NODE_ENV !== "production") {
    //   await asyncExec(cmduri);
    // } else {
    //   await asyncExec(cmdloc);
    // }
    await asyncExec(cmdloc);

    if (removePath && fs.existsSync(removePath)) {
      exec("rm -rf " + removePath);
    }
    console.log("DONE DB BACKUP ...");

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
export const manualBackupDB = async () => {
  const { host, port, database, path } = backupOptions;
  const now = new Date();

  const pirfex = "manual-";
  const nowPath = path + pirfex + getTimeDirName(now);
  const cmd = `mongodump --host ${host} --port ${port} --db ${database} --out ${nowPath}`;

  try {
    await asyncExec(cmd);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const restoreDBfromPath = async (path: string) => {
  const { host, port } = backupOptions;
  const cmd = `mongorestore --host ${host} --port ${port} ${path} --drop`;
  console.log("cmd", cmd);
  try {
    await asyncExec(cmd);
    console.log("RESTORE ONE ...");

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
