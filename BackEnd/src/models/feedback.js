import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // यह User Model से जुड़ेगा
      required: true,
    },
    message: {
      type: String,
      required: [true, "Feedback message is required"],
      trim: true,
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: 1,
      max: 5,
    },
  },
  { timestamps: true } // CreatedAt & UpdatedAt अपने आप add होंगे
);

export default mongoose.model("Feedback", feedbackSchema);
