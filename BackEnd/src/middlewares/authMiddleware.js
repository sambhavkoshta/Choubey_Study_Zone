import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

export const protectAdmin = async (req, res, next) => {
  let token = req.headers.authorization;

  if (token && token.startsWith("Bearer")) {
    try {
      const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_ACCESS_SECRET);
      req.admin = await Admin.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      return res.status(401).json({ message: "Session Expired! Please Login Again." });
    }
  } else {
    return res.status(401).json({ message: "Unauthorized, No Token" });
  }
};
