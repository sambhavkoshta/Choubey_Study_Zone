import Razorpay from "razorpay";
import crypto from "crypto";
import User from "../models/User.js";
import Payment from "../models/paymentModel.js";
import Course from "../models/course.model.js";
import dotenv from "dotenv";

dotenv.config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// 🔹 Create Order API (Step 1: Payment Initiation)
export const createOrder = async (req, res) => {
    // try {
    //     const { amount, currency, courseId } = req.body;

    //     if (!amount || !currency || !courseId) {
    //         return res.status(400).json({ success: false, message: "Missing required fields." });
    //     }

    //     const course = await Course.findById(courseId);
    //     if (!course) {
    //         return res.status(404).json({ success: false, message: "Course not found" });
    //     }

    //     const options = {
    //         amount: amount * 100, // Convert to paisa
    //         currency,
    //         receipt: `order_rcptid_${Date.now()}`,
    //     };

    //     const order = await razorpay.orders.create(options);

    //     res.status(200).json({
    //         success: true,
    //         orderId: order.id,
    //         amount: order.amount,
    //         currency: order.currency,
    //     });
    // } catch (error) {
    //     console.error("Error creating Razorpay order:", error);
    //     res.status(500).json({ success: false, message: "Error creating order" });
    // }
    try {
    console.log("Payment Request Body:", req.body); // ✅ Debugging
    const { amount, currency, receipt } = req.body;
    
    if (!amount || !currency || !receipt) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const options = {
      amount: amount * 100, // ₹ को पैसे में convert करना (Razorpay में पैसे में होता है)
      currency,
      receipt: `receipt_${Date.now()}`,
    };
    console.log("🔹 Creating order with options:", options);
    const order = await razorpay.orders.create(options);
    res.status(200).json({
            success: true,
            orderId: order.id, // ✅ Return orderId properly
            amount: order.amount,
            currency: order.currency,
        });
  } catch (error) {
    console.error("Payment API Error:", error); // ✅ Debugging के लिए log करो
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 🔹 Verify Payment & Store Enrollment (Step 2: After Payment Success)
// export const verifyPayment = async (req, res) => {
//     try {
//         const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId, courseId } = req.body;

//         const body = razorpay_order_id + "|" + razorpay_payment_id;
//         const expectedSignature = crypto
//             .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//             .update(body)
//             .digest("hex");

//         if (expectedSignature !== razorpay_signature) {
//             return res.status(400).json({ success: false, message: "Invalid payment signature" });
//         }

//         // 🔹 Save Payment Record
//         const payment = new Payment({
//             orderId: razorpay_order_id,
//             paymentId: razorpay_payment_id,
//             signature: razorpay_signature,
//             userId,
//             courseId,
//             status: "Success",
//         });

//         await payment.save();

//         // 🔹 Add Course to User's Enrolled Courses
//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({ success: false, message: "User not found" });
//         }

//         if (!user.enrolledCourses.includes(courseId)) {
//             user.enrolledCourses.push(courseId);
//             await user.save();
//         }

//         res.status(200).json({ success: true, message: "Payment successful, course enrolled!" });
//     } catch (error) {
//         console.error("Payment verification error:", error);
//         res.status(500).json({ success: false, message: "Payment verification failed" });
//     }
// };
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
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id,
            signature: razorpay_signature,
            userId,
            courseId,
            amount,
            status: "Success",
        });

        await payment.save();

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (!user.enrolledCourses.includes(courseId)) {
            user.enrolledCourses.push(courseId);
            await user.save();
        }

        res.status(200).json({ success: true, message: "Payment successful, course enrolled!" });

    } catch (error) {
        console.error("❌ Payment verification error:", error);
        res.status(500).json({ success: false, message: "Payment verification failed" });
    }
};
