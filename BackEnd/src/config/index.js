import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        const connectionString = `${process.env.MONGODB_URI}`;
        console.log(`Connecting to MongoDB with URI: ${connectionString}`);
        const connection = await mongoose.connect(connectionString);
        console.log(`\n MongoDB connected !! DB HOST : ${connection.connection.host}`);
    } catch (error) {
        console.error("MONGODB connection error:", error.message); 
        console.error("Full error details:", error);
        process.exit(1);
    }
}

export default connectDB;