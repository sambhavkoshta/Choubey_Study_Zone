import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const checkAdmin = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id);

    if (!admin) return res.status(403).json({ message: "Access denied!" });

    req.admin = admin;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid Token!" });
  }
};

export default checkAdmin;
