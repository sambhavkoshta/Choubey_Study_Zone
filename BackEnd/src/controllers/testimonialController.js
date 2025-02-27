import Testimonial from "../models/Testimonial.js";

// ✅ Get All Testimonials
export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.status(200).json({ testimonials });
  } catch (error) {
    res.status(500).json({ message: "Error fetching testimonials", error });
  }
};

// ✅ Add a Testimonial
export const addTestimonial = async (req, res) => {
  try {
    const newTestimonial = new Testimonial(req.body);
    await newTestimonial.save();
    res.status(201).json({ message: "Testimonial added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error adding testimonial", error });
  }
};

// ✅ Update Testimonial
export const updateTestimonial = async (req, res) => {
  try {
    await Testimonial.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ message: "Testimonial updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error updating testimonial", error });
  }
};

// ✅ Delete Testimonial
export const deleteTestimonial = async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Testimonial deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting testimonial", error });
  }
};
