import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPassword } from "../api";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = new URLSearchParams(location.search).get("email");

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error("Enter a valid 6-digit OTP");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      await resetPassword({ email, otp, newPassword });
      toast.success("Password reset successful! Please login.");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center p-4"
      style={{ backgroundImage: "url('/images/password-reset-bg.jpg')" }}
    >
      <div className="bg-white bg-opacity-50 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md transition-all duration-300">
        <h2 className="text-2xl font-bold text-center text-gray-800">🔒 Reset Password</h2>
        <p className="text-sm text-gray-500 text-center">Enter OTP and set a new password</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Enter OTP"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="New Password"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className={`w-full p-3 font-semibold rounded-md transition-all duration-300 ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white"
            }`}
            disabled={loading}
          >
            {loading ? "Resetting Password..." : "Reset Password"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Back to {" "}
          <button onClick={() => navigate("/login")} className="text-blue-500 font-semibold hover:underline">
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
