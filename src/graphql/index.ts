import { gql } from "apollo-server-express";
import { merge } from "lodash";

import generalSchema from "./general/schema";
import generalResolvers from "./general/resolvers";
import posSchema from "./pos/schema";
import posResolvers from "./pos/resolvers";
import calendarSchema from "./calendar/schema";
import calendarResolvers from "./calendar/resolvers";
import expensesSchema from "./expenses/schema";
import expensesResolvers from "./expenses/resolvers";
import financeSchema from "./finance/schema";
import financeResolvers from "./finance/resolvers";
import licenseSchema from "./license/schema";
import licenseResolvers from "./license/resolvers";
import userSchema from "./user/schema";
import userResolvers from "./user/resolvers";

const Query = gql`
  type Query {
    _empty: String
  }
`;
const Mutation = gql`
  type Mutation {
    _empty: String
  }
`;
const Subscription = gql`
  type Subscription {
    _empty: String
  }
`;

export const typeDefs = [
  Query,
  Mutation,
  Subscription,
  generalSchema,
  posSchema,
  calendarSchema,
  expensesSchema,
  financeSchema,
  userSchema,
  licenseSchema,
];

export const resolvers = merge(
  generalResolvers,
  posResolvers,
  calendarResolvers,
  expensesResolvers,
  financeResolvers,
  userResolvers,
  licenseResolvers
);
// export const schema = makeExecutableSchema({
//   typeDefs: [
//     Query,
//     Mutation,
//     Subscription,
//     generalSchema,
//     posSchema,
//     calendarSchema,
//     expensesSchema,
//     financeSchema,
//     userSchema,
//     licenseSchema,
//   ],
//   resolvers: merge(
//     generalResolvers,
//     posResolvers,
//     calendarResolvers,
//     expensesResolvers,
//     financeResolvers,
//     userResolvers,
//     licenseResolvers
//   ),
// });
