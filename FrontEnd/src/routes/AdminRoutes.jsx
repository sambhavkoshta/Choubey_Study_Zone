// import { Routes, Route, Navigate } from "react-router-dom";
// import AdminLayout from "../pages/layout/AdminLayout";
// import AdminDashboard from "../pages/admin/AdminDashboard";
// import ManageStudents from "../pages/admin/ManageStudents";
// import ManageCourses from "../pages/admin/ManageCourses";
// import ManageGallery from "../pages/admin/ManageGallery";
// // import ManageStudyMaterial from "../pages/admin/ManageStudyMaterial";

// const AdminRoutes = () => {
//   const isAuthenticated = localStorage.getItem("adminToken");

//   return isAuthenticated ? (
//     <Routes>
//       <Route element={<AdminLayout />}>
//         <Route path="/" element={<AdminDashboard />} />
//         <Route path="/students" element={<ManageStudents />} />
//         <Route path="/courses" element={<ManageCourses />} />
//         <Route path="/gallery" element={<ManageGallery />} />
//         {/* <Route path="/study-material" element={<ManageStudyMaterial />} /> */}
//       </Route>
//       <Route path="*" element={<Navigate to="/admin" />} />
//     </Routes>
//   ) : (
//     <Navigate to="/admin/login" />
//   );
// };

// export default AdminRoutes;

// frontend/src/routes/AdminRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminLayout from "../pages/layout/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import StudentManagement from "../pages/admin/StudentManagement";
import ManageCourses from "../pages/admin/ManageCourses";
import ManageGallery from "../pages/admin/ManageGallery";
import ManageStudyMaterial from "../pages/admin/ManageStudyMaterial";
import ManageFaculty from "../pages/admin/ManageFaculty";
import FeedbackList from "../pages/admin/AdminFeedback";
import ContactManagement from "../pages/admin/contactManagement";

const AdminRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("adminToken"));

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    setIsAuthenticated(!!token);
  }, []);

  return isAuthenticated ? (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/students" element={<StudentManagement />} />
        <Route path="/courses" element={<ManageCourses />} />
        <Route path="/gallery" element={<ManageGallery />} />
        <Route path="/faculty" element={<ManageFaculty />} />
        <Route path="/materials" element={<ManageStudyMaterial />} />
        <Route path="/feedback" element={<FeedbackList />} />
        <Route path="/contact" element={<ContactManagement/>}/>
      </Route>
      <Route path="*" element={<Navigate to="/admin" />} />
    </Routes>
  ) : (
    <Navigate to="/admin/login" />
  );
};

export default AdminRoutes;
