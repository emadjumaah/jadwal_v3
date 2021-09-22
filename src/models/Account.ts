import * as mongoose from "mongoose";

const AccountSchema = new mongoose.Schema(
  {
    branch: { type: String, index: true }, // branch basename

    code: { type: Number, index: true }, // 1000 +
    name: { type: String },
    nameAr: { type: String },
    parent: { type: String },
    parentAr: { type: String },
    parentcode: { type: Number },
    accType: { type: Number },
    balance: { type: Number, default: 0 },
    canedit: { type: Boolean },
    closedAcc: { type: Number },
    note: { type: String },
    userId: { type: String },
  },
  { timestamps: true }
);

AccountSchema.index({ code: 1, branch: 1 }, { unique: true });

export default mongoose.model("Account", AccountSchema);
