// add color to employee
import * as mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema(
  {
    branch: { type: String, index: true }, // branch basename
    autoNo: { type: Number, unique: true }, // all no are starts from 1 and grow => 2, 3, 4 ...
    docNo: { type: String, unique: true },
    resType: { type: Number, index: true }, // 1: human resorse like worker employee, 2: car or machine or flat ..
    name: { type: String },
    nameAr: { type: String },
    phone: { type: String },
    avatar: { type: String },
    tel: { type: String },
    fax: { type: String },
    mobile: { type: String },
    email: { type: String },
    city: { type: String },
    address: { type: String },
    color: { type: String },
    status: { type: String },
    daysoff: { type: String },

    isInactive: { type: Boolean },

    // commotion
    comPercent: { type: Number },

    departmentId: { type: String },
    departmentName: { type: String },
    departmentNameAr: { type: String },
    departmentColor: { type: String },

    info: { type: String },

    userId: { type: String }, // created user
    note: { type: String },
  },
  { timestamps: true }
);
EmployeeSchema.index({ branch: 1, name: 1 }, { unique: true });
EmployeeSchema.index({ branch: 1, nameAr: 1 }, { unique: true });

export default mongoose.model("Employee", EmployeeSchema);
