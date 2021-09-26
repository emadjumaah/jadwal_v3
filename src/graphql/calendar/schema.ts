import { gql } from "apollo-server-express";

export default gql`
  type Action {
    _id: String
    branch: String
    autoNo: Int
    indx: Int

    type: Int
    active: Boolean
    sendtime: Date
    phone: String
    email: String
    userId: String
    title: String
    body: String
    eventId: Int
    taskId: Int
    data: String

    timeunit: String
    timerelate: String
    qty: Int
    address: String

    createdAt: Date
    updatedAt: Date
  }
  type Notification {
    _id: String
    branch: String
    autoNo: Int

    userId: String
    title: String
    body: String
    eventId: Int
    taskId: Int
    read: Boolean
    data: String

    createdAt: Date
    updatedAt: Date
  }
  type Task {
    _id: String
    branch: String
    autoNo: Int
    docNo: String
    title: String
    desc: String

    id: Int
    name: String
    type: String
    start: Date
    end: Date
    progress: Float
    isDisabled: Boolean
    fontSize: String
    project: String
    hideChildren: Boolean
    tasktype: Int
    groupId: String

    priority: Int
    status: Int
    events: [Operation]
    evQty: Int
    evDone: Int

    amount: Float
    totalinvoiced: Float
    totalpaid: Float
    toatlExpenses: Float

    customerId: String
    customerName: String
    customerNameAr: String
    customerPhone: String

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
    getActions(
      type: Int
      active: Boolean
      eventId: Int
      taskId: Int
    ): ResponseWithActions
    getNotifications(
      userId: String
      eventId: Int
      taskId: Int
      read: Boolean
    ): ResponseWithNotifications
    getTask(taskId: Int): ResponseWithTask
    getTasks(
      departmentId: String
      employeeId: String
      customerId: String
      status: Int
      start: Date
      end: Date
    ): ResponseWithTasks
    getTaskEvents(taskId: Int): ResponseWithOperations
    getTaskItems(taskId: Int): ResponseWithListitems

    getEvents(
      itemId: String
      categoryId: String
      departmentId: String
      employeeId: String
      customerId: String
      status: Int
      start: Date
      end: Date
    ): ResponseWithOperations
    getReminders: ResponseWithOperations
    getEventsInfo: Response

    getReportEvents(
      serviceIds: [String]
      categoryIds: [String]
      departmentIds: [String]
      employeeIds: [String]
      customerIds: [String]
      supplierIds: [String]
      status: Int
      start: Date
      end: Date
    ): ResponseWithOperations
    getChartEvents(
      itemId: String
      categoryId: String
      departmentId: String
      employeeId: String
      customerId: String
      status: Int
      start: Date
      end: Date
    ): Response
  }
  extend type Mutation {
    createTask(
      branch: String
      title: String
      name: String
      type: String
      start: Date
      end: Date
      progress: Float
      tasktype: Int
      status: Int
      evQty: Int
      evDone: Int
      events: String
      items: String
      amount: Float
      priority: Int
      customer: CustomerInput
      department: DepartmentInput
      employee: EmployeeInput
    ): Task
    updateTask(
      branch: String
      id: Int
      title: String
      name: String
      type: String
      start: Date
      end: Date
      progress: Float
      tasktype: Int
      status: Int
      evQty: Int
      evDone: Int
      events: String
      items: String
      amount: Float
      priority: Int
      customer: CustomerInput
      department: DepartmentInput
      employee: EmployeeInput
    ): Task
    deleteTask(id: Int): Response
    deleteTaskById(_id: String): Response
    createEvent(
      branch: String
      taskId: Int
      title: String
      prefix: String
      docNo: String
      startDate: Date
      endDate: Date
      allDay: Boolean
      reminder: Boolean
      rRule: String
      exDate: String
      allowDrag: Boolean

      priority: Int
      amount: Float
      status: Int

      items: String
      actions: String
      customer: CustomerInput
      department: DepartmentInput
      employee: EmployeeInput
    ): Operation
    updateEvent(
      branch: String
      id: Int
      taskId: Int
      title: String
      prefix: String
      docNo: String
      startDate: Date
      endDate: Date
      allDay: Boolean
      reminder: Boolean
      rRule: String
      exDate: String
      allowDrag: Boolean

      priority: Int
      amount: Float
      status: Int

      items: String
      actions: String
      customer: CustomerInput
      department: DepartmentInput
      employee: EmployeeInput
    ): Operation
    deleteEvent(id: Int): Response
    deleteEventById(_id: String): Response
    createAction(
      branch: String
      type: Int
      active: Boolean
      sendtime: Date
      phone: String
      email: String
      userId: String
      title: String
      body: String

      eventId: Int
      taskId: Int

      timeunit: String
      timerelate: String
      qty: Int
      address: String

      data: String
    ): Response
    updateAction(
      _id: String
      branch: String
      type: Int
      active: Boolean
      sendtime: Date
      phone: String
      email: String
      userId: String
      title: String
      body: String

      eventId: Int
      taskId: Int

      timeunit: String
      timerelate: String
      qty: Int
      address: String

      data: String
    ): Response
    deleteAction(_id: String): Response
    createNotification(
      branch: String
      userId: String
      title: String
      body: String
      eventId: Int
      taskId: Int
      read: Boolean
      data: String
    ): Response
    updateNotification(
      _id: String
      branch: String
      userId: String
      title: String
      body: String
      eventId: Int
      taskId: Int
      read: Boolean
      data: String
    ): Operation
    deleteNotification(_id: String): Response
  }
  extend type Subscription {
    eventAdded: Operation
  }
`;
