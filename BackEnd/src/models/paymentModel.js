import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  amount: { type: Number, required: true },
  paymentId: { type: String, required: true },
  status: { type: String, enum: ["Success", "Failed"], default: "Success" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Payment", PaymentSchema);
