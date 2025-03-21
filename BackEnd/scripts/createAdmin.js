import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Admin from "../src/models/Admin.js";
import dotenv from "dotenv";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const existingAdmin = await Admin.findOne({ email: "admin@example.com" });
    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("Admin@123", 10);
    
    const admin = new Admin({
      name: "Admin User",
      email: "admin@example.com",
      password: hashedPassword,
    });

    await admin.save();
    console.log("Admin created successfully!");
    process.exit();
  } catch (error) {
    console.error("Error creating admin:", error);
    process.exit(1);
  }
};

createAdmin();
