import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "../src/models/Admin.js";
import connectDB from "../src/config/index.js";

dotenv.config();
connectDB();

const createAdmin = async () => {
    try {
        const adminExists = await Admin.findOne({ email: "admin@example.com" });

        if (!adminExists) {
            const admin = new Admin({
                name: "Admin",
                email: "admin@example.com",
                password: "admin123",
            });

            await admin.save();
            console.log("Admin Created Successfully");
        } else {
            console.log("Admin Already Exists");
        }
        process.exit();
    } catch (error) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
};

createAdmin();
