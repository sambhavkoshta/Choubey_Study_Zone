import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// 📌 Reusable Transporter (हर बार नई instance बनाने की जरूरत नहीं)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * 📩 Send Email Utility Function
 * @param {string} email - Receiver Email Address
 * @param {string} subject - Email Subject
 * @param {string} text - Plain Text Message
 * @param {string} html - HTML Content (Optional)
 */
const sendEmail = async (email, subject, text, html = "") => {
  try {
    const mailOptions = {
      from: `"Chaubey Study Zone" <${process.env.EMAIL_USER}>`, // Professional Email Header
      to: email,
      subject: subject,
      text: text,
      html: html || `<p>${text}</p>`, // अगर HTML न मिले तो plain text को wrap कर देंगे
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent successfully to ${email}`);
  } catch (error) {
    console.error("❌ Email Not Sent", error);
    throw new Error("Failed to send email. Please try again later.");
  }
};

export default sendEmail;
