// import React, { useState, useEffect } from "react";
// import API from "../../api";
// import { toast } from "react-toastify";

// const StudyMaterialManager = () => {
//   const [materials, setMaterials] = useState([]);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [title, setTitle] = useState("");
//   const [courseId, setCourseId] = useState("");
//   const [courses, setCourses] = useState([]);
//   const [isUploading, setIsUploading] = useState(false);

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   const fetchCourses = async () => {
//     try {
//       const { data } = await API.get("/courses");
//       console.log("Courses Loaded:", data); // Debugging
//       if (Array.isArray(data)) {
//         setCourses(data);
//       } else if (data.courses && Array.isArray(data.courses)) {
//         setCourses(data.courses);
//       } else {
//         throw new Error("Invalid courses response");
//       }
//     } catch (error) {
//       toast.error("Failed to load courses!");
//       console.error("Courses Fetch Error:", error);
//     }
//   };

//   const fetchMaterials = async () => {
//     if (!courseId) return;
//     try {
//       const { data } = await API.get(`/study-material/${courseId}`);
//       setMaterials(data);
//       console.log("Study Materials:", data);
//     } catch (error) {
//       toast.error("Failed to load study materials!");
//     }
//   };

//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!selectedFile || !title || !courseId) {
//       toast.error("All fields are required!");
//       return;
//     }

//     setIsUploading(true);
//     const formData = new FormData();
//     formData.append("file", selectedFile);
//     formData.append("title", title);
//     formData.append("courseId", courseId);

//     try {
//       await API.post("/study-material/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       toast.success("Study material uploaded successfully!");
//       setSelectedFile(null);
//       setTitle("");
//       fetchMaterials();
//     } catch (error) {
//       toast.error("Upload failed!");
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await API.delete(`/study-material/${id}`);
//       toast.success("Deleted successfully!");
//       fetchMaterials();
//     } catch (error) {
//       toast.error("Failed to delete!");
//     }
//   };

//   return (
//     <div className="p-6 bg-white shadow-lg rounded-lg">
//       <h2 className="text-2xl font-bold mb-4">Study Material Management</h2>

//       {/* Select Course Dropdown */}
//       <div className="mb-4">
//         <label className="block text-lg font-semibold mb-2">Select Course:</label>
//         <select
//           className="w-full p-3 border rounded bg-white text-black cursor-pointer"
//           value={courseId}
//           onChange={(e) => setCourseId(e.target.value)}
//         >
//           <option value="" className="text-gray-500">-- Select Course --</option>
//           {courses.length > 0 ? (
//             courses.map((course) => (
//               <option key={course._id} value={course._id} className="text-black">
//                 {course.name}
//               </option>
//             ))
//           ) : (
//             <option disabled className="text-red-500">No Courses Available</option>
//           )}
//         </select>
//         <button
//           onClick={fetchMaterials}
//           disabled={!courseId}
//           className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Load Materials
//         </button>
//       </div>

//       {/* Upload Section */}
//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="w-full p-2 border rounded mb-2"
//         />
//         <input
//           type="file"
//           accept=".pdf,.docx,.ppt"
//           onChange={handleFileChange}
//           className="w-full p-2 border rounded mb-2"
//         />
//         <button
//           onClick={handleUpload}
//           disabled={isUploading}
//           className="bg-green-500 text-white px-4 py-2 rounded"
//         >
//           {isUploading ? "Uploading..." : "Upload"}
//         </button>
//       </div>

//       {/* Study Materials List */}
//       <div className="border-t pt-4">
//         <h3 className="text-lg font-semibold mb-2">Uploaded Study Materials:</h3>
//         {materials.length === 0 ? (
//           <p>No study materials available.</p>
//         ) : (
//           materials.map((material) => (
//             <div key={material._id} className="p-2 border rounded mb-2 flex justify-between">
//               <p className="font-medium">{material.title}</p>
//               <div>
//                 <a
//                   href={material.fileUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-600 underline mr-2"
//                 >
//                   Download
//                 </a>
//                 <button
//                   onClick={() => handleDelete(material._id)}
//                   className="bg-red-500 text-white px-3 py-1 rounded"
//                 >
//                   Delete
//                 </button>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default StudyMaterialManager;
