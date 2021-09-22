// company info + license + braches one doc for company one for licens others one for each branch and if need more related document to be added here
// base on licens can create branches and users in limit qty
import * as mongoose from "mongoose";

const CompanySchema = new mongoose.Schema(
  {
    kind: { type: String, default: "company", unique: true },
    license: { type: String },

    name: { type: String },
    nameAr: { type: String },
    logo: { type: String },
    tel1: { type: String },
    tel2: { type: String },
    fax: { type: String },
    mob: { type: String },
    email: { type: String },
    website: { type: String },
    address: { type: String },
    poBox: { type: String },
    CR: { type: String },
    city: { type: String },
    country: { type: String },
    userId: { type: String }, // created user
    note: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Company", CompanySchema);
