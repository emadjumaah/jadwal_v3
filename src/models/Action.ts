import * as mongoose from "mongoose";

const ActionSchema = new mongoose.Schema(
  {
    branch: { type: String, index: true },
    autoNo: { type: Number, unique: true },
    indx: { type: Number },

    type: { type: Number }, // 1: sms, 2: email, 3: notification
    active: { type: Boolean, default: true },
    sendtime: { type: Date, index: true },
    phone: { type: String }, // for type = 1
    email: { type: String }, // for type = 2
    userId: { type: String }, // for type = 3
    title: { type: String },
    body: { type: String },

    timeunit: { type: String },
    timerelate: { type: String },
    qty: { type: Number },
    address: { type: String },

    eventId: { type: Number },
    taskId: { type: Number },

    data: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Action", ActionSchema);
