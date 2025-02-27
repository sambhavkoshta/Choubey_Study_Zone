// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";

// const StudentSchema = new mongoose.Schema(
//   {
//     firstName: { type: String, required: true },
//     lastName: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     phone: { type: String, required: true },
//     password: { type: String, required: true },
//     enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
//   },
//   { timestamps: true }
// );

// // Password Hashing
// StudentSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// const Student = mongoose.model("Student", StudentSchema);
// export default Student;


import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const studentSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// Password Hashing Middleware
studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export default mongoose.model("Student", studentSchema);
