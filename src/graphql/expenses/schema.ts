import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    getExpenses(start: Date, end: Date, search: String): ResponseWithOperations
  }
  extend type Mutation {
    createExpenses(
      branch: String
      docNo: String
      prefix: String
      time: Date
      title: String
      desc: String

      debitAcc: Int
      creditAcc: Int
      amount: Float
      taskId: Int
      department: DepartmentInput
      employee: EmployeeInput

      userId: String
    ): Response
    updateExpenses(
      _id: String
      branch: String
      docNo: String
      prefix: String
      time: Date
      title: String
      desc: String

      debitAcc: Int
      creditAcc: Int
      amount: Float
      taskId: Int
      department: DepartmentInput
      employee: EmployeeInput

      userId: String
    ): Response
    deleteExpenses(_id: String): Response
  }
`;
