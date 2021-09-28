import { gql } from "apollo-server-express";

export default gql`
  scalar Date

  input DepartmentInput {
    departmentId: String
    departmentName: String
    departmentNameAr: String
    departmentColor: String
  }

  input EmployeeInput {
    employeeId: String
    employeeName: String
    employeeNameAr: String
    employeePhone: String
    employeeColor: String
  }

  input CustomerInput {
    customerId: String
    customerName: String
    customerNameAr: String
    customerPhone: String
  }
  input SupplierInput {
    supplierId: String
    supplierName: String
    supplierNameAr: String
    supplierPhone: String
  }
  input ServiceInput {
    serviceId: String
    serviceName: String
    serviceNameAr: String
  }
  input OpItemInput {
    itemId: String
    itemName: String
    itemNameAr: String
  }
  input ProductInput {
    productId: String
    productName: String
    productNameAr: String
  }

  input CategoryInput {
    categoryId: String
    categoryName: String
    categoryNameAr: String
  }
  input BrandInput {
    brandId: String
    brandName: String
    brandNameAr: String
  }

  type Chart {
    _id: String
    amount: Float
    count: Int
    date: Date
    day: Int
    month: Int
    year: Int
    departmentId: String
    departmentName: String
    departmentNameAr: String
    departmenColor: String
    employeeId: String
    employeeName: String
    employeeNameAr: String
    employeeColor: String
    status: Int
    statusAr: String
    statusEn: String
  }

  type Category {
    _id: String
    branch: String
    autoNo: Int
    docNo: String
    catType: Int
    name: String
    nameAr: String
    userId: String

    createdAt: Date
    updatedAt: Date
  }

  type Brand {
    _id: String
    branch: String
    autoNo: Int
    docNo: String
    name: String
    nameAr: String
    userId: String

    createdAt: Date
    updatedAt: Date
  }
  type Group {
    _id: String
    branch: String
    autoNo: Int
    docNo: String
    name: String
    nameAr: String
    userId: String
    tasks: [Int]
    createdAt: Date
    updatedAt: Date
  }

  type Department {
    _id: String
    branch: String
    autoNo: Int
    docNo: String
    name: String
    nameAr: String
    color: String
    desc: String
    userId: String

    createdAt: Date
    updatedAt: Date
  }

  type Employee {
    _id: String
    branch: String
    autoNo: Int
    docNo: String
    name: String
    nameAr: String
    color: String
    resType: Int

    phone: String
    avatar: String
    tel: String
    fax: String
    mobile: String
    email: String
    city: String
    address: String
    status: String
    daysoff: String
    isInactive: Boolean
    comPercent: Float
    departmentId: String
    departmentName: String
    departmentNameAr: String
    departmentColor: String
    info: String

    documentNo: String
    startDate: Date
    endDate: Date
    cost: Float
    model: String
    type: String

    userId: String

    createdAt: Date
    updatedAt: Date
  }
  type Customer {
    _id: String
    branch: String
    autoNo: Int
    docNo: String
    name: String
    nameAr: String
    phone: String

    tel: String
    fax: String
    mobile: String
    email: String
    city: String
    address: String
    balance: Int

    employeeId: String
    employeeName: String
    employeeNameAr: String
    employeeColor: String
    employeePhone: String

    userId: String

    createdAt: Date
    updatedAt: Date
  }
  type Supplier {
    _id: String
    branch: String
    autoNo: Int
    docNo: String
    name: String
    nameAr: String
    phone: String

    tel: String
    fax: String
    mobile: String
    email: String
    city: String
    address: String
    balance: Int

    employeeId: String
    employeeName: String
    employeeNameAr: String
    employeeColor: String
    employeePhone: String

    userId: String

    createdAt: Date
    updatedAt: Date
  }

  type Item {
    _id: String
    branch: String
    autoNo: Int
    docNo: String

    itemType: Int
    name: String
    nameAr: String
    desc: String
    barcode: String

    qty: Float
    cost: Float
    lastpc: Float
    price: Float
    unit: String
    photo: String

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
    employeePhone: String
    employeeColor: String

    userId: String

    createdAt: Date
    updatedAt: Date
  }

  type Response {
    ok: Boolean
    message: String
    data: String
    error: String
  }

  type ResponseWithChart {
    ok: Boolean
    sales: [Chart]
    events: [Chart]
    accounts: String
    message: String
    error: String
  }
  type ResponseWithCharts {
    ok: Boolean
    data: [Chart]
    message: String
    error: String
  }
  type ResponseWithCategories {
    ok: Boolean
    data: [Category]
    message: String
    error: String
  }
  type ResponseWithBrands {
    ok: Boolean
    data: [Brand]
    message: String
    error: String
  }
  type ResponseWithGroups {
    ok: Boolean
    data: [Group]
    message: String
    error: String
  }

  type ResponseWithDepartments {
    ok: Boolean
    data: [Department]
    message: String
    error: String
  }
  type ResponseWithEmployees {
    ok: Boolean
    data: [Employee]
    message: String
    error: String
  }
  type ResponseWithCustomers {
    ok: Boolean
    data: [Customer]
    message: String
    error: String
  }
  type ResponseWithSuppliers {
    ok: Boolean
    data: [Supplier]
    message: String
    error: String
  }
  type ResponseWithItems {
    ok: Boolean
    data: [Item]
    message: String
    error: String
  }

  extend type Query {
    getLastNos: Response
    getCategories(isRTL: Boolean): ResponseWithCategories
    getBrands(isRTL: Boolean): ResponseWithBrands
    getGroups(isRTL: Boolean): ResponseWithGroups
    getDepartments(isRTL: Boolean): ResponseWithDepartments
    getEmployees(isRTL: Boolean, resType: Int): ResponseWithEmployees
    getCustomers(isRTL: Boolean): ResponseWithCustomers
    getSuppliers(isRTL: Boolean): ResponseWithSuppliers
    getItems(isRTL: Boolean): ResponseWithItems
    getServices(isRTL: Boolean): ResponseWithItems
    getProducts(isRTL: Boolean): ResponseWithItems
    getNoStockProducts(isRTL: Boolean): ResponseWithItems
    getChartsData(
      itemId: String
      categoryId: String
      departmentId: String
      employeeId: String
      customerId: String
      status: Int
      start: Date
      end: Date
    ): Response
    getSimpleChartsData(start: Date, end: Date): ResponseWithChart
    getCompany: Response
  }
  extend type Mutation {
    createCategory(
      branch: String
      catType: Int
      name: String
      nameAr: String
    ): Response
    updateCategory(
      _id: String
      branch: String
      catType: Int
      name: String
      nameAr: String
    ): Response
    deleteCategory(_id: String): Response
    createBrand(branch: String, name: String, nameAr: String): Response
    updateBrand(
      _id: String
      branch: String
      name: String
      nameAr: String
    ): Response
    deleteBrand(_id: String): Response
    createGroup(
      branch: String
      name: String
      nameAr: String
      tasks: [Int]
    ): Response
    updateGroup(
      _id: String
      branch: String
      name: String
      nameAr: String
      tasks: [Int]
    ): Response
    deleteGroup(_id: String): Response
    createDepartment(
      branch: String
      name: String
      nameAr: String
      desc: String
      color: String
    ): Response
    updateDepartment(
      _id: String
      branch: String
      name: String
      nameAr: String
      desc: String
      color: String
    ): Response
    deleteDepartment(_id: String): Response
    createEmployee(
      branch: String
      name: String
      nameAr: String
      color: String
      resType: Int
      phone: String
      email: String
      comPercent: Float
      department: DepartmentInput
      daysoff: String
      info: String
      documentNo: String
      startDate: Date
      endDate: Date
      cost: Float
      model: String
      type: String
    ): Response
    updateEmployee(
      _id: String
      branch: String
      name: String
      nameAr: String
      color: String
      resType: Int
      phone: String
      email: String
      comPercent: Float
      department: DepartmentInput
      daysoff: String
      info: String
    ): Response
    deleteEmployee(_id: String): Response
    createCustomer(
      branch: String
      name: String
      nameAr: String
      phone: String
      mobile: String
      email: String
      address: String
      employee: EmployeeInput
    ): Response
    updateCustomer(
      _id: String
      branch: String
      name: String
      nameAr: String
      phone: String
      mobile: String
      email: String
      address: String
      employee: EmployeeInput
    ): Response
    deleteCustomer(_id: String): Response
    createSupplier(
      branch: String
      name: String
      nameAr: String
      phone: String
      email: String
      employee: EmployeeInput
    ): Response
    updateSupplier(
      _id: String
      branch: String
      name: String
      nameAr: String
      phone: String
      email: String
      employee: EmployeeInput
    ): Response
    deleteSupplier(_id: String): Response
    createItem(
      branch: String
      itemType: Int
      barcode: String
      name: String
      nameAr: String
      desc: String
      cost: Float
      price: Float
      unit: String
      photo: String
      category: CategoryInput
      brand: BrandInput
      employee: EmployeeInput
      department: DepartmentInput
    ): Response
    updateItem(
      _id: String
      branch: String
      itemType: Int
      barcode: String
      name: String
      nameAr: String
      desc: String
      cost: Float
      price: Float
      unit: String
      photo: String
      category: CategoryInput
      brand: BrandInput
      employee: EmployeeInput
      department: DepartmentInput
    ): Response
    updateCompany(
      name: String
      nameAr: String
      tel1: String
      tel2: String
      fax: String
      mob: String
      email: String
      website: String
      address: String
      logo: String
    ): Response
    deleteItem(_id: String): Response
    runClosing: Response
  }
`;
