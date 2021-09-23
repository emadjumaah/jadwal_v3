require("dotenv").config();

const runSerrver = () => {
  if (process.env.NODE_ENV === "production") {
    const { runOnlineServer } = require("./server/online");
    console.log("Running ONLINE");
    runOnlineServer();
  } else {
    const { runLocalServer } = require("./server/local");
    console.log("Running LOCAL");
    runLocalServer();
  }
};

runSerrver();
