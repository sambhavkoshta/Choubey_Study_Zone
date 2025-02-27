import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, lowercase: true, trim: true },
    code: { type: Number, required: true }, // OTP as a number (more secure)
    expiresAt: { 
      type: Date, 
      required: true, 
      default: () => new Date(Date.now() + 10 * 60 * 1000), // Default Expiry (10 Min)
      index: { expires: "10m" } // Auto-delete after 10 minutes
    },
  },
  { timestamps: true } // CreatedAt & UpdatedAt fields automatically add होंगे।
);

export default mongoose.model("OTP", otpSchema);
