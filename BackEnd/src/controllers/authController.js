import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";
import OTP from "../models/OTP.js";
import Enrollment from "../models/Enrollment.js";
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken.js";

export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    await OTP.deleteMany({ email });

    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); 

    await OTP.create({ email, code: otp, expiresAt: otpExpiry });

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
        <div style="max-width: 500px; margin: auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
          <h2 style="color: #4CAF50; text-align: center;">🔐 Verify Your Email</h2>
          <p style="font-size: 16px;">Hello,</p>
          <p style="font-size: 16px;">Your OTP for email verification is:</p>
          <h1 style="text-align: center; font-size: 32px; color: #333;">${otp}</h1>
          <p style="font-size: 14px; color: red;">This OTP will expire in 10 minutes.</p>
          <hr />
          <p style="font-size: 12px; text-align: center; color: #888;">If you did not request this, please ignore this email.</p>
        </div>
      </div>
    `;

    await sendEmail(email, "🔐 Your OTP Code - Chaubey Study Zone", `Your OTP is: ${otp}`, htmlContent);

    res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const registerStudent = async (req, res) => {
  try {
    const { firstname, lastname, email, phone, password, otp } = req.body;

    const otpRecord = await OTP.findOne({ email, code: otp });
    if (!otpRecord) return res.status(400).json({ message: "Invalid OTP" });

    if (otpRecord.expiresAt < new Date()) {
      await OTP.deleteMany({ email });
      return res.status(400).json({ message: "OTP Expired" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstname,
      lastname,
      email,
      phone,
      password: hashedPassword,
      verified: true,
    });

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    await OTP.deleteMany({ email });

    res.status(201).json({ message: "User registered successfully", token: accessToken, refreshToken });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res.json({ message: "Login successful", token: accessToken, refreshToken });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const sendResetOTP = async (req, res) => {
  try {
    const { email } = req.body;

    await OTP.deleteMany({ email });

    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min expiry

    await OTP.create({ email, code: otp, expiresAt: otpExpiry });

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
        <div style="max-width: 500px; margin: auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
          <h2 style="color: #ff5722; text-align: center;">🔑 Reset Your Password</h2>
          <p style="font-size: 16px;">Hello,</p>
          <p style="font-size: 16px;">We received a request to reset your password. Use the OTP below to proceed:</p>
          <h1 style="text-align: center; font-size: 32px; color: #333;">${otp}</h1>
          <p style="font-size: 14px; color: red;">This OTP will expire in 10 minutes.</p>
          <p style="font-size: 14px;">If you did not request a password reset, please ignore this email.</p>
          <hr />
          <p style="font-size: 12px; text-align: center; color: #888;">- Chaubey Study Zone Team</p>
        </div>
      </div>
    `;

    await sendEmail(
      email,
      "🔑 Reset Password OTP - Chaubey Study Zone",
      `Your OTP to reset your password is: ${otp}`,
      htmlContent
    );

    res.status(200).json({ success: true, message: "Reset OTP sent successfully" });
  } catch (error) {
    console.error("Error sending Reset OTP:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const resetPassword = async (req, res) => {
  const { email, otp, oldPassword, newPassword } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (otp) {
      const otpRecord = await OTP.findOne({ email, code: otp });
      if (!otpRecord) return res.status(400).json({ message: "Invalid or expired OTP" });

      await OTP.deleteOne({ email });
    } else {
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) return res.status(400).json({ message: "Incorrect old password" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password reset successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error resetting password" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("refreshToken"); 
  return res.status(200).json({ success: true, message: "Logged out successfully!" });
};

export const isTokenBlacklisted = (token) => tokenBlacklist.has(token);

export const getProfile = async (req, res) => {
  try {
    console.log("Request User ID:", req.user.id); 

    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Fetched User:", user); 
    res.status(200).json(user);
  } catch (error) {
    console.error("Error in getProfile:", error); 
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { firstname, lastname, phone, email } = req.body;
    const userId = req.user.id;

    if (!firstname && !lastname && !phone && !email) {
      return res.status(400).json({ message: "At least one field is required to update" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (firstname) user.firstname = firstname;
    if (lastname) user.lastname = lastname;
    if (phone) user.phone = phone;
    if (email) user.email = email;

    await user.save();

    res.json({
      message: "Profile updated successfully",
      updatedUser: {
        firstname: user.firstname,
        lastname: user.lastname,
        phone: user.phone,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Update Profile Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    const normalizedEmail = email.toLowerCase();
    await OTP.deleteOne({ email: normalizedEmail });
    const newOTP = Math.floor(100000 + Math.random() * 900000); 
    const expiresAt = Date.now() + 10 * 60 * 1000; 

    const otpEntry = new OTP({
      email: normalizedEmail,
      code: newOTP,
      expiresAt,
    });
    await otpEntry.save();

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
        <div style="max-width: 500px; margin: auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
          <h2 style="color: #4CAF50; text-align: center;">🔐 Resend OTP - Chaubey Study Zone</h2>
          <p style="font-size: 16px;">Hello,</p>
          <p style="font-size: 16px;">Your new OTP for verification is:</p>
          <h1 style="text-align: center; font-size: 32px; color: #333;">${newOTP}</h1>
          <p style="font-size: 14px; color: red;">This OTP will expire in 10 minutes.</p>
          <hr />
          <p style="font-size: 12px; text-align: center; color: #888;">If you did not request this, please ignore this email.</p>
        </div>
      </div>
    `;

    await sendEmail(
      normalizedEmail,
      "🔐 New OTP - Chaubey Study Zone",
      `Your new OTP is: ${newOTP}`,
      htmlContent
    );

    res.status(200).json({ success: true, message: "New OTP sent successfully" });
  } catch (error) {
    console.error("Resend OTP Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const otpRecord = await OTP.findOne({ email, code: otp });

    if (!otpRecord) {
      return res.status(400).json({ message: "Invalid OTP", allowResend: true });
    }

    if (otpRecord.expiresAt < new Date()) {
      await OTP.deleteMany({ email });
      return res.status(400).json({ message: "OTP Expired", allowResend: true });
    }

    await OTP.deleteMany({ email });

    res.status(200).json({ success: true, message: "OTP Verified! Proceed with registration." });
  } catch (error) {
    console.error("OTP Verification Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const checkEnrollment = async (req, res) => {
    try {
        const { userId, courseId } = req.query;

        if (!userId || !courseId) {
            return res.status(400).json({ message: "User ID and Course ID are required" });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isEnrolled = user.enrolledCourses.includes(courseId);

        return res.status(200).json({ enrolled: isEnrolled });
    } catch (error) {
        console.error("Error checking enrollment:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getEnrolledCourses = async (req, res) => {
    try {
        console.log("Requested User ID:", req.params.id); 

        if (!req.params.id) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const student = await User.findById(req.params.id).populate("enrolledCourses");
        if (!student) {
            return res.status(404).json({ message: "User not found" });
        }

        console.log("Fetched Enrolled Courses:", student.enrolledCourses); 
        res.status(200).json({ enrolledCourses: student.enrolledCourses });
    } catch (error) {
        console.error("Error fetching enrolled courses:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
