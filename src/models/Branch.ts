import * as mongoose from "mongoose";

const BranchSchema = new mongoose.Schema(
  {
    basename: { type: String, unique: true }, // branch1, branch2, branch3 ...
    systems: [{ type: String }],
    users: { type: Number },

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
    location: { lat: { type: Number }, lon: { type: Number } },
    userId: { type: String },
    note: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Branch", BranchSchema);
