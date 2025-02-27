import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken.js";

// 📌 Admin Login
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("🔹 Received Admin Login Request - Email:", email);

    const admin = await Admin.findOne({ email });
    if (!admin) {
      console.log("❌ Admin Not Found!");
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    // 🔐 Compare Password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      console.log("❌ Password does not match!");
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    // ✅ Generate Tokens
    const accessToken = generateAccessToken(admin._id);
    const refreshToken = generateRefreshToken(admin._id);

    // 🔄 Save Refresh Token in Database
    admin.refreshToken = refreshToken;
    await admin.save();

    // 🍪 Store Refresh Token in HttpOnly Cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    // ✅ Send Response
    return res.json({ 
      _id: admin._id, 
      name: admin.name, 
      email: admin.email, 
      accessToken 
    });

  } catch (error) {
    console.error("🚨 Error in Admin Login:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// 📌 Get Admin Profile
export const getAdminProfile = async (req, res) => {
  try {
    const { name, email } = req.admin;
    res.json({ name, email });
  } catch (error) {
    console.error("🚨 Error Fetching Admin Profile:", error.message);
    res.status(500).json({ message: "Failed to Fetch Admin Profile" });
  }
};

// 📌 Refresh Access Token
export const refreshAdminToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) return res.status(401).json({ message: "Unauthorized, No Token" });

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const admin = await Admin.findById(decoded.id);

    if (!admin || admin.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "Invalid or Expired Token" });
    }

    // ✅ Generate New Tokens
    const newAccessToken = generateAccessToken(admin._id);
    const newRefreshToken = generateRefreshToken(admin._id);

    // 🔄 Update Refresh Token in DB
    admin.refreshToken = newRefreshToken;
    await admin.save();

    // 🍪 Update Cookie
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    res.json({ accessToken: newAccessToken });

  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token Expired, Please Login Again" });
    }
    console.error("🚨 Refresh Token Error:", error.message);
    res.status(403).json({ message: "Forbidden, Invalid Token" });
  }
};

// 📌 Logout Admin
export const logoutAdmin = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) return res.status(400).json({ message: "No Token Found" });

    const admin = await Admin.findOne({ refreshToken });
    if (!admin) return res.status(400).json({ message: "Invalid Token" });

    // 🚀 Remove Refresh Token from DB
    admin.refreshToken = null;
    await admin.save();

    // 🍪 Clear Cookie
    res.clearCookie("refreshToken");

    res.status(200).json({ message: "Logged out successfully!" });

  } catch (error) {
    console.error("🚨 Logout Error:", error.message);
    res.status(500).json({ message: "Failed to Logout" });
  }
};
