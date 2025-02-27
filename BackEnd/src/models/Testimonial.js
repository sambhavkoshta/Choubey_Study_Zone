import mongoose from "mongoose";

const testimonialSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    feedback: { type: String, required: true },
    rating: { type: Number, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

const Testimonial = mongoose.model("Testimonial", testimonialSchema);
export default Testimonial;
