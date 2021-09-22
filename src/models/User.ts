/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
// export const systems = {
//   calendar: "calendar",
//   pos: "pos",
//   purchase: "purchase",
//   expenses: "expenses",
//   inventory: "inventory",
//   hr: "hr",
//   assets: "assets",
//   gaccountant: "gaccountant",
// };

import * as mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    branch: { type: String, index: true }, // branch basename
    username: { type: String, unique: true, index: true },
    password: { type: String },
    type: { type: Number, default: 1 }, // 2 : is employee
    name: { type: String, trim: true },
    email: { type: String },
    phone: { type: String },
    avatar: { type: String },
    address: { type: String },
    color: { type: String },
    lang: { type: String },
    tel: { type: String },
    fax: { type: String },
    mob: { type: String },

    isSuperAdmin: { type: Boolean },

    roles: String,

    isDepartAdmin: { type: Boolean }, // for department admin to view his employee events

    departmentId: { type: String },
    departmentName: { type: String },
    departmentNameAr: { type: String },
    departmentColor: { type: String },

    employeeId: { type: String },
    employeeName: { type: String },
    employeeNameAr: { type: String },
    employeePhone: { type: String },
    employeeColor: { type: String },

    count: { type: Number, default: 0 },
    block: { type: Boolean, default: false },

    userId: { type: String }, // created user
    note: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
