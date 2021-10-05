import * as mongoose from "mongoose";

const ActionSchema = new mongoose.Schema(
  {
    branch: { type: String, index: true },
    autoNo: { type: Number, unique: true },
    indx: { type: Number },

    id: { type: Number },
    type: { type: Number }, // 1: sms, 2: email, 3: notification
    title: { type: String },
    body: { type: String },

    sendtime: { type: Date, index: true },
    active: { type: Boolean, default: true },

    rRule: { type: String },
    exDate: { type: String },
    allDay: { type: Boolean },

    phone: { type: String }, // for type = 1
    email: { type: String }, // for type = 2
    userId: { type: String }, // for type = 3

    timeunit: { type: String },
    timerelate: { type: String },
    qty: { type: Number },
    address: { type: String },

    eventId: { type: Number, index: true },
    taskId: { type: Number, index: true },
    employeeId: { type: String, index: true },
    departmentId: { type: String, index: true },
    customerId: { type: String, index: true },

    data: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Action", ActionSchema);
