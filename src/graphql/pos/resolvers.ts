import * as funcs from "./resolveFuns";

export default {
  Query: {
    getInvoices: (_: any, payload: any, req: any) =>
      funcs.getInvoices(payload, req),
    getInvoicesList: (_: any, payload: any, req: any) =>
      funcs.getInvoicesList(payload, req),
    getOperationItems: (_: any, payload: any) =>
      funcs.getOperationItems(payload),
    getOperationKaids: (_: any, payload: any) =>
      funcs.getOperationKaids(payload),
  },
  Mutation: {
    createInvoice: (_: any, payload: any, req: any) =>
      funcs.createInvoice(payload, req),
    updateInvoice: (_: any, payload: any) => funcs.updateInvoice(payload),
    deleteInvoice: (_: any, payload: any) => funcs.deleteInvoice(payload),
  },
};
