require("dotenv").config();

const runSerrver = () => {
  const local = process.env.LOCAL_SERVER;
  if (local) {
    const { runLocalServer } = require("./server/local");
    runLocalServer();
  } else {
    const { runOnlineServer } = require("./server/online");
    runOnlineServer();
  }
};

runSerrver();
