import * as mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    branch: { type: String, index: true }, // branch basename
    autoNo: { type: Number, unique: true }, // auto all no are starts from 1 and grow => 2, 3, 4 ...
    docNo: { type: String, unique: true },
    title: { type: String },
    desc: { type: String },

    // task
    id: { type: Number, index: true },
    name: { type: String },
    type: { type: String },
    start: { type: Date, index: true },
    end: { type: Date, index: true },
    progress: { type: Number, default: 0 },
    dependencies: [],
    styles: {},
    isDisabled: { type: Boolean },
    fontSize: { type: String },
    project: { type: String },
    hideChildren: { type: Boolean },
    tasktype: { type: Number }, // time task, events qty task, manual progress task

    priority: { type: Number },
    status: { type: Number },
    evQty: { type: Number },
    evDone: { type: Number },

    amount: { type: Number },
    totalinvoiced: { type: Number },
    totalpaid: { type: Number },

    customerId: { type: String },
    customerName: { type: String },
    customerNameAr: { type: String },
    customerPhone: { type: String },

    departmentId: { type: String },
    departmentName: { type: String },
    departmentNameAr: { type: String },
    departmentColor: { type: String },

    employeeId: { type: String },
    employeeName: { type: String },
    employeeNameAr: { type: String },
    employeeColor: { type: String },
    employeePhone: { type: String },

    userId: { type: String }, // created user
    note: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Task", TaskSchema);
