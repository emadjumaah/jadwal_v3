import path = require("path");

// const root = process.cwd().split(path.sep)[0];
const root = "C:";
export const dataDirectory = root + "/jadwal";

export const imageDirectory = root + "/jadwal/images";
export const fileDirectory = root + "/jadwal/files";
export const backupDirectory = root + "/jadwal/backups/";
export const licenseDirectory = root + "/jadwal/license/";

export const backupOptions = {
  host: "localhost",
  port: 27017,
  database: "jadwal",
  auto: true,
  removeOld: true,
  days: 14,
  path: backupDirectory,
};

export const isDEV =
  process.env.NODE_ENV === "dev" ||
  process.env.NODE_ENV === "development" ||
  process.env.NODE_ENV === undefined;

// export const DB_URL =
//   "mongodb+srv://emad:Jumaah1975@cluster0.xmgtq.mongodb.net/jadwal?retryWrites=true&w=majority";
// export const DB_URL = "mongodb://localhost:27017/jadwalnew";
export const LOCAL_DB_URL = "mongodb://localhost:27017/jadwal";
export const DB_URL =
  "mongodb+srv://emad:Jumaah1975@cluster0.zmni8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

export const dboptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};
export const CERT_SECRET = "HS1zM6udk7yNJMkFsbe5HazlF917Fti9";
export const JWT_SECRET = "gxSI6Coe9CzuXL3t";
export const HEADER_BEARER = "Jadwal";
export const HEADER_REQUEST = "authorization";
export const PORT = 80;

export const SMS_CUSTOMER_ID = "2369";
export const SMS_USERNAME = "Sabro";
export const SMS_PASSWORD = "6tLy7u";
export const SMS_HEADER = "5G Mobile";

export const EMAIL_USERNAME = "cargetapp@gmail.com";
export const EMAIL_PASSWORD = "Qatar2022";

export const autoNoTypes = {
  brand: "brand",
  category: "category",
  department: "department",
  employee: "employee",

  customer: "customer",
  supplier: "supplier",

  item: "item",
  listitem: "listitem",
  operation: "operation",

  salesInvoice: "salesInvoice",
  salesQoutation: "salesQoutation",
  salesDelivery: "salesDelivery",
  salesReturn: "salesReturn",
  customerReceipt: "customerReceipt",
  customerDiscount: "customerDiscount",
  purchaseInvoice: "purchaseInvoice",
  purchaseOrder: "purchaseOrder",
  purchaseDelivery: "purchaseDelivery",
  purchaseReturn: "purchaseReturn",
  supplierPayemnt: "supplierPayemnt",
  supplierDiscount: "supplierDiscount",
  interDeliveryIn: "interDeliveryIn",
  interDeliveryOut: "interDeliveryOut",
  expenses: "expenses",
  deposet: "deposet",
  ownerDraw: "ownerDraw",
  ownerDeposit: "ownerDeposit",
  event: "event",
  task: "task",
  project: "project",
  kaid: "kaid",
  action: "action",
  notification: "notification",
  group: "group",
};
export const autoNoPrefix = {
  salesInvoice: "SINV",
  purchaseInvoice: "PINV",
  salesDelivery: "SDEL",
  purchaseDelivery: "PDEL",
  customerReceipt: "CREC",
  supplierPayemnt: "SPAY",
  customerDiscount: "CDES",
  supplierDiscount: "SDES",
  expenses: "EXPN",
  deposet: "DEPO",
  ownerDeposit: "MNIN",
  ownerDraw: "MNOT",
  event: "EVNT",
  task: "TASK",
  kaid: "KAID",
};

export const periodTypes = {
  day: 1,
  week: 2,
  month: 3,
  year: 4,
};
export const itemTypes = {
  product: 1,
  service: 2,
  expenses: 3,
};

export const eventStatus = [
  { id: 1, name: "Scheduled", nameAr: "موعد غير مؤكد", color: "#7b7b7d" },
  { id: 2, name: "Confirmed", nameAr: "موعد مؤكد", color: "#3843d2" },
  { id: 3, name: "On-Hold", nameAr: "موعد معلق", color: "#ffa500" },
  { id: 4, name: "Canceled", nameAr: "موعد ملغى", color: "#ff4040" },
  { id: 10, name: "Completed", nameAr: "موعد منجز", color: "#008000" },
];
export const eventStatusShort = [
  { id: 1, name: "Scheduled", nameAr: "غير مؤكد", color: "#7b7b7d" },
  { id: 2, name: "Confirmed", nameAr: "مؤكد", color: "#3843d2" },
  { id: 3, name: "On-Hold", nameAr: "معلق", color: "#ffa500" },
  { id: 4, name: "Canceled", nameAr: "ملغى", color: "#ff4040" },
  { id: 10, name: "Completed", nameAr: "منجز", color: "#008000" },
];

export const operationTypes = {
  // المبيعات والمشتريات - زبائن وموردين
  salesInvoice: 10, /// فاتورة المبيع
  salesQoutation: 11,
  salesDelivery: 12, // مع فاتورة المبيعات عند تسليم البضاعة للزبون
  salesReturn: 13,
  customerReceipt: 14, // from customer // cash debit <- accounts_receivable credit
  customerDiscount: 15, // to customer //  accounts_receivable debit <- cash credit  خصمم خارج الفاتورة

  purchaseInvoice: 30, // فاتورة الشراء
  purchaseOrder: 31, // طلب شراء قبل فاتورة الشراء
  purchaseDelivery: 32, //  مع طلب الشراء عند استلام البضاعة من المورد
  purchaseReturn: 33,
  supplierPayemnt: 34, // to supplier // accounts_payable debit <- cash credit
  supplierDiscount: 35, // from supplier // cash debit <- accounts_payable credit خصمم خارج الفاتورة

  interDeliveryIn: 50, // حركة استلام بضاعة من احد مخازن الشركة
  interDeliveryOut: 51, // حركة تسليم بضاعة لاحد مخازن الشركة

  expenses: 60,

  // حركة مالية
  // transfare cash - bank - card - partners - branchs
  deposet: 70, // سحب من الصندوق وايداع بالبنك // bank debit <- cash or card credit
  ownerDraw: 71, // سحب من الصندوق للشريك  // partenr debit <- cash credit
  ownerDeposit: 72, // اضافة من الشريك في الصندوق  // cash debit <- partenr credit

  event: 80,
  task: 81,
  project: 82,

  // special transfare operation
  kaid: 90,
};

export const deliveryOps = [
  operationTypes.purchaseDelivery,
  operationTypes.salesDelivery,
  operationTypes.interDeliveryIn,
  operationTypes.interDeliveryOut,
];

export const actionType = {
  DEBIT: 1,
  CREDIT: 2,
};
export const accountType = {
  DEBIT: 1,
  CREDIT: 2,
};
export const raseedType = {
  DEBIT: 1,
  CREDIT: 2,
};

export const closedAccounts = {
  BALNCE_SHEET: 1,
  INCOME_STATEMENT: 2,
};

export const parents = {
  CASH: 1,
  ACCOUNTS_RECEIVABLE: 2,
  INVENTORY: 3,
  OTHER_CURRENT_ASSETS: 4,
  FIXED_ASSETS: 5,
  ACCUMULATED_DEPRECIATION: 6,
  ACCOUNTS_PAYABLE: 7,
  OTHER_CURRENT_LIABILITIES: 8,
  LONG_TERM_LIABILITIES: 9,
  EQUITY_RETAINED_EARNINGS: 10,
  EQUITY_DOESNT_CLOSE: 11,
  EQUITY_GETS_CLOSED: 12,
  INCOME: 13,
  COST_OF_SALES: 14,
  EXPENCES: 15,
};

export const accountCode = {
  cash_on_hand: 1000,
  card: 1010, //
  bank: 1020, //
  accounts_receivable: 1100,
  inventory: 1200,
  accounts_payable: 2000,

  sales_income: 4000,
  purchase_discount: 4100,
  purchase_returns: 4200,
  sales_income_other: 4500, //

  accrued_expenses: 2100,
  partner_current_acc: 2300,
  // branch_current_acc: 2400,
  cost_of_sales: 5000,
  sales_discount: 5100,
  sales_returns: 5200,
  cost_of_sales_other: 5500, //

  expenses_legal: 6000,
  expenses_salary: 6100,
  expenses_rent: 6200, //
  expenses_other: 6500, //

  other_current_assets: 1300,
  fixed_assets: 1400,
  accumulated_depreciation: 1500,
  long_term_liabilities: 2900,
  retained_earnings: 3000,
  paid_in_capital: 3100,
  dividends_paid: 3200,
};

export interface OpTypes {
  salesInvoice: number;
  salesQoutation: number;
  salesDelivery: number;
  salesReturn: number;
  customerReceipt: number;
  customerDiscount: number;
  purchaseInvoice: number;
  purchaseOrder: number;
  purchaseDelivery: number;
  purchaseReturn: number;
  supplierPayemnt: number;
  supplierDiscount: number;
  interDeliveryIn: number;
  interDeliveryOut: number;
  expenses: number;
  deposet: number;
  ownerDraw: number;
  ownerDeposit: number;
  event: number;
  task: number;
  project: number;
  kaid: number;
}

export const publicKey = `-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA3S2BGPb0NR+wMi39WZyV
3Mz1WufqRD9+mJ+N//Y60BbD1fZBLoWRQFuLR/jymZChhmOYPJx8tev7kChe7Qnd
iayAZTi2PcHSvkxU/sy6/5FNZ/NUI0ycW9QtCRb3NuD2Io1NLXtnMG2TijPkgPVp
NPW5eGNcu22JiS6KU0EM/xcgXVJWBKt506T0IA1hLqKnA++MNtSWD4ltufvJanTK
WHOidpdsVdD1yH+tIUJ1zGdZ5nSgXIjMdxmUpU+u8taH5tcOvloBojeTvBAX/U+i
vvoI+XxLbKO0eI4XXEyeM7p3UkLCyg0B1RGp8geO6PrQ/BuJe3tb71rDuvS07Ixa
WL+bKbgShLIZsgeXqT0TWRGkXM9WFnAh4jJZSxx2bfMuHjADQG+YqNzI2REgMddD
5ogYa18ZgHEaVrCbhABPMhWhR2LjnihQGCU3301jVDIgjSNlQve4RnmTDcxSYni3
f7/05N9aglja+XZ5nZrTAT/rkFIHTDvg8/RTx8jbsjJmP4c7kQ5LixiU2dATelKI
5l3EKb01hhQlTYxhC+hBbaQ1IVhjM/635yyCcd9F3eUsAoU0NHsql+WGjOct3fdK
1/aR7tb5OlEQ9tXs9vwZ0NGKa2Kwd9o4yGxPDpD84ySKj+k8C5sXQC9u60XG6kJe
WaatQNxltMd4IYvjvv0nS18CAwEAAQ==
-----END PUBLIC KEY-----
`;

export const APP_ID = "54834b3a-0d60-43c3-a700-6897b1dda663";
export const APP_VERSION = "3.0.8";
