// export const periodTypes = {
//   day: 1,
//   week: 2,
//   month: 3,
//   year: 4,
// };

import * as mongoose from "mongoose";

const ClosingSchema = new mongoose.Schema(
  {
    branch: { type: String, index: true }, // branch basename

    data: [
      {
        accId: { type: String, index: true },
        accCode: { type: Number, index: true },
        accName: { type: String },
        accNameAr: { type: String },
        accType: { type: Number },

        parent: { type: String },
        parentAr: { type: String },
        parentcode: { type: Number },
        closedAcc: { type: Number },

        startBalance: { type: Number },
        startBalanceType: { type: Number }, // debit / credit
        periodBalance: { type: Number },
        periodBalanceType: { type: Number }, // debit / credit
        endBalance: { type: Number },
        endBalanceType: { type: Number }, // debit / credit
      },
    ],

    isEdited: { type: Boolean },
    timeEdited: { type: Date },

    closingPeriod: { type: String },

    day: { type: Number },
    month: { type: Number },
    year: { type: Number },

    note: { type: String },
    userId: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Closing", ClosingSchema);
