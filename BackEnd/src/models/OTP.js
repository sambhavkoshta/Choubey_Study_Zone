import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, lowercase: true, trim: true },
    code: { type: Number, required: true },
    expiresAt: { 
      type: Date, 
      required: true, 
      default: () => new Date(Date.now() + 10 * 60 * 1000), 
      index: { expires: "10m" } 
    },
  },
  { timestamps: true }
);

export default mongoose.model("OTP", otpSchema);
