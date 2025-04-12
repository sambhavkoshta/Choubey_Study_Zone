import { useState } from "react";
import { loginUser } from "../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!credentials.email || !credentials.password) {
      return toast.error("Please enter your email and password!");
    }
    setLoading(true);
    try {
      const { data } = await loginUser(credentials);
      localStorage.setItem("userToken", data.token);
      localStorage.setItem("lastActivity", Date.now());
      toast.success("Login successful!");
      navigate("/dashboard");
      setTimeout(() => {
        window.location.reload();
      }, 300);
    } catch (error) {
      toast.error(error.response?.data?.message || error?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center relative py-4 sm:py-6 md:py-8 px-4 sm:px-6 lg:px-8" 
         style={{ backgroundImage: "url('/images/education-bg.jpg')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      <div className="relative bg-white bg-opacity-10 backdrop-blur-lg p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-sm md:max-w-md border border-gray-200 border-opacity-20 transition-all duration-300 hover:shadow-blue-900/20">
        <div className="flex flex-col items-center mb-4 sm:mb-6">
          <div className="bg-blue-600 text-white p-2 sm:p-3 rounded-full mb-3 sm:mb-4 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Welcome Back</h2>
          <p className="text-xs sm:text-sm text-gray-200 mt-1">Login to access your dashboard</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-3 sm:space-y-4 mt-4 sm:mt-6">
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={credentials.email}
              onChange={handleChange}
              className="w-full p-2 sm:p-3 pl-9 sm:pl-10 border border-gray-300 border-opacity-50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-800 bg-opacity-30 text-white placeholder-gray-400 transition-all duration-300 text-sm sm:text-base"
              autoComplete="email"
              required
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 absolute left-3 top-3 sm:top-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="relative">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full p-2 sm:p-3 pl-9 sm:pl-10 border border-gray-300 border-opacity-50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-800 bg-opacity-30 text-white placeholder-gray-400 transition-all duration-300 text-sm sm:text-base"
              autoComplete="current-password"
              required
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 absolute left-3 top-3 sm:top-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <button
            type="submit"
            className={`w-full p-2 sm:p-3 font-semibold rounded-lg transition-all duration-300 flex items-center justify-center text-sm sm:text-base ${
              loading ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-600/50"
            }`}
            disabled={loading}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Login
              </>
            )}
          </button>
        </form>
        <div className="mt-4 sm:mt-6 flex flex-col space-y-2 text-xs sm:text-sm text-gray-300">
          <button 
            onClick={() => navigate("/forgot-password")} 
            className="hover:text-blue-400 transition-colors duration-300 font-medium w-full text-center sm:text-left"
          >
            Forgot Password?
          </button>
          <div className="text-center">
            Don't have an account?{" "}
            <button 
              onClick={() => navigate("/register")} 
              className="text-blue-400 font-semibold hover:underline transition-all duration-300"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;