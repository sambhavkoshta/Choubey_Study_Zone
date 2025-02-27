import { useState } from "react";
import { sendForgotPasswordOTP } from "../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter your email!");

    setLoading(true);
    try {
      const response = await sendForgotPasswordOTP(email);
      toast.success(response.data.message || "OTP sent successfully! Check your email.");
      setTimeout(() => {
        navigate(`/reset-password?email=${encodeURIComponent(email)}`);
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center relative" style={{ backgroundImage: "url('/images/password-reset-bg.jpg')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative bg-white bg-opacity-20 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-300">
        <h2 className="text-3xl font-bold text-center text-white">🔐 Forgot Password?</h2>
        <p className="text-sm text-gray-200 text-center">Enter your email to receive an OTP</p>
        
        <form onSubmit={handleSendOTP} className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 bg-gray-100"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 font-semibold rounded-md transition-all duration-300 ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
