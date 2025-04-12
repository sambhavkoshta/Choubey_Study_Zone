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
import feedbackRoutes from "./routes/feedbackRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);
app.use(cookieParser());
app.use(mongoSanitize());
app.use(helmet());
app.use(xssClean());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT","PATCH", "DELETE"], 
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
connectDB();
app.use("/api/courses", courseRoutes);
app.use('/api/contact', contactRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/student", authRoutes);
app.use("/api/study-materials", studyMaterialRoutes);
app.use("/api/feedbacks", feedbackRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/enrollments", enrollmentRoutes);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
