import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization?.trim();

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Unauthorized! No token provided." });
    }

    const token = authHeader.split(" ")[1];

    // JWT Token Verification
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(403).json({ success: false, message: "Invalid or expired token!" });
  }
};
