import { gql } from "apollo-server-express";

export default gql`
  type ResponseWithKaids {
    ok: Boolean
    data: [Kaid]
    message: String
    count: Int
    error: String
  }

  type Kaid {
    _id: String
    branch: String
    shareId: String

    opId: String
    opType: Int
    opTime: Date
    opDocNo: String
    customerId: String
    customerName: String
    customerNameAr: String
    supplierId: String
    supplierName: String
    supplierNameAr: String
    departmentId: String
    departmentName: String
    departmentNameAr: String
    employeeId: String
    employeeName: String
    employeeNameAr: String

    refNo: String
    refType: Int

    eventId: Int
    taskId: Int

    desc: String

    categoryId: String
    itemBarcode: String
    categoryName: String
    categoryNameAr: String
    itemId: String
    itemType: Int
    itemName: String
    itemNameAr: String
    itemDesc: String
    qty: Float
    itemCost: Float
    itemPrice: Float

    accId: String
    accCode: Int
    accType: Int
    accName: String
    accNameAr: String
    accPCode: Int
    accParent: String

    opaccId: String
    opaccCode: Int
    opaccType: Int
    opaccName: String
    opaccNameAr: String
    opaccPCode: Int
    opaccParent: String

    kaidType: Int
    amount: Float
    debit: Float
    credit: Float

    userId: String
    note: String

    createdAt: Date
    updatedAt: Date
  }

  extend type Query {
    getFinances(start: Date, end: Date, search: String): ResponseWithOperations
    getGeneralFinances(
      start: Date
      end: Date
      search: String
    ): ResponseWithOperations
    getReceipts(start: Date, end: Date, search: String): ResponseWithOperations
    getRasseds: Response
    getSalesReport(
      itemId: String
      categoryId: String
      departmentId: String
      employeeId: String
      customerId: String
      supplierId: String
      start: Date
      end: Date
    ): ResponseWithKaids
    getFinanceReport(
      accCode: Int
      accPCode: Int
      opaccCode: Int
      opaccPCode: Int
      itemId: String
      categoryId: String
      departmentId: String
      employeeId: String
      customerId: String
      supplierId: String
      start: Date
      end: Date
    ): ResponseWithKaids
    getMonthlyReport(
      accPCode: Int
      itemType: Int # 1: products, 2: seervices, 3: nostockitems ..., null/undefined: all
      accountIds: [String]
      serviceIds: [String]
      categoryIds: [String]
      departmentIds: [String]
      employeeIds: [String]
      customerIds: [String]
      supplierIds: [String]
      taskIds: [Int]
      start: Date
      end: Date
    ): ResponseWithKaids
    getSalesChartData(
      itemId: String
      categoryId: String
      departmentId: String
      employeeId: String
      customerId: String
      start: Date
      end: Date
    ): Response
    getTodaySales: ResponseWithKaids
    getTodayEvents: ResponseWithOperations
    getDaysEvents(qty: Int): ResponseWithCharts
    getDaysSales(qty: Int): ResponseWithCharts
    getMonthsSales(qty: Int): ResponseWithCharts
    getMonthsEvents(qty: Int): ResponseWithCharts
    getAccountsRaseed: Response
    getLandingChartData: Response
  }
  extend type Mutation {
    createFinance(
      opType: Int
      branch: String
      docNo: String
      prefix: String
      time: Date
      title: String
      desc: String
      customer: CustomerInput
      department: DepartmentInput
      debitAcc: Int
      creditAcc: Int
      amount: Float
      refNo: String
      taskId: Int
      userId: String
    ): Response
    updateFinance(
      _id: String
      opType: Int
      branch: String
      docNo: String
      prefix: String
      time: Date
      title: String
      desc: String
      customer: CustomerInput
      department: DepartmentInput
      debitAcc: Int
      creditAcc: Int
      amount: Float
      refNo: String
      taskId: Int
      userId: String
    ): Response
    deleteFinance(_id: String): Response
    createGeneralFinance(
      opType: Int
      branch: String
      docNo: String
      prefix: String
      time: Date
      title: String
      desc: String
      customer: CustomerInput
      department: DepartmentInput
      employee: EmployeeInput
      debitAcc: Int
      creditAcc: Int
      amount: Float
      items: String
      taskId: Int
      userId: String
    ): Response
    updateGeneralFinance(
      _id: String
      opType: Int
      branch: String
      docNo: String
      prefix: String
      time: Date
      title: String
      desc: String
      customer: CustomerInput
      department: DepartmentInput
      employee: EmployeeInput
      debitAcc: Int
      creditAcc: Int
      amount: Float
      items: String
      taskId: Int
      userId: String
    ): Response
    deleteGeneralFinance(_id: String): Response
  }
`;
