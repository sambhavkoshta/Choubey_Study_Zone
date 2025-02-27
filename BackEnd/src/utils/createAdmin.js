import bcrypt from "bcrypt";
import { User } from "../models/user.model.js"; // User model

const createAdmin=async function createAdmin() {
  const existingAdmin = await User.findOne({ role: "admin" });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("admin1234", 10); // Set a default password
    const newAdmin = new User({
      email: "admin@example.com", // Default admin email
      password: hashedPassword, // Hashed password
      role: "admin",
    });
    await newAdmin.save();
    console.log("Admin created successfully");
  } else {
    console.log("Admin already exists");
  }
}

export default createAdmin;
