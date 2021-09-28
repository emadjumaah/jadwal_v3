import * as mongoose from "mongoose";

const ListItemSchema = new mongoose.Schema(
  {
    branch: { type: String, index: true }, // branch basename
    autoNo: { type: Number, unique: true }, // auto all no are starts from 1 and grow => 2, 3, 4 ...
    docNo: { type: String },
    indx: { type: Number },

    year: { type: Number, index: true },
    month: { type: Number, index: true },
    day: { type: Number, index: true },

    isUnique: { type: Boolean }, // optional
    isUnderSale: { type: Boolean }, // optional
    isUsed: { type: Boolean }, // optional

    itemId: { type: String },
    itemType: { type: Number },
    itemBarcode: { type: String },
    itemName: { type: String },
    itemNameAr: { type: String },
    itemDesc: { type: String },
    itemDescPurchase: { type: String },
    itemSize: { type: String },
    itemWeight: { type: Number },
    itemColor: { type: String },
    itemCost: { type: Number }, // for purchase عند الشراء يوضع سعر السلعة هنا وعند البيع يمكن وضع التكلفة هنا كمرجع
    itemUnit: { type: String },
    itemPrice: { type: Number }, // for sales للبيع فقط
    itemPhoto: { type: String },

    opId: { type: String },
    opType: { type: Number },
    opTime: { type: Date, index: true },
    opDocNo: { type: String },
    eventId: { type: Number, index: true },
    taskId: { type: Number, index: true },

    cost: { type: Number }, // for purchase
    price: { type: Number }, // sor sales
    qty: { type: Number },
    doneQty: { type: Number },

    totalCost: { type: Number }, // auto
    total: { type: Number }, // auto

    amount: { type: Number }, // total in order invoice and typing in expenses

    // relations
    categoryId: { type: String, index: true },
    categoryName: { type: String },
    categoryNameAr: { type: String },

    brandId: { type: String, index: true },
    brandName: { type: String },
    brandNameAr: { type: String },

    departmentId: { type: String, index: true },
    departmentName: { type: String },
    departmentNameAr: { type: String },
    departmentColor: { type: String },

    employeeId: { type: String, index: true },
    employeeName: { type: String },
    employeeNameAr: { type: String },
    employeeColor: { type: String },
    employeePhone: { type: String },

    customerId: { type: String, index: true },
    customerName: { type: String },
    customerNameAr: { type: String },
    supplierId: { type: String, index: true },
    supplierName: { type: String },
    supplierNameAr: { type: String },

    // General
    userId: { type: String }, // created user
    note: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("ListItem", ListItemSchema);
