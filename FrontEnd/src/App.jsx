// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Header from "./components/Header";
// import Navbar from "./components/Navbar";
// import Home from "./components/Home";
// import About from "./components/About";
// import Courses from "./components/Courses";
// // import StudyMaterial from "./components/StudyMaterial";
// import Register from "./components/Register";
// import Gallery from "./components/Gallery";
// import Contact from "./components/Contact";

// import Login from "./components/Login";
// import ProtectedRoute from "./components/ProtectedRoute";
// import StudentDashboard from "../src/pages/Student/StudentDashboard";
// import Footer from "./components/Footer";
// import ForgotPassword from "./components/ForgotPassword";
// import ResetPassword from "./components/ResetPassword";
// import Profile from "../src/pages/Student/Profile";
// import Courses from "../src/pages/Student/Courses";
// import StudyMaterials from "../src/pages/Student/StudyMaterials";
// import Feedback from "../src/pages/Student/Feedback";";
// import ProtectedRoute from "./components/ProtectedRoute";



// import AdminRoutes from "./routes/AdminRoutes";
// import AdminLogin from "../src/pages/admin/AdminLogin";
// import { AdminAuthProvider } from "./context/AdminAuthContext";
// import { AuthProvider } from "./context/AuthContext";

// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function App() {
//   const [loading, setLoading] = useState(true);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     const token = localStorage.getItem("userToken");
//     if (token) {
//       setIsLoggedIn(true);
//     }
//   }, []);

//   return (
//     <AdminAuthProvider>
//       <AuthProvider>
//       <div className="bg-[#f8f9fa] min-h-screen text-gray-900">
//         {loading ? (
//           <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white text-2xl font-semibold">
//             Loading...
//           </div>
//         ) : (
//           <>
//             <Header />
//             <Navbar isLoggedIn={isLoggedIn} />
//             <main className="container mx-auto px-4 py-6 bg-white shadow-md rounded-lg">
//               <Routes>
//                 <Route path="/" element={<Home />} />
//                 <Route path="/about" element={<About />} />
//                 <Route path="/register" element={<Register />} />
//                 <Route path="/gallery" element={<Gallery />} />
//                 <Route path="/contact" element={<Contact />} />
//                 <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
//                 <Route path="/forgot-password" element={<ForgotPassword />} />
//                 <Route path="/reset-password" element={<ResetPassword />} />
//                 <Route path="/dashboard" element={<ProtectedRoute />}>
//                   <RouteRoute element={<StudentDashboard />}>
//                     <Route index element={<Profile />} />
//                     <Route path="profile" element={<Profile />} />
//                     <Route path="courses" element={<Courses />} />
//                     <Route path="materials" element={<StudyMaterials />} />
//                     <Route path="feedback" element={<Feedback />} />
//                 </RouteRoute>

//                 {/* Protected Routes */}
//                 <Route element={<ProtectedRoute />}>
//                   <Route path="/study-material" element={<StudyMaterial />} />
//                   <Route path="/courses" element={<Courses />} />
//                 </Route>

//                 <Route path="/admin/*" element={<AdminRoutes />} />
//                 <Route path="/admin/login" element={<AdminLogin />} />
//               </Routes>
//             </main>
//           </>
//         )}
//         <ToastContainer />
//         <Footer/>
//       </div>
//       </AuthProvider>
//     </AdminAuthProvider>
//   );
// }

// export default App;


import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

// 📌 Admin Dashboard Imports
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
      {/* <AuthProvider> */}
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
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  
                  <Route path="/*" element={<StudentRoutes />} />
                  {/* 🔒 Protected Course & Study Material Access */}
                  <Route path="/courses" element={<ProtectedRoute />}>
                    <Route index element={<Courses />} />
                  </Route>

                  {/* Admin Routes */}
                  <Route path="/admin/*" element={<AdminRoutes />} />
                  <Route path="/admin/login" element={<AdminLogin />} />
                </Routes>
              </main>
            </>
          )}
          <ToastContainer />
          <Footer />
        </div>
      {/* </AuthProvider> */}
    </AuthProvider>
  );
}

export default App;
