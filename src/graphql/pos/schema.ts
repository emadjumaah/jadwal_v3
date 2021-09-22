import { gql } from "apollo-server-express";

export default gql`
  input AccountInput {
    debitAcc: Int
    creditAcc: Int
    amount: Float
    type: Int
  }

  type ResponseWithOperations {
    ok: Boolean
    data: [Operation]
    message: String
    count: Int
    error: String
  }
  type ResponseWithTask {
    ok: Boolean
    data: Task
    message: String
    count: Int
    error: String
  }
  type ResponseWithTasks {
    ok: Boolean
    data: [Task]
    message: String
    count: Int
    error: String
  }
  type ResponseWithActions {
    ok: Boolean
    data: [Action]
    message: String
    count: Int
    error: String
  }
  type ResponseWithNotifications {
    ok: Boolean
    data: [Notification]
    message: String
    count: Int
    error: String
  }
  type ResponseWithListitems {
    ok: Boolean
    data: [Listitem]
    message: String
    count: Int
    error: String
  }

  type Operation {
    _id: String
    branch: String
    autoNo: Int
    docNo: String
    opType: Int
    time: Date
    title: String
    desc: String

    id: Int
    taskId: Int
    eventId: Int
    startDate: Date
    endDate: Date
    allDay: Boolean
    reminder: Boolean
    rRule: String
    exDate: String
    allowDrag: Boolean
    priority: Int
    status: Int

    itemId: String
    itemName: String
    itemNameAr: String

    customerId: String
    customerName: String
    customerNameAr: String
    customerPhone: String

    supplierId: String
    supplierName: String
    supplierNameAr: String
    supplierPhone: String

    departmentId: String
    departmentName: String
    departmentNameAr: String
    departmentColor: String

    employeeId: String
    employeeName: String
    employeeNameAr: String
    employeeColor: String
    employeePhone: String

    costAmount: Float
    total: Float
    discount: Float
    amount: Float
    profit: Float

    inhand: Float
    change: Float

    amountPaid: Float
    isPaid: Boolean
    isCash: Boolean
    opId: String

    refNo: String
    refType: Int
    eventNo: String

    paymentType: String

    withKaid: Boolean
    debitAcc: Int
    debitAccName: String
    debitAccNameAr: String
    creditAcc: Int
    creditAccName: String
    creditAccNameAr: String

    userId: String
    note: String

    createdAt: Date
    updatedAt: Date
  }
  type Listitem {
    _id: String
    branch: String
    autoNo: Int
    docNo: String
    indx: Int

    itemId: String
    itemType: Int
    itemBarcode: String
    itemName: String
    itemNameAr: String
    itemDesc: String
    itemDescPurchase: String
    itemSize: String
    itemWeight: Float
    itemColor: String
    itemCost: Float
    itemUnit: String
    itemPrice: Float
    itemPhoto: String

    opId: String
    opType: Int
    opDocNo: String
    eventId: Int
    taskId: Int

    qty: Float
    doneQty: Float
    totalCost: Float
    total: Float
    amount: Float

    categoryId: String
    categoryName: String
    categoryNameAr: String

    brandId: String
    brandName: String
    brandNameAr: String

    departmentId: String
    departmentName: String
    departmentNameAr: String
    departmentColor: String

    employeeId: String
    employeeName: String
    employeeNameAr: String
    employeeColor: String
    employeePhone: String

    userId: String
    note: String

    createdAt: Date
    updatedAt: Date
  }

  extend type Query {
    getInvoices(start: Date, end: Date, search: String): ResponseWithOperations
    getOperationItems(opId: String): ResponseWithListitems
    getOperationKaids(opId: String): ResponseWithKaids
  }
  extend type Mutation {
    createInvoice(
      branch: String
      docNo: String
      prefix: String
      time: Date
      title: String
      desc: String

      taskId: Int
      eventId: Int
      customer: CustomerInput
      department: DepartmentInput
      employee: EmployeeInput
      accounts: [AccountInput]

      items: String

      costAmount: Float
      total: Float
      discount: Float
      amount: Float
      profit: Float

      paymentType: String

      inhand: Float
      change: Float

      amountPaid: Float
      isPaid: Boolean
      isCash: Boolean
      opId: String

      userId: String
      eventNo: String
    ): Response
    updateInvoice(
      _id: String
      branch: String
      docNo: String
      prefix: String
      title: String
      time: Date
      desc: String

      taskId: Int
      eventId: Int

      customer: CustomerInput
      department: DepartmentInput
      employee: EmployeeInput
      accounts: [AccountInput]

      items: String

      costAmount: Float
      total: Float
      discount: Float
      amount: Float
      profit: Float

      paymentType: String

      inhand: Float
      change: Float

      amountPaid: Float
      isPaid: Boolean
      isCash: Boolean
      opId: String

      userId: String
    ): Response
    deleteInvoice(_id: String): Response
  }
`;
