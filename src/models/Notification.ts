import * as mongoose from "mongoose";
// TODO:
const NotificationSchema = new mongoose.Schema(
  {
    branch: { type: String, index: true },
    autoNo: { type: Number, unique: true },

    userId: { type: String, index: true },

    title: { type: String },
    body: { type: String },

    eventId: { type: Number },
    taskId: { type: Number },

    read: { type: Boolean },

    data: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Notification", NotificationSchema);
