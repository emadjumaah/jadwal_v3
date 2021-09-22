// القيود ويتبع لها بتود القيد من kaiditem
// ويتبع القيد او مجموعة قيود لعملية معينة

import * as mongoose from "mongoose";

const KaidSchema = new mongoose.Schema(
  {
    branch: { type: String, index: true }, // branch basename
    shareId: { type: String },

    year: { type: Number, index: true },
    month: { type: Number, index: true },
    day: { type: Number, index: true },

    // operation data
    opId: { type: String, index: true },
    opType: { type: Number, index: true },
    opTime: { type: Date, index: true },
    opDocNo: { type: String },
    customerId: { type: String, index: true },
    customerName: { type: String },
    customerNameAr: { type: String },
    supplierId: { type: String, index: true },
    supplierName: { type: String },
    supplierNameAr: { type: String },
    departmentId: { type: String, index: true },
    departmentName: { type: String },
    departmentNameAr: { type: String },
    employeeId: { type: String, index: true },
    employeeName: { type: String },
    employeeNameAr: { type: String },

    refNo: { type: String },
    refType: { type: Number },

    eventId: { type: Number, index: true },
    taskId: { type: Number, index: true },

    desc: { type: String },

    // item inventory data
    categoryId: { type: String },
    categoryName: { type: String },
    categoryNameAr: { type: String },
    itemBarcode: { type: String },
    itemId: { type: String },
    itemType: { type: Number },
    itemName: { type: String },
    itemNameAr: { type: String },
    itemDesc: { type: String },
    qty: { type: Number },
    itemCost: { type: Number },
    itemPrice: { type: Number },

    // account
    accId: { type: String, index: true },
    accCode: { type: Number, index: true },
    accType: { type: Number }, // 1: "debet", 2:"credit"
    accName: { type: String },
    accNameAr: { type: String },
    accPCode: { type: Number, index: true }, // account parent code (1 - 15)
    accParent: { type: String },

    opaccId: { type: String, index: true },
    opaccCode: { type: Number, index: true },
    opaccType: { type: Number },
    opaccName: { type: String },
    opaccNameAr: { type: String },
    opaccPCode: { type: Number, index: true },
    opaccParent: { type: String },

    // amount
    kaidType: { type: Number }, // 1: debit, 2: credit
    amount: { type: Number },
    debit: { type: Number },
    credit: { type: Number },

    userId: { type: String }, // created user
    note: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Kaid", KaidSchema);
