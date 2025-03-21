import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  paymentId: { type: mongoose.Schema.Types.ObjectId, ref: "Payment" },
  enrolledAt: { type: Date, default: Date.now },
});

export default mongoose.model("Enrollment", enrollmentSchema);
