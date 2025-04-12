import Admin from "../models/Admin.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken.js";
import { sendOTP } from "../config/mailer.js";
import Course from "../models/course.model.js";
import Gallery from "../models/galleryModel.js"
import Feedback from "../models/Feedback.js";
import Contact from "../models/Contact.js";

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(admin._id);
    const refreshToken = generateRefreshToken(admin._id);

    admin.refreshToken = refreshToken;
    await admin.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    res.json({ _id: admin._id, name: admin.firstname, email: admin.email, accessToken });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id).select("-password");
    if (!admin) return res.status(404).json({ message: "Admin not found" });
    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: "Server Error!" });
  }
};


export const getAdminStats = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments();
    const totalCourses = await Course.countDocuments();
    const galleryImages = await Gallery.countDocuments();
    const feedbackReceived = await Feedback.countDocuments();
    const contactQueries = await Contact.countDocuments();
    const totalFaculty = await Faculty.countDocuments();

    res.json({
      totalStudents,
      totalCourses,
      galleryImages,
      studyMaterials,
      feedbackReceived,
      contactQueries,
      totalFaculty,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching stats", error });
  }
};

export const refreshAdminToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) return res.status(401).json({ message: "Unauthorized, No Token" });

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const admin = await Admin.findById(decoded.id);

    if (!admin || admin.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "Invalid or Expired Token" });
    }

    const newAccessToken = generateAccessToken(admin._id);
    const newRefreshToken = generateRefreshToken(admin._id);

    admin.refreshToken = newRefreshToken;
    await admin.save();

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    res.json({ accessToken: newAccessToken });
  } catch (error) {
    return res.status(403).json({ message: "Forbidden, Invalid Token" });
  }
};


export const logoutAdmin = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) return res.status(400).json({ message: "No Token Found" });

    const admin = await Admin.findOne({ refreshToken });
    if (!admin) return res.status(400).json({ message: "Invalid Token" });

    admin.refreshToken = null;
    await admin.save();

    res.clearCookie("refreshToken");

    res.status(200).json({ message: "Logged out successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to Logout" });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpToken = jwt.sign({ email, otp }, process.env.JWT_SECRET, { expiresIn: "10m" });

    await sendOTP(email, otp);

    res.json({ message: "OTP sent to your email", otpToken });
  } catch (error) {
    res.status(500).json({ message: "Error sending OTP" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { otp, newPassword } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || decoded.otp !== otp) {
      return res.status(400).json({ message: "Invalid or Expired OTP" });
    }

    const admin = await Admin.findOne({ email: decoded.email });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    admin.password = await bcrypt.hash(newPassword, 10);
    await admin.save();

    res.json({ message: "Password reset successfully!" });
  } catch (error) {
    res.status(400).json({ message: "Invalid or Expired Token" });
  }
};

export const getAllStudents = async (req, res) => {
  try {
    const students = await User.find().select("-password").populate({path : "enrolledCourses", select : "title"});;
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const { firstName, lastName, phone } = req.body;
    const student = await User.findByIdAndUpdate(req.params.id, { firstName, lastName, phone }, { new: true });
    if (!student) return res.status(404).json({ message: "Student not found" });

    res.json({ message: "Student updated successfully", student });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const student = await User.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    await Enrollment.deleteMany({ studentId: req.params.id });

    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
