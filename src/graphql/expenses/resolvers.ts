import * as funcs from "./resolveFuns";

export default {
  Query: {
    getExpenses: (_: any, payload: any, req: any) =>
      funcs.getExpenses(payload, req),
  },
  Mutation: {
    createExpenses: (_: any, payload: any, req: any) =>
      funcs.createExpenses(payload, req),
    updateExpenses: (_: any, payload: any) => funcs.updateExpenses(payload),
    deleteExpenses: (_: any, payload: any) => funcs.deleteExpenses(payload),
  },
};
