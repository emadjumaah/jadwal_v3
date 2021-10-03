// add color to employee
import * as mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema(
  {
    branch: { type: String, index: true }, // branch basename
    autoNo: { type: Number, unique: true }, // all no are starts from 1 and grow => 2, 3, 4 ...
    docNo: { type: String, unique: true },
    resType: { type: Number, index: true }, // 1:managment, 2: operational, 3: material machine or flat,
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
    daysoff: { type: String },

    amount: { type: Number },
    totalinvoiced: { type: Number },
    totalpaid: { type: Number },
    toatlExpenses: { type: Number },
    progress: { type: Number, default: 0 },
    evQty: { type: Number },
    evDone: { type: Number },

    isInactive: { type: Boolean },
    status: { type: String },

    documentNo: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    cost: { type: Number },
    model: { type: String },
    type: { type: String },

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
