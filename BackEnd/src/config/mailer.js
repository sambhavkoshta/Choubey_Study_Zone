import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOTP = async (email, otp) => {
  try {
    const mailOptions = {
      from: `"Chaubey Study Zone" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP for Email Verification",
      text: `Your OTP for email verification is: ${otp}`,
      html: `
        <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
          <h2 style="color: #4CAF50;">Email Verification OTP</h2>
          <p>Your One-Time Password (OTP) is:</p>
          <h3 style="color: #333; font-size: 24px;">${otp}</h3>
          <p>This OTP is valid for 10 minutes.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ OTP sent successfully to ${email}`);
  } catch (error) {
    console.error("❌ Error sending OTP:", error);
    throw new Error("Failed to send OTP. Please try again later.");
  }
};
