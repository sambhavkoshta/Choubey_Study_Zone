// src/pages/admin/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import API from "../../api";


const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCourses: 0,
    totalEnrollments: 0,
    totalRevenue: 0,
    recentEnrollments: [],
  });
  const [loading, setLoading] = useState(true);
  const adminToken = localStorage.getItem("adminToken");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Get total students
        const studentsRes = await API.get("/admin/students", {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
        // Get total courses
        const coursesRes = await API.get("/courses");
        // Get enrollments (you'll need to implement this endpoint)
        const enrollmentsRes = await API.get("/enrollments", {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
        // Get payments (you'll need to implement this endpoint)
        const paymentsRes = await API.get("/payments");

        setStats({
          totalStudents: studentsRes.data.length || 0,
          totalCourses: coursesRes.data.length || 0,
          totalEnrollments: enrollmentsRes?.data?.length || 0,
          totalRevenue : paymentsRes.data?.payments?.reduce(
            (sum, payment) => sum + payment.amount, 0
        ) || 0,
          recentEnrollments: enrollmentsRes.data.slice(0, 5).map((enrollment) => ({
          student: `${enrollment.userId.firstname} ${enrollment.userId.lastname}`,
          courseName: enrollment.courseId.title,
          enrollmentDate: enrollment.enrolledAt,
          status: enrollment.paymentId.status, 
        })),
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);


  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {loading ? (
        <div className="text-center py-10">Loading...</div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
              <p className="text-gray-500">Total Students</p>
              <p className="text-2xl font-bold">{stats.totalStudents}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
              <p className="text-gray-500">Total Courses</p>
              <p className="text-2xl font-bold">{stats.totalCourses}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-500">
              <p className="text-gray-500">Total Enrollments</p>
              <p className="text-2xl font-bold">{stats.totalEnrollments}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4 border-l-4 border-purple-500">
              <p className="text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold">₹{stats.totalRevenue.toLocaleString()}</p>
            </div>
          </div>


          {/* Recent Enrollments */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-4">Recent Enrollments</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Course
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {stats.recentEnrollments.length > 0 ? (
                    stats.recentEnrollments.map((enrollment, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">{enrollment.student}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{enrollment.courseName}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {new Date(enrollment.enrollmentDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded text-xs ${
                            enrollment.status === "active" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {enrollment.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-4 text-center">No recent enrollments</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;