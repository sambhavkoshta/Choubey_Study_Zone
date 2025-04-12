import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import API from "../../api";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaShieldAlt } from "react-icons/fa";
const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setAdmin } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await API.post("/admin/login", { email, password });
      localStorage.setItem("adminToken", data.accessToken);
      setAdmin(data);
      navigate("/admin/dashboard"); 
      setTimeout(() => {
        window.location.reload();
      }, 300);
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative py-4 sm:py-6 md:py-8 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: "url('/images/education-bg.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      <div className="relative bg-white bg-opacity-10 backdrop-blur-lg p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-sm md:max-w-md border border-gray-200 border-opacity-20 transition-all duration-300 hover:shadow-blue-900/20">
        <div className="flex flex-col items-center mb-4 sm:mb-6">
          <div className="bg-blue-600 text-white p-2 sm:p-3 rounded-full mb-3 sm:mb-4 shadow-lg">
            <FaShieldAlt className="h-6 w-6 sm:h-8 sm:w-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Admin Portal</h2>
          <p className="text-xs sm:text-sm text-gray-200 mt-1">Login to access admin dashboard</p>
        </div>        
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 mt-4 sm:mt-6">
          <div className="relative">
            <FaUser className="absolute left-3 top-3 sm:top-3.5 text-gray-400 text-sm sm:text-lg" />
            <input
              type="email"
              placeholder="Enter Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 sm:p-3 pl-9 sm:pl-10 border border-gray-300 border-opacity-50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-800 bg-opacity-30 text-white placeholder-gray-400 transition-all duration-300 text-sm sm:text-base"
            />
          </div>         
          <div className="relative">
            <FaLock className="absolute left-3 top-3 sm:top-3.5 text-gray-400 text-sm sm:text-lg" />
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 sm:p-3 pl-9 sm:pl-10 border border-gray-300 border-opacity-50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-800 bg-opacity-30 text-white placeholder-gray-400 transition-all duration-300 text-sm sm:text-base"
            />
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
              "Login"
            )}
          </button>
        </form>
        <div className="mt-4 sm:mt-6 text-center text-gray-300 text-xs sm:text-sm">
          <p>Secure Admin Access Only</p>
        </div>
      </div>
    </div>
  );
};
export default AdminLogin;