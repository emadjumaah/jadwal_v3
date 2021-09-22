import * as funcs from "./resolveFuns";
import { requiresAuth } from "../../connect/helper";

export default {
  Query: {
    getUsers: (_: any, __: any, req: any) => funcs.getUsers(req),
  },
  Mutation: {
    signup: (_: any, payload: any) => funcs.signup(payload),
    login: (_: any, payload: any) => funcs.login(payload),
    changePassword: (_: any, payload: any) => funcs.changePassword(payload),
    updateUser: (_: any, payload: any) => funcs.updateUser(payload),
    deleteUser: (_: any, payload: any, req: any) =>
      funcs.deleteUser(payload, req),
    blockUser: (_: any, payload: any) => funcs.blockUser(payload),
    me: requiresAuth.createResolver(async (_: any, payload: any, req: any) => {
      console.log("payload", payload);
      console.log("req", req);
    }),
  },
};
