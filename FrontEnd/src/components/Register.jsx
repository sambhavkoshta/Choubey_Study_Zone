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
  const [otpLoading, setOtpLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
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
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center relative bg-gray-100 py-8 px-4 sm:px-6 lg:px-8"
         style={{ backgroundImage: "url('/images/education-bg.jpg')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>

      <div className="relative bg-white bg-opacity-10 backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200 border-opacity-20 transition-all duration-300 hover:shadow-blue-900/20">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-blue-600 text-white p-3 rounded-full mb-4 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white">Sign Up</h2>
          <p className="text-sm text-gray-200 mt-1">Join us and start learning today!</p>
        </div>

        <form onSubmit={handleRegister} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="relative">
              <input 
                type="text" 
                name="firstname" 
                placeholder="First Name" 
                onChange={handleChange} 
                className="w-full p-3 pl-10 border border-gray-300 border-opacity-50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-800 bg-opacity-30 text-white placeholder-gray-400 transition-all duration-300" 
                required 
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="relative">
              <input 
                type="text" 
                name="lastname" 
                placeholder="Last Name" 
                onChange={handleChange} 
                className="w-full p-3 pl-10 border border-gray-300 border-opacity-50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-800 bg-opacity-30 text-white placeholder-gray-400 transition-all duration-300" 
                required 
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>

          <div className="relative">
            <input 
              type="email" 
              name="email" 
              placeholder="Email" 
              onChange={handleChange} 
              className="w-full p-3 pl-10 border border-gray-300 border-opacity-50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-800 bg-opacity-30 text-white placeholder-gray-400 transition-all duration-300" 
              required 
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>

          <div className="relative">
            <input 
              type="text" 
              name="phone" 
              placeholder="Phone Number" 
              onChange={handleChange} 
              className="w-full p-3 pl-10 border border-gray-300 border-opacity-50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-800 bg-opacity-30 text-white placeholder-gray-400 transition-all duration-300" 
              required 
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>

          {!otpSent ? (
            <button 
              type="button" 
              onClick={handleSendOTP} 
              disabled={otpLoading} 
              className={`w-full p-3 font-semibold rounded-lg transition-all duration-300 flex items-center justify-center ${otpLoading ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-600/50"}`}
            >
              {otpLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending OTP...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Send OTP
                </>
              )}
            </button>
          ) : (
            <button 
              type="button" 
              onClick={handleSendOTP} 
              disabled={resendDisabled || otpLoading} 
              className={`w-full p-3 font-semibold rounded-lg transition-all duration-300 flex items-center justify-center ${resendDisabled || otpLoading ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-600/50"}`}
            >
              {resendDisabled ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Resend OTP ({countdown}s)
                </>
              ) : otpLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending OTP...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Resend OTP
                </>
              )}
            </button>
          )}

          {otpSent && (
            <>
              <div className="relative">
                <input 
                  type="text" 
                  name="otp" 
                  placeholder="Enter OTP" 
                  onChange={handleChange} 
                  className="w-full p-3 pl-10 border border-gray-300 border-opacity-50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-800 bg-opacity-30 text-white placeholder-gray-400 transition-all duration-300" 
                  required 
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              
              <div className="relative">
                <input 
                  type="password" 
                  name="password" 
                  placeholder="Password" 
                  onChange={handleChange} 
                  className="w-full p-3 pl-10 border border-gray-300 border-opacity-50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-800 bg-opacity-30 text-white placeholder-gray-400 transition-all duration-300" 
                  required 
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              
              <button 
                type="submit" 
                disabled={registerLoading} 
                className={`w-full p-3 font-semibold rounded-lg transition-all duration-300 flex items-center justify-center ${registerLoading ? "bg-gray-600 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-green-600/50"}`}
              >
                {registerLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Registering...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Register
                  </>
                )}
              </button>
            </>
          )}
        </form>

        {/* <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 border-opacity-20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-900 bg-opacity-50 text-gray-300">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button type="button" className="flex justify-center items-center py-2.5 px-4 border border-gray-300 border-opacity-50 rounded-lg shadow-sm bg-white bg-opacity-10 text-gray-200 hover:bg-opacity-20 transition-all duration-300">
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.5 12.1364C22.5 11.1515 22.4091 10.4091 22.2045 9.63635H12V13.5455H18.0682C17.9091 14.5773 17.25 16.0114 15.8182 17.0455L15.7892 17.2034L18.9341 19.6273L19.1591 19.6501C21.1591 17.8364 22.5 15.2182 22.5 12.1364Z" fill="#4285F4"/>
                <path d="M12 22.5C15 22.5 17.5 21.5 19.1591 19.6496L15.8182 17.0454C14.8636 17.7001 13.5955 18.1364 12 18.1364C9.00012 18.1364 6.47731 16.1932 5.52285 13.5001L5.37288 13.5106L2.08838 16.0338L2.04562 16.1774C3.69012 19.9183 7.52276 22.5 12 22.5Z" fill="#34A853"/>
                <path d="M5.52296 13.5C5.27296 12.7273 5.1365 11.9 5.1365 11.0454C5.13652 10.1909 5.27301 9.36363 5.50959 8.59092L5.50198 8.42124L2.16364 5.8533L2.04592 5.90909C1.1777 7.47728 0.68182 9.22273 0.68182 11.0454C0.68182 12.8682 1.1777 14.6136 2.04592 16.1818L5.52296 13.5Z" fill="#FBBC05"/>
                <path d="M12 3.95452C14.0045 3.95452 15.3818 4.75C16.0864 5.27273 16.5682 5.90909 16.7727 6.13636L19.8182 3.22728C17.9182 1.47728 15 0.5 12 0.5C7.52276 0.5 3.69013 3.08182 2.04562 6.82273L5.5096 9.59091C6.47731 6.89773 9.00012 3.95452 12 3.95452Z" fill="#EB4335"/>
              </svg>
              Google
            </button>
            <button type="button" className="flex justify-center items-center py-2.5 px-4 border border-gray-300 border-opacity-50 rounded-lg shadow-sm bg-white bg-opacity-10 text-gray-200 hover:bg-opacity-20 transition-all duration-300">
              <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"/>
              </svg>
              Facebook
            </button>
          </div>
        </div> */}

        <p className="mt-6 text-center text-gray-300">
          Already have an account?{" "}
          <button onClick={() => navigate("/login")} className="text-blue-400 font-semibold hover:underline transition-all duration-300">
            Login here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;