// src/routes/StudentRoutes.jsx
import { Route, Routes } from "react-router-dom";
import StudentLayout from "../pages/layout/StudentLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import StudentDashboard from "../pages/Student/StudentDashboard";
import StudentCourses from "../pages/Student/StudentCourses";
import StudentProfile from "../pages/Student/StudentProfile";
import Feedback from "../pages/Student/Feedback";

const StudentRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<StudentLayout />}>
          <Route index element={<StudentDashboard />} />
          <Route path="courses" element={<StudentCourses />} />
          <Route path="profile" element={<StudentProfile />} />
          <Route path="feedback" element={<Feedback />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default StudentRoutes;
