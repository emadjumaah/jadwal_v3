import express from "express";
import http from "http";
import path from "path";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
//@ts-ignore
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { initServer } from "../common/initServer";
import { getUserFromToken } from "../connect/helper";
import { startMongo } from "../connect/mongo";
import { typeDefs, resolvers } from "../graphql";

declare const process: {
  env: {
    DB_URL: string;
    PORT: number;
  };
};

export const runOnlineServer = async () => {
  await startMongo(process.env.DB_URL);

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
    initServer();
  }, 5000);
};
