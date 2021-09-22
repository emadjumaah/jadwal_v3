// the Department cannt be deleted if has related items in items table

import * as mongoose from "mongoose";

const DepartmentSchema = new mongoose.Schema(
  {
    branch: { type: String, index: true }, // branch basename
    autoNo: { type: Number, unique: true }, // all no are starts from 1 and grow => 2, 3, 4 ...
    docNo: { type: String, unique: true },
    name: { type: String },
    nameAr: { type: String },
    color: { type: String },
    desc: { type: String },
    userId: { type: String }, // created user
    note: { type: String },
  },
  { timestamps: true }
);
DepartmentSchema.index({ branch: 1, name: 1 }, { unique: true });
DepartmentSchema.index({ branch: 1, nameAr: 1 }, { unique: true });

export default mongoose.model("Department", DepartmentSchema);
