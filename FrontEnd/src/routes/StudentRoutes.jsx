import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import StudentLayout from "../pages/layout/StudentLayout";
import StudentDashboard from "../pages/Student/StudentDashboard";
import StudentCourses from "../pages/Student/StudentCourses";
import StudentProfile from "../pages/Student/StudentProfile";
import CourseDetails from "../pages/Student/CourseDetails";
import Feedback from "../pages/Student/Feedback";
import StudyMaterials from "../pages/Student/StudyMaterials";

const StudentRoutes = () => {
  return (
    <Routes>
      {/* ✅ Protected Routes for Students */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard/*" element={<StudentLayout />}>
          <Route index element={<StudentDashboard />} />
          <Route path="courses" element={<StudentCourses />} />
          <Route path="courses/:courseId" element={<CourseDetails />} />
          <Route path="profile" element={<StudentProfile />} />
          <Route path="materials" element={<StudyMaterials />} />
          <Route path="feedback" element={<Feedback />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default StudentRoutes;
