import express from "express";
import connectDB from "./config/index.js";
import cors from "cors";
import { limiter } from "./middlewares/rateLimiter.js";
import helmet from "helmet";
import xssClean from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import adminRoutes from "./routes/adminRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import studyMaterialRoutes from "./routes/studyMaterialRoutes.js";
import facultyRoutes from "./routes/facultyRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";

import paymentRoutes from "./routes/paymentRoutes.js";


dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);
app.use(cookieParser());
app.use(mongoSanitize()); // Prevent NoSQL Injection
app.use(helmet()); // Secure HTTP Headers
app.use(xssClean()); // Prevent Cross-site Scripting
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true, // Allow Cookies
    methods: ["GET", "POST", "PUT","PATCH", "DELETE"], // Allowed Methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed Headers
  })
);





connectDB();


app.use("/api/courses", courseRoutes);
app.use('/api/contact', contactRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/student", authRoutes);
app.use("/api/study-materials", studyMaterialRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/feedbacks", feedbackRoutes);
app.use("/api/payments", paymentRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
