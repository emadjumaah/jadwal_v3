import mongoose from "mongoose";
import { dboptions } from "../constant";

(<any>mongoose).Promise = Promise;

mongoose.connection.on("connected", () => {
  console.log("Connection Established");
});

mongoose.connection.on("reconnected", () => {
  console.log("Connection Reestablished");
});

mongoose.connection.on("disconnected", () => {
  console.log("Connection Disconnected");
});

mongoose.connection.on("close", () => {
  console.log("Connection Closed");
});

mongoose.connection.on("error", (error) => {
  console.log("ERROR: " + error);
});

export const startMongo = async (dbUrl: string) => {
  if (mongoose.connection.readyState >= 1) return;
  try {
    await mongoose.connect(dbUrl, dboptions);
    if (process.env.NODE_ENV === "development") {
      mongoose.set("debug", true);
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
