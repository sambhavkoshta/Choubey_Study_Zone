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
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [disableRegister, setDisableRegister] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const startResendTimer = () => {
    setDisableRegister(true); // Disable Register Button
    let timeLeft = 30;
    setResendTimer(timeLeft);

    const timer = setInterval(() => {
      timeLeft -= 1;
      setResendTimer(timeLeft);

      if (timeLeft === 0) {
        clearInterval(timer);
        setDisableRegister(false); // Enable Register Button
      }
    }, 1000);
  };

  const handleSendOTP = async () => {
    if (!formData.email) return toast.error("Email is required!");
    setLoading(true);
    try {
      await sendOTP(formData.email);
      toast.success("OTP sent successfully!");
      setOtpSent(true); // Change button to "Resend OTP"
      startResendTimer();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    }
    setLoading(false);
  };

  const handleResendOTP = async () => {
    if (!formData.email) return toast.error("Email is required!");
    setLoading(true);
    try {
      await sendOTP(formData.email);
      toast.success("OTP resent successfully!");
      startResendTimer();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to resend OTP");
    }
    setLoading(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!otpSent) return toast.error("Please send OTP first!");
    setLoading(true);
    try {
      await registerUser(formData);
      toast.success("Registration successful!");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
    setLoading(false);
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
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 bg-gray-100"
              required
            />
            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 bg-gray-100"
              required
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 bg-gray-100"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 bg-gray-100"
            required
          />

          {!otpSent ? (
            <button
              type="button"
              onClick={handleSendOTP}
              disabled={loading}
              className={`w-full p-3 font-semibold rounded-md transition-all duration-300 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          ) : (
            <>
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 bg-gray-100"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 bg-gray-100"
                required
              />
              <button
                type="submit"
                disabled={loading || disableRegister}
                className={`w-full p-3 font-semibold rounded-md transition-all duration-300 ${
                  loading || disableRegister
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700 text-white"
                }`}
              >
                {loading ? "Registering..." : "Register"}
              </button>
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={resendTimer > 0}
                className={`w-full mt-2 p-3 font-semibold rounded-md transition-all duration-300 ${
                  resendTimer > 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-yellow-500 hover:bg-yellow-600 text-white"
                }`}
              >
                {resendTimer > 0 ? `Wait... ${resendTimer}s` : "Resend OTP"}
              </button>
            </>
          )}
        </form>

        <p className="mt-4 text-center text-gray-200">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-400 font-semibold hover:underline"
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
