import { gql } from "apollo-server-express";

export default gql`
  type ResponseWithUser {
    ok: Boolean
    data: User
    message: String
    error: String
  }
  type ResponseWithUsers {
    ok: Boolean
    data: [User]
    message: String
    error: String
  }
  type ResponseWithToken {
    ok: Boolean
    token: String
    data: User
    message: String
    error: String
  }
  type ResponseWithTokens {
    ok: Boolean
    accessToken: String
    refreshToken: String
    data: User
    message: String
    error: String
  }

  type User {
    _id: String
    branch: String
    type: Int # 1 - normal / 2 - employee
    username: String
    password: String
    name: String
    email: String
    phone: String
    avatar: String
    address: String
    color: String
    lang: String
    tel: String
    fax: String
    mob: String

    roles: String

    isSuperAdmin: String

    isDepartAdmin: Boolean
    departmentId: String
    departmentName: String
    departmentNameAr: String
    departmentColor: String

    employeeId: String
    employeeName: String
    employeeNameAr: String
    employeePhone: String
    employeeColor: String

    block: Boolean

    userId: String

    createdAt: Date
    updatedAt: Date
  }

  extend type Query {
    getUsers: ResponseWithUsers
  }
  extend type Mutation {
    signup(
      branch: String
      username: String
      password: String
      phone: String
      roles: String
      name: String
      email: String
      avatar: String
      department: DepartmentInput
      isDepartAdmin: Boolean
      employee: EmployeeInput
    ): ResponseWithTokens
    login(username: String, password: String): ResponseWithTokens
    changePassword(_id: String, password: String, newPassword: String): Response
    updateUser(
      _id: String
      branch: String
      roles: String
      phone: String
      name: String
      email: String
      avatar: String
      department: DepartmentInput
      isDepartAdmin: Boolean
      employee: EmployeeInput
    ): Response
    deleteUser(_id: String): Response
    blockUser(_id: String, block: Boolean): Response
    me: Response
  }
`;
