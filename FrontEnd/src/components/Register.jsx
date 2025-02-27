import { useState } from "react";
import { sendOTP, registerUser } from "../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    otp: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false); // Only for OTP sending
  const [registerLoading, setRegisterLoading] = useState(false); // Only for Registration
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(30);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOTP = async () => {
    if (!formData.email) return toast.error("Email is required!");
    setOtpLoading(true);
    try {
      await sendOTP(formData.email);
      toast.success("OTP sent successfully!");
      setOtpSent(true);
      setResendDisabled(true);
      setCountdown(30);

      // 30 सेकंड का काउंटडाउन स्टार्ट करें
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            setResendDisabled(false);
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    }
    setOtpLoading(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!otpSent) return toast.error("Please send OTP first!");
    setRegisterLoading(true);
    try {
      await registerUser(formData);
      toast.success("Registration successful!");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
    setRegisterLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center relative"
         style={{ backgroundImage: "url('/images/education-bg.jpg')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      <div className="relative bg-white bg-opacity-20 backdrop-blur-xl p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-300">
        <h2 className="text-3xl font-bold text-center text-white">📚 Sign Up</h2>
        <p className="text-sm text-gray-200 text-center">Join us and start learning today!</p>

        <form onSubmit={handleRegister} className="mt-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <input type="text" name="firstname" placeholder="First Name" onChange={handleChange} className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 bg-gray-100" required />
            <input type="text" name="lastname" placeholder="Last Name" onChange={handleChange} className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 bg-gray-100" required />
          </div>

          <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 bg-gray-100" required />
          <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 bg-gray-100" required />

          {!otpSent ? (
            <button type="button" onClick={handleSendOTP} disabled={otpLoading} className={`w-full p-3 font-semibold rounded-md transition-all duration-300 ${otpLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"}`}>
              {otpLoading ? "Sending OTP..." : "Send OTP"}
            </button>
          ) : (
            <button type="button" onClick={handleSendOTP} disabled={resendDisabled || otpLoading} className={`w-full p-3 font-semibold rounded-md transition-all duration-300 ${resendDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"}`}>
              {resendDisabled ? `Resend OTP (${countdown}s)` : (otpLoading ? "Sending OTP..." : "Resend OTP")}
            </button>
          )}

          {otpSent && (
            <>
              <input type="text" name="otp" placeholder="Enter OTP" onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 bg-gray-100" required />
              <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 bg-gray-100" required />
              <button type="submit" disabled={registerLoading} className={`w-full p-3 font-semibold rounded-md transition-all duration-300 ${registerLoading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white"}`}>
                {registerLoading ? "Registering..." : "Register"}
              </button>
            </>
          )}
        </form>

        <p className="mt-4 text-center text-gray-200">
          Already have an account?{" "}
          <button onClick={() => navigate("/login")} className="text-blue-400 font-semibold hover:underline">
            Login here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
