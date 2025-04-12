import Razorpay from "razorpay";
import crypto from "crypto";
import User from "../models/User.js";
import Enrollment from "../models/Enrollment.js";
import Payment from "../models/paymentModel.js";
import Course from "../models/course.model.js";
import dotenv from "dotenv";

dotenv.config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = async (req, res) => {
    try {
    console.log("Payment Request Body:", req.body); // ✅ Debugging
    const { amount, currency, receipt } = req.body;
    if (!amount || !currency || !receipt) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const options = {
      amount: amount * 100, 
      currency,
      receipt: `receipt_${Date.now()}`,
    };
    console.log("🔹 Creating order with options:", options);
    const order = await razorpay.orders.create(options);
    res.status(200).json({
            success: true,
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
        });
  } catch (error) {
    console.error("Payment API Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const verifyPayment = async (req, res) => {
    try {
        console.log("🔹 Received Data for Verification:", req.body);

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId, courseId, amount } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !amount) {
            return res.status(400).json({ success: false, message: "Missing payment details" });
        }

        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body)
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({ success: false, message: "Invalid payment signature" });
        }

        console.log("✅ Payment Verified Successfully!");

        const payment = new Payment({
            userId,
            courseId,
            amount,
            paymentId: razorpay_payment_id,
            status: "Success",
        });
        await payment.save();
        const existingEnrollment = await Enrollment.findOne({ userId, courseId });
        if (existingEnrollment) {
            return res.status(400).json({ success: false, message: "User already enrolled in this course" });
        }
        const newEnrollment = new Enrollment({
            userId,
            courseId,
            paymentId: payment._id, 
        });

        await newEnrollment.save();
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (!user.enrolledCourses.includes(courseId)) {
            user.enrolledCourses.push(courseId);
            await user.save();
        }

        res.status(201).json({ success: true, message: "Enrollment successful", enrollment: newEnrollment });

    } catch (error) {
        console.error("❌ Payment verification error:", error);
        res.status(500).json({ success: false, message: "Payment verification failed" });
    }
};

export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ status: "Success" });
    res.status(200).json({
      payments
    });
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({ message: "Server error" });
  }
};

