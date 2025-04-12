import Enrollment from "../models/Enrollment.js";

export const getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find()
      .populate("userId", "firstname lastname email")
      .populate("courseId", "title description") 
      .populate("paymentId", "amount status")
      .sort({ enrolledAt: -1 }); 
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching enrollments", error });
  }
};
