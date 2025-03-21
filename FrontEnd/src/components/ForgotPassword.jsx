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
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center relative py-8 px-4 sm:px-6 lg:px-8" 
         style={{ backgroundImage: "url('/images/password-reset-bg.jpg')" }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>

      {/* Forgot Password Box */}
      <div className="relative bg-white bg-opacity-10 backdrop-blur-lg p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-sm md:max-w-md border border-gray-200 border-opacity-20 transition-all duration-300 hover:shadow-blue-900/20">
        <div className="flex flex-col items-center mb-4 sm:mb-6">
          <div className="bg-blue-600 text-white p-2 sm:p-3 rounded-full mb-3 sm:mb-4 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Forgot Password?</h2>
          <p className="text-xs sm:text-sm text-gray-200 mt-1 text-center">Enter your email to receive a verification code</p>
        </div>

        <form onSubmit={handleSendOTP} className="space-y-3 sm:space-y-4 mt-4 sm:mt-6">
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 sm:p-3 pl-8 sm:pl-10 text-sm sm:text-base border border-gray-300 border-opacity-50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-800 bg-opacity-30 text-white placeholder-gray-400 transition-all duration-300"
              autoComplete="email"
              required
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 absolute left-2 sm:left-3 top-3 sm:top-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>

          <button
            type="submit"
            className={`w-full p-2 sm:p-3 text-sm sm:text-base font-semibold rounded-lg transition-all duration-300 flex items-center justify-center ${
              loading ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-600/50"
            }`}
            disabled={loading}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="truncate">Sending OTP...</span>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="truncate">Send Verification Code</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row sm:justify-between items-center space-y-2 sm:space-y-0 text-xs sm:text-sm text-gray-300">
          <button onClick={() => navigate("/login")} className="hover:text-blue-400 transition-colors duration-300 font-medium">
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Login
            </span>
          </button>
          <div className="text-center sm:text-right">
            <span className="text-gray-300">Don't have an account?</span>{" "}
            <button onClick={() => navigate("/register")} className="text-blue-400 font-semibold hover:underline transition-all duration-300">
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;