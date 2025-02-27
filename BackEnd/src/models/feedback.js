import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Feedback", FeedbackSchema);
