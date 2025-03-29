import Enrollment from "../models/Enrollment.js";

export const getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find()
      .populate("userId", "firstname lastname email") // User details
      .populate("courseId", "title description") // Course details
      .populate("paymentId", "amount status") // Payment details
      .sort({ enrolledAt: -1 }); // Sort by latest enrollments

    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching enrollments", error });
  }
};
