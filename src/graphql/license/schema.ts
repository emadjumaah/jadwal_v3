import { gql } from "apollo-server-express";

export default gql`
  type Location {
    lat: Float
    lon: Float
  }
  input LocationInput {
    lat: Float
    lon: Float
  }

  type ResponseWithBranchs {
    ok: Boolean
    data: [Branch]
    message: String
    error: String
  }
  type ResponseWithAccounts {
    ok: Boolean
    data: [Account]
    message: String
    error: String
  }

  type Branch {
    _id: String

    basename: String
    systems: [String]
    users: Int

    name: String
    nameAr: String
    logo: String
    tel1: String
    tel2: String
    fax: String
    mob: String
    email: String
    website: String
    address: String
    poBox: String
    CR: String
    city: String
    country: String
    location: Location
    userId: String
    note: String

    createdAt: Date
    updatedAt: Date
  }
  type Account {
    _id: String

    branch: String
    code: Int
    name: String
    nameAr: String
    parent: String
    parentAr: String
    parentcode: Int
    accType: Int
    balance: Float
    canedit: Boolean
    closedAcc: Int
    note: String
    userId: String

    createdAt: Date
    updatedAt: Date
  }
  extend type Query {
    getAccounts: ResponseWithAccounts
    getBranches: ResponseWithBranchs
  }
  extend type Mutation {
    createBranch(
      basename: String
      systems: [String]
      users: Int

      name: String
      nameAr: String
      logo: String
      tel1: String
      tel2: String
      fax: String
      mob: String
      email: String
      website: String
      address: String
      poBox: String
      CR: String
      city: String
      country: String
      location: LocationInput
      note: String
    ): Response
    updateBranch(
      _id: String
      basename: String
      systems: [String]
      users: Int

      name: String
      nameAr: String
      logo: String
      tel1: String
      tel2: String
      fax: String
      mob: String
      email: String
      website: String
      address: String
      poBox: String
      CR: String
      city: String
      country: String
      location: LocationInput
      note: String
    ): Response
    deleteBranch(_id: String): Response
    createAccount(
      branch: String
      code: Int
      name: String
      nameAr: String
      parentcode: Int
      parent: String
      parentAr: String
      accType: Int
      canedit: Boolean
      balance: Float
      closedAcc: Int
      note: String
      userId: String
    ): Response
    updateAccount(
      _id: String
      branch: String
      code: Int
      name: String
      nameAr: String
      parentcode: Int
      parent: String
      parentAr: String
      accType: Int
      balance: Float
      closedAcc: Int
      note: String
      userId: String
    ): Response
    deleteAccount(_id: String): Response
    initAccounts(baccounts: String): Response
  }
`;
