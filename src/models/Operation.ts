import * as mongoose from "mongoose";

const OperationSchema = new mongoose.Schema(
  {
    branch: { type: String, index: true }, // branch basename
    autoNo: { type: Number, unique: true }, // auto all no are starts from 1 and grow => 2, 3, 4 ...
    docNo: { type: String, unique: true },
    opType: { type: Number, index: true },
    time: { type: Date, index: true },
    title: { type: String },
    desc: { type: String },

    year: { type: Number, index: true },
    month: { type: Number, index: true },
    day: { type: Number, index: true },

    // event
    taskId: { type: Number, index: true },
    eventId: { type: Number, index: true },

    id: { type: Number, index: true },
    startDate: { type: Date, index: true },
    endDate: { type: Date },
    allDay: { type: Boolean },
    reminder: { type: Boolean },
    rRule: { type: String },
    exDate: { type: String },
    allowDrag: { type: Boolean },
    priority: { type: Number }, // 1 to 3 where 3 is highest priority, 1 is low
    status: { type: Number }, // 1: notconfirmed, 2: confirmed  3: update,  10:done - sold

    itemId: { type: String }, // service for event
    itemName: { type: String },
    itemNameAr: { type: String },
    // end event related

    customerId: { type: String, index: true },
    customerName: { type: String },
    customerNameAr: { type: String },
    customerPhone: { type: String },

    supplierId: { type: String },
    supplierName: { type: String },
    supplierNameAr: { type: String },
    supplierPhone: { type: String },

    departmentId: { type: String },
    departmentName: { type: String },
    departmentNameAr: { type: String },
    departmentColor: { type: String },

    employeeId: { type: String },
    employeeName: { type: String },
    employeeNameAr: { type: String },
    employeeColor: { type: String },
    employeePhone: { type: String },

    costAmount: { type: Number }, // from list items get total cost
    total: { type: Number }, // amount befor discount
    discount: { type: Number },
    profit: { type: Number }, // amount - costAmount

    // Kaids
    withKaid: { type: Boolean }, // TODO: new
    withCost: { type: Boolean }, // TODO: new
    debitAcc: { type: Number },
    debitAccName: { type: String },
    debitAccNameAr: { type: String },
    creditAcc: { type: Number },
    creditAccName: { type: String },
    creditAccNameAr: { type: String },
    amount: { type: Number }, //مبلغ طرفي القيد ويتغير حسب الوثيقة - بالفاتورة هو اجمالي الفاتورة قبل الحسم وفي الشراء القيمة قبل الحسم وفي دكومنت الحسم هو قيمة الحسم نفسه وفي باقي العمليات هو قيمة العملية المنجزة

    paymentType: { type: String }, // cash    card    check    bank

    inhand: { type: Number },
    change: { type: Number },

    refNo: { type: String },
    refType: { type: Number },
    eventNo: { type: String },

    amountPaid: { type: Number }, // how much this order or invoice had paid
    isPaid: { type: Boolean }, // true if invoice or order is paid
    isCash: { type: Boolean }, // for invoice and orders
    opId: { type: String }, // _id for related old item if return item
    links: [{ type: String }], // to other operations - all related operations invoice qoutation event reciept payment and other all related here

    // General
    userId: { type: String }, // created user
    note: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Operation", OperationSchema);
