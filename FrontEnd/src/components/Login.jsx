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
      toast.success("Login successful!");
      navigate("/dashboard");
      setTimeout(() =>{
        window.location.reload(); // Refresh page to update Navbar
      },300);
    } catch (error) {
      toast.error(error.response?.data?.message || error?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center relative" style={{ backgroundImage: "url('/images/education-bg.jpg')" }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Login Box */}
      <div className="relative bg-white bg-opacity-20 backdrop-blur-md p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-white text-center">Welcome Back</h2>
        <p className="text-sm text-gray-200 text-center mb-4">Login to access your dashboard</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-400 bg-gray-100 focus:ring focus:ring-blue-300 rounded-lg text-gray-800"
            autoComplete="current-password"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            className="w-full p-3 border border-gray-400 bg-gray-100 focus:ring focus:ring-blue-300 rounded-lg text-gray-800"
            autoComplete="current-password"
            required
          />

          <button
            type="submit"
            className={`w-full py-3 bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white font-semibold rounded-lg ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="flex justify-between mt-4 text-sm text-gray-200">
          <button onClick={() => navigate("/forgot-password")} className="hover:underline">Forgot Password?</button>
          <button onClick={() => navigate("/register")} className="hover:underline">Create Account</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
