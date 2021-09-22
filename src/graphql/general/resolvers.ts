import * as funcs from "./resolveFuns";

export default {
  Query: {
    getLastNos: () => funcs.getLastNos(),
    getCategories: (_: any, payload: any, req: any) =>
      funcs.getCategories(payload, req),
    getBrands: (_: any, payload: any, req: any) =>
      funcs.getBrands(payload, req),
    getDepartments: (_: any, payload: any, req: any) =>
      funcs.getDepartments(payload, req),
    getEmployees: (_: any, payload: any, req: any) =>
      funcs.getEmployees(payload, req),
    getCustomers: (_: any, payload: any, req: any) =>
      funcs.getCustomers(payload, req),
    getSuppliers: (_: any, payload: any, req: any) =>
      funcs.getSuppliers(payload, req),
    getItems: (_: any, payload: any, req: any) => funcs.getItems(payload, req),
    getServices: (_: any, payload: any, req: any) =>
      funcs.getServices(payload, req),
    getProducts: (_: any, payload: any, req: any) =>
      funcs.getProducts(payload, req),
    getNoStockProducts: (_: any, payload: any, req: any) =>
      funcs.getNoStockProducts(payload, req),
    getChartsData: (_: any, payload: any, req: any) =>
      funcs.getChartsData(payload, req),
    getSimpleChartsData: (_: any, payload: any, req: any) =>
      funcs.getSimpleChartsData(payload, req),
    getCompany: () => funcs.getCompany(),
  },
  Mutation: {
    createCategory: (_: any, payload: any, req: any) =>
      funcs.createCategory(payload, req),
    updateCategory: (_: any, payload: any) => funcs.updateCategory(payload),
    deleteCategory: (_: any, payload: any) => funcs.deleteCategory(payload),
    createBrand: (_: any, payload: any, req: any) =>
      funcs.createBrand(payload, req),
    updateBrand: (_: any, payload: any) => funcs.updateBrand(payload),
    deleteBrand: (_: any, payload: any) => funcs.deleteBrand(payload),
    createDepartment: (_: any, payload: any, req: any) =>
      funcs.createDepartment(payload, req),
    updateDepartment: (_: any, payload: any) => funcs.updateDepartment(payload),
    deleteDepartment: (_: any, payload: any) => funcs.deleteDepartment(payload),
    createEmployee: (_: any, payload: any, req: any) =>
      funcs.createEmployee(payload, req),
    updateEmployee: (_: any, payload: any) => funcs.updateEmployee(payload),
    deleteEmployee: (_: any, payload: any) => funcs.deleteEmployee(payload),
    createCustomer: (_: any, payload: any, req: any) =>
      funcs.createCustomer(payload, req),
    updateCustomer: (_: any, payload: any) => funcs.updateCustomer(payload),
    deleteCustomer: (_: any, payload: any) => funcs.deleteCustomer(payload),
    createSupplier: (_: any, payload: any, req: any) =>
      funcs.createSupplier(payload, req),
    updateSupplier: (_: any, payload: any) => funcs.updateSupplier(payload),
    deleteSupplier: (_: any, payload: any) => funcs.deleteSupplier(payload),
    createItem: (_: any, payload: any, req: any) =>
      funcs.createItem(payload, req),
    updateItem: (_: any, payload: any) => funcs.updateItem(payload),
    deleteItem: (_: any, payload: any) => funcs.deleteItem(payload),
    runClosing: (_: any, __: any, req: any) => funcs.runClosing(req),
    updateCompany: (_: any, payload: any) => funcs.updateCompany(payload),
  },
};
