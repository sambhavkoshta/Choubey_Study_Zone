import axios from "axios";
import { toast } from "react-toastify";

const API = axios.create({
  baseURL: "http://localhost:7000/api",
  withCredentials: true, 
});

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

export const logoutUser = () => {
  localStorage.removeItem("userToken");
  setTimeout(() => {
    window.location.href = "/login"; 
  }, 1000);
};

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

export const getProfile = () => API.get(`/student/profile`);
export const updateProfile = (formData) => API.patch(`/student/update-profile`, formData);

export const getEnrolledCourses = async () => {
  try {
    const response = await API.get(`/enrolled-courses`);
    return response.data.courses;
  } catch (error) {
    throw error.response?.data?.message || "Error fetching courses";
  }
};

export const fetchStudentData = async () => {
  const response = await API.get(`/student/profile`);
  return response.data;
};

export const uploadStudyMaterial = async (formData, token) => {
  return API.post(`/study-material/upload`, formData, {
    headers: { Authorization: token, "Content-Type": "multipart/form-data" },
  });
};

export const getAllStudyMaterials = async () => {
  return API.get(`/study-material`);
};

export const deleteStudyMaterial = async (id, token) => {
  return API.delete(`/study-material/${id}`, {
    headers: { Authorization: token },
  });
};

export default API;

