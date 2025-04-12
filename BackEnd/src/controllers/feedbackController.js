import Feedback from "../models/Feedback.js";

export const addFeedback = async (req, res) => {
  try {
    const { message, rating } = req.body;
    if (!message || !rating) {
      return res.status(400).json({ success: false, message: "Message and rating are required" });
    }
    const feedback = new Feedback({
      user: req.user.id, 
      message,
      rating,
    });
    await feedback.save();
    res.status(201).json({ success: true, message: "Feedback submitted successfully!", feedback });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
  }
};

export const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate("user", "firstname lastname email");
    res.status(200).json({ success: true, feedbacks });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
  }
};

export const deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return res.status(404).json({ success: false, message: "Feedback not found" });
    }

    await feedback.deleteOne();
    res.status(200).json({ success: true, message: "Feedback deleted successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
  }
};
