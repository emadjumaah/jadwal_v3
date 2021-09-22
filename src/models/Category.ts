// the Categories cannt be deleted if has related items in items table

// const catType = {
//   product: 1,
//   service: 2,
//   expenses: 3,
// };

import * as mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    branch: { type: String, index: true }, // branch basename
    autoNo: { type: Number, unique: true }, // all no are starts from 1 and grow => 2, 3, 4 ...
    docNo: { type: String, unique: true },
    catType: { type: Number, default: 1 },
    name: { type: String },
    nameAr: { type: String },

    note: { type: String },
    userId: { type: String }, // created user
  },
  { timestamps: true }
);

CategorySchema.index({ branch: 1, name: 1 }, { unique: true });
CategorySchema.index({ branch: 1, nameAr: 1 }, { unique: true });

export default mongoose.model("Category", CategorySchema);
