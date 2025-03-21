// import { useEffect, useState } from "react";
// import { getAdminStats } from "../../api";
// import { Users, BookOpen, Image, FileText, MessageSquare, Phone, UserCheck } from "lucide-react";
// import { motion } from "framer-motion";

// const AdminDashboard = () => {
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const response = await getAdminStats();
//         setStats(response.data);
//       } catch (error) {
//         console.error("Error fetching stats:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, []);

//   if (loading) {
//     return <div className="p-6 text-center text-xl">Loading Dashboard...</div>;
//   }

//   const statsData = [
//     { name: "Total Students", count: stats.totalStudents, icon: <Users size={28} />, color: "bg-blue-600" },
//     { name: "Total Courses", count: stats.totalCourses, icon: <BookOpen size={28} />, color: "bg-green-600" },
//     { name: "Gallery Images", count: stats.galleryImages, icon: <Image size={28} />, color: "bg-yellow-500" },
//     { name: "Study Materials", count: stats.studyMaterials, icon: <FileText size={28} />, color: "bg-purple-600" },
//     { name: "Feedback Received", count: stats.feedbackReceived, icon: <MessageSquare size={28} />, color: "bg-red-500" },
//     { name: "Contact Queries", count: stats.contactQueries, icon: <Phone size={28} />, color: "bg-orange-500" },
//     { name: "Total Faculty", count: stats.totalFaculty, icon: <UserCheck size={28} />, color: "bg-indigo-500" },
//   ];

//   return (
//     <div className="p-6 min-h-screen bg-gray-100">
//       {/* Header */}
//       <motion.h1
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="text-3xl font-bold text-gray-800 mb-6"
//       >
//         Welcome to Admin Dashboard
//       </motion.h1>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {statsData.map((item, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, scale: 0.85 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.5, delay: index * 0.1 }}
//             whileHover={{ scale: 1.05 }}
//             className={`p-6 rounded-lg shadow-lg text-white flex items-center gap-4 transition-all duration-300 ${item.color}`}
//           >
//             <div className="p-4 bg-white bg-opacity-25 rounded-full flex items-center justify-center">
//               {item.icon}
//             </div>
//             <div>
//               <h2 className="text-2xl font-semibold">{item.count}</h2>
//               <p className="text-md">{item.name}</p>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;


const AdminDashboard = () => {
  return (
    <h1>AdminDashboard</h1>
  )
}
export default AdminDashboard;