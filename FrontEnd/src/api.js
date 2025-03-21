// import axios from "axios";
// import { toast } from "react-toastify";

// const API = axios.create({
//   baseURL: "http://localhost:7000/api",
// });

// // Add an interceptor to handle token expiration
// API.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       toast.error("Session expired. Please login again.");
//       localStorage.removeItem("userToken");
//       setTimeout(() => {
//         window.location.href = "/login"; // Redirect to login page
//       }, 1000);
//     }
//     return Promise.reject(error);
//   }
// );



// // export const getFaculty = () => API.get("/faculty/all");
// // export const addFaculty = (data) => API.post("/faculty/add", data);
// // export const updateFaculty = (id, data) => API.put(`/faculty/${id}`, data);
// // export const deleteFaculty = (id) => API.delete(`/faculty/${id}`);

// // Register User (Send OTP)
// export const sendOTP = async (email) => {
//   return await API.post(`/student/send-otp`, { email });
// };

// // Verify OTP & Register User
// export const registerUser = async (userData) => {
//   return await API.post(`/student/register`, userData);
// };

// // Login User
// export const loginUser = async (credentials) => {
//   return await API.post(`/student/login`, credentials);
// };

// export const sendForgotPasswordOTP = async (email) => {
//   return await API.post(`/student/forgot-password`, { email });
// };

// export const sendResetOTP = async (email) => {
//   return await API.post(`/student/resend-otp`, { email });
// };

// export const verifyOTP = async (email) => {
//   return await API.post(`/student/verify-otp`, { email });
// };

// // 🔹 Reset Password
// export const resetPassword = async ({ email, otp, newPassword }) => {
//   return await API.post(`/student/reset-password`, { email, otp, newPassword });
// };

// // Logout User
// export const logoutUser = () => {
//   localStorage.removeItem("token");
// };

// export const getEnrolledCourses = async (token) => {
//   try {
//     const response = await API.get(`/enrolled-courses`, {
//       headers: { Authorization: token },
//     });
//     return response.data.courses;
//   } catch (error) {
//     throw error.response?.data?.message || "Error fetching courses";
//   }
// };

// export const updateProfile = async (formData, token) => {
//   try {
//     const response = await fetch("http://localhost:7000/api/student/update-profile", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(formData),
//     });

//     return await response.json();
//   } catch (error) {
//     console.error("Error updating profile:", error);
//     return { message: "Server error" };
//   }
// };

// export const getProfile = async (token) => {
//   try {
//     const response = await fetch("http://localhost:7000/api/student/profile", {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     return await response.json();
//   } catch (error) {
//     console.error("Error fetching profile:", error);
//     return null;
//   }
// };

// export const fetchStudentData = async () => {
//   const token = localStorage.getItem("token");
//   const response = await API.get(`/student/profile`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return response.data;
// };

// export default API;\



import axios from "axios";
import { toast } from "react-toastify";

const API = axios.create({
  baseURL: "http://localhost:7000/api",
  withCredentials: true, // अगर cookies इस्तेमाल कर रहे हो
});

// ✅ Auto Logout on Token Expiry
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      toast.error("Session expired. Please log in again.");
      logoutUser(); // 🔹 Global logout function call
    }
    return Promise.reject(error);
  }
);

// ✅ Logout Function (Global)
export const logoutUser = () => {
  localStorage.removeItem("userToken");
  setTimeout(() => {
    window.location.href = "/login"; // 🔹 Redirect to Login
  }, 1000);
};

// ✅ Auth APIs
export const sendOTP = (email) => API.post(`/student/send-otp`, { email });
export const registerUser = (userData) => API.post(`/student/register`, userData);
export const loginUser = (credentials) => API.post(`/student/login`, credentials);
export const sendForgotPasswordOTP = (email) => API.post(`/student/forgot-password`, { email });
export const sendAdminForgotPasswordOTP = (email) => API.post(`/admin/forgot-password`, { email });
export const sendResetOTP = (email) => API.post(`/student/resend-otp`, { email });
export const verifyOTP = (email) => API.post(`/student/verify-otp`, { email });
export const resetPassword = ({ email, otp, newPassword }) =>
  API.post(`/student/reset-password`, { email, otp, newPassword });

export const resetAdminPassword = ({ email, otp, newPassword }) =>
  API.post(`/admin/reset-password`, { email, otp, newPassword });

// ✅ Student Profile APIs
export const getProfile = () => API.get(`/student/profile`);
export const updateProfile = (formData) => API.patch(`/student/update-profile`, formData);

// ✅ Courses APIs
export const getEnrolledCourses = async () => {
  try {
    const response = await API.get(`/enrolled-courses`);
    return response.data.courses;
  } catch (error) {
    throw error.response?.data?.message || "Error fetching courses";
  }
};

// ✅ Fetch Student Data (Used Globally)
export const fetchStudentData = async () => {
  const response = await API.get(`/student/profile`);
  return response.data;
};


export default API;

