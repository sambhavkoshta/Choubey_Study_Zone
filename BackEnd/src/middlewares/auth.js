import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    console.log("🔹 Authorization Header:", req.headers.authorization);
    const authHeader = req.headers.authorization?.trim();
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("❌ No Token Provided");
      return res.status(401).json({ success: false, message: "Unauthorized! No token provided." });
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
      if (err) {
        console.log("❌ Token Verification Error:", err);
        let message = "Invalid or expired token!";        
        if (err.name === "TokenExpiredError") {
          message = "Session expired! Please log in again.";
          return res.status(401).json({ success: false, expired: true, message });
        }         
        if (err.name === "JsonWebTokenError") {
          message = "Invalid token! Authentication failed.";
        }
        return res.status(403).json({ success: false, message });
      }
      if (decoded.exp * 1000 < Date.now()) {
        console.log("❌ Token Expired!");
        return res.status(401).json({ success: false, expired: true, message: "Session expired! Please log in again." });
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    console.log("❌ Internal Server Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
