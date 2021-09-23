import path from "path";
import express from "express";
import cors from "cors";
import http from "http";
import { ApolloServer } from "apollo-server-express";
//@ts-ignore
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { checkLicens } from "../common/check";
import { initServer } from "../common/initServer";
import { getUserFromToken } from "../connect/helper";
import { startMongo } from "../connect/mongo";
import { fileDirectory, imageDirectory, LOCAL_DB_URL } from "../constant";
import { uploadfile, uploadimage } from "../connect/multer";
import { createDataDirectories } from "../connect/createDir";
import { startCronJobs } from "../connect/cron";
import { typeDefs, resolvers } from "../graphql";

declare const process: {
  env: {
    DB_URL: string;
    PORT: number;
    EXPRESS_PORT: number;
  };
};

export const runLocalServer = async () => {
  const isValid = await checkLicens();
  if (!isValid) {
    console.log("SERVER NOT VALID");
    return;
  }
  createDataDirectories();
  await startMongo(LOCAL_DB_URL);

  const app = express();

  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: async ({ req }: any) => {
      const token = req.headers.authorization || "";
      const user = await getUserFromToken(token);
      return { user };
    },
  });
  app.use(cors());
  app.use("/", express.static(path.join(__dirname, "../../client")));
  app.use("/images", express.static(imageDirectory));
  app.use("/files", express.static(fileDirectory));

  app.post("/uploadimage", (req, res) => {
    uploadimage(req, res, (err: any) => {
      if (err) {
        console.log(err);
      } else {
        if (req.file == undefined) {
          console.log("Error: No File Selected!");
        } else {
          res.end(
            JSON.stringify({
              path: `/images/${req.file.filename}`,
              name: req.file.filename,
            })
          );
        }
      }
    });
  });

  app.post("/uploadfile", (req: any, res: any) => {
    uploadfile(req, res, (err: any) => {
      if (err) {
        console.log(err);
      } else {
        if (req.file == undefined) {
          console.log("Error: No File Selected!");
        } else {
          res.end(
            JSON.stringify({
              path: `/files/${req.file.filename}`,
              name: req.file.filename,
            })
          );
        }
      }
    });
  });

  await server.start();
  server.applyMiddleware({ app });
  await new Promise((resolve: any) =>
    httpServer.listen({ port: process.env.PORT || 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  app.get("/", function (_req: any, res: any) {
    res.sendFile(path.join(__dirname, "../../client") + "/index.html");
  });

  setTimeout(() => {
    startCronJobs();
    initServer();
  }, 5000);
};
