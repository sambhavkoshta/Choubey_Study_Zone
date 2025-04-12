import React, { useState, useEffect } from "react";
import {Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./components/Home";
import About from "./components/About";
import Courses from "./components/Courses";
import Register from "./components/Register";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import StudentRoutes from "./routes/StudentRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import AdminLogin from "./pages/admin/AdminLogin";
import { AuthProvider }  from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <AuthProvider>
        <div className="bg-[#f8f9fa] min-h-screen text-gray-900">
          {loading ? (
            <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white text-2xl font-semibold">
              Loading...
            </div>
          ) : (
            <>
              <Navbar isLoggedIn={isLoggedIn} />
              <ScrollToTop/>
              <main className="container mx-auto px-4 py-6 bg-white shadow-md rounded-lg pt-24">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="/*" element={<StudentRoutes />} />
                  <Route path="/courses" element={<ProtectedRoute />}>
                    <Route index element={<Courses />} />
                  </Route>
                  <Route path="/admin/*" element={<AdminRoutes />} />
                  <Route path="/admin/login" element={<AdminLogin />} />
                </Routes>
              </main>
            </>
          )}
          <ToastContainer />
          <Footer />
        </div>
    </AuthProvider>
  );
}
export default App;
