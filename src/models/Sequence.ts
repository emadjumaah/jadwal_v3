// the brand cannt be deleted if has related items in items table

import * as mongoose from "mongoose";

const SequenceSchema = new mongoose.Schema(
  {
    _id: { type: String },
    sequenceValue: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Sequence", SequenceSchema);
