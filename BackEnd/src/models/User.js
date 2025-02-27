import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  verified: { type: Boolean, default: false },
  resetToken: { type: String, default: null },
  tokenExpiry: { type: Date, default: null }
});

export default mongoose.model("User", UserSchema);
