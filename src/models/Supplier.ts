import * as mongoose from "mongoose";

const SupplierSchema = new mongoose.Schema(
  {
    branch: { type: String, index: true }, // branch basename
    autoNo: { type: Number, unique: true }, // all no are starts from 1 and grow => 2, 3, 4 ...
    docNo: { type: String, unique: true },
    name: { type: String },
    nameAr: { type: String },
    phone: { type: String }, // mostly mobile for searchin the Supplier
    tel: { type: String },
    fax: { type: String },
    mobile: { type: String },
    email: { type: String },
    city: { type: String },
    address: { type: String },
    balance: { type: Number, default: 0 },

    employeeId: { type: String },
    employeeName: { type: String },
    employeeNameAr: { type: String },
    employeePhone: { type: String },
    employeeColor: { type: String },

    // relations
    suppAccId: { type: String },
    suppAccName: { type: String },
    suppAccNameAr: { type: String },

    userId: { type: String }, // created user
    note: { type: String },
  },
  { timestamps: true }
);
SupplierSchema.index({ branch: 1, phone: 1 }, { unique: true });
SupplierSchema.index({ branch: 1, name: 1 }, { unique: true });
SupplierSchema.index({ branch: 1, nameAr: 1 }, { unique: true });

export default mongoose.model("Supplier", SupplierSchema);
