import * as funcs from "./resolveFuns";

export default {
  Query: {
    getBranches: () => funcs.getBranches(),
    getAccounts: () => funcs.getAccounts(),
  },
  Mutation: {
    createBranch: (_: any, payload: any) => funcs.createBranch(payload),
    updateBranch: (_: any, payload: any) => funcs.updateBranch(payload),
    deleteBranch: (_: any, payload: any) => funcs.deleteBranch(payload),
    createAccount: (_: any, payload: any) => funcs.createAccount(payload),
    updateAccount: (_: any, payload: any) => funcs.updateAccount(payload),
    deleteAccount: (_: any, payload: any) => funcs.deleteAccount(payload),
    initAccounts: (_: any, payload: any) => funcs.initAccounts(payload),
  },
};
