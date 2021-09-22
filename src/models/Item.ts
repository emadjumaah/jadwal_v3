// products and services
// const itemType = {
//   product: 1,
//   service: 2,
//   nostockproduct: 3,
//   expenses: 10,
// };
import * as mongoose from "mongoose";

const ItemSchema = new mongoose.Schema(
  {
    branch: { type: String, index: true }, // branch basename
    autoNo: { type: Number, unique: true }, // auto all no are starts from 1 and grow => 2, 3, 4 ...
    docNo: { type: String, unique: true },
    itemType: { type: Number, default: 1, index: true },
    barcode: { type: String },
    name: { type: String },
    nameAr: { type: String },
    desc: { type: String },
    descPurchase: { type: String },

    isInactive: { type: Boolean },
    unit: { type: String },
    qty: { type: Number },
    cost: { type: Number, default: 0 },
    lastpc: { type: Number }, // last purchase cost
    price: { type: Number }, // sale price
    total: { type: Number }, // optional cost * price
    photo: { type: String },
    size: { type: String },
    weight: { type: Number },
    color: { type: String },
    isUnique: { type: Boolean }, // optional
    isUnderSale: { type: Boolean }, // optional
    isUsed: { type: Boolean }, // optional

    // Store
    storeId: { type: String },
    storeBasename: { type: String },
    storeName: { type: String },
    storeNameAr: { type: String },

    // relations
    categoryId: { type: String },
    categoryName: { type: String },
    categoryNameAr: { type: String },

    brandId: { type: String },
    brandName: { type: String },
    brandNameAr: { type: String },

    departmentId: { type: String },
    departmentName: { type: String },
    departmentNameAr: { type: String },
    departmentColor: { type: String },

    // for services and expenses
    employeeId: { type: String },
    employeeName: { type: String },
    employeeNameAr: { type: String },
    employeePhone: { type: String },
    employeeColor: { type: String },

    // realted accounts
    // for items and service
    incomeAccId: { type: String },
    incomeAccName: { type: String },
    incomeAccNameAr: { type: String },

    // for items only
    invAccId: { type: String }, // for items and service
    invAccName: { type: String },
    invAccNameAr: { type: String },

    // for items and service
    costAccId: { type: String },
    costAccName: { type: String },
    costAccNameAr: { type: String },

    // for expenses only
    expAccId: { type: String },
    expAccName: { type: String },
    expAccNameAr: { type: String },

    cashAccId: { type: String },
    cashAccName: { type: String },
    cashAccNameAr: { type: String },

    // end for expenses

    // General
    userId: { type: String }, // created user
    note: { type: String },
  },
  { timestamps: true }
);
ItemSchema.index({ branch: 1, name: 1 }, { unique: true });
ItemSchema.index({ branch: 1, nameAr: 1 }, { unique: true });

export default mongoose.model("Item", ItemSchema);

// catId: number;
// catName: string;
// brandId: string;
// brandName: string;

// note: string; // extra
// comp: string; // compound index name + isUsed + isUnderSale
