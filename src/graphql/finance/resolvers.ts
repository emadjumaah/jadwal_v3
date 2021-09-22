import * as funcs from "./resolveFuns";

export default {
  Query: {
    getFinances: (_: any, payload: any, req: any) =>
      funcs.getFinances(payload, req),
    getGeneralFinances: (_: any, payload: any, req: any) =>
      funcs.getGeneralFinances(payload, req),
    getReceipts: (_: any, payload: any, req: any) =>
      funcs.getReceipts(payload, req),
    getRasseds: (_: any, __: any, req: any) => funcs.getRasseds(req),
    getSalesReport: (_: any, payload: any, req: any) =>
      funcs.getSalesReport(payload, req),
    getFinanceReport: (_: any, payload: any, req: any) =>
      funcs.getFinanceReport(payload, req),
    getMonthlyReport: (_: any, payload: any, req: any) =>
      funcs.getMonthlyReport(payload, req),
    getSalesChartData: (_: any, payload: any, req: any) =>
      funcs.getSalesChartData(payload, req),
    getTodaySales: (_: any, __: any, req: any) => funcs.getTodaySales(req),
    getTodayEvents: (_: any, __: any, req: any) => funcs.getTodayEvents(req),
    getDaysEvents: (_: any, payload: any, req: any) =>
      funcs.getDaysEvents(payload, req),
    getDaysSales: (_: any, payload: any, req: any) =>
      funcs.getDaysSales(payload, req),
    getMonthsSales: (_: any, payload: any, req: any) =>
      funcs.getMonthsSales(payload, req),
    getMonthsEvents: (_: any, payload: any, req: any) =>
      funcs.getMonthsEvents(payload, req),
    getAccountsRaseed: (_: any, __: any, req: any) =>
      funcs.getAccountsRaseed(req),
    getLandingChartData: (_: any, __: any, req: any) =>
      funcs.getLandingChartData(req),
  },
  Mutation: {
    createFinance: (_: any, payload: any, req: any) =>
      funcs.createFinance(payload, req),
    updateFinance: (_: any, payload: any) => funcs.updateFinance(payload),
    deleteFinance: (_: any, payload: any) => funcs.deleteFinance(payload),
    createGeneralFinance: (_: any, payload: any, req: any) =>
      funcs.createGeneralFinance(payload, req),
    updateGeneralFinance: (_: any, payload: any) =>
      funcs.updateGeneralFinance(payload),
    deleteGeneralFinance: (_: any, payload: any) =>
      funcs.deleteGeneralFinance(payload),
  },
};
