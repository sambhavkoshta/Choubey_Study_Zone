import mongoose from "mongoose";

const facultySchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    subject: { type: String, required: true },
    experience: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

const Faculty = mongoose.model("Faculty", facultySchema);
export default Faculty;
