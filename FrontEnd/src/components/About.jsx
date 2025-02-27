// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { FaStar } from "react-icons/fa";
// import API from "../api";

// const SectionHeader = ({ title }) => (
//   <h2 className="text-3xl font-semibold text-[#1a237e] mb-4 text-center">{title}</h2>
// );

// const AboutUs = () => {
//   const [faculties, setFaculties] = useState([]);
//   const [students, setStudents] = useState([]);
//   const [testimonials, setTestimonials] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [facultyRes, studentRes, testimonialRes] = await Promise.all([
//           API.get("/faculty"),
//           API.get("/students"),
//           API.get("/testimonials"),
//         ]);
//         setFaculties(facultyRes.data.faculties);
//         setStudents(studentRes.data.students);
//         setTestimonials(testimonialRes.data.testimonials);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   const sliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//   };

//   return (
//     <div className="bg-gradient-to-b from-[#e3f2fd] to-[#bbdefb] py-12 px-6">
//       <motion.div
//         className="text-center mb-12"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <h1 className="text-4xl font-bold text-[#0d47a1]">About Chaubey Study Zone</h1>
//         <p className="text-lg text-[#37474f] max-w-3xl mx-auto mt-3">
//           Empowering students with quality education and expert guidance to achieve their career goals.
//         </p>
//       </motion.div>

//       {/* Faculty Section */}
//       <div className="max-w-6xl mx-auto text-center mb-12">
//         <SectionHeader title="Meet Our Faculty" />
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//           {faculties.map((faculty) => (
//             <motion.div key={faculty._id} className="p-6 bg-white shadow-xl rounded-xl border border-gray-200"
//               whileHover={{ scale: 1.05 }}
//             >
//               <img src={faculty.image} alt={faculty.name} className="w-32 h-32 mx-auto rounded-full mb-3 border-4 border-[#0d47a1]" />
//               <h3 className="text-xl font-semibold text-[#0d47a1]">{faculty.name}</h3>
//               <p className="text-gray-700">{faculty.subject} ({faculty.experience})</p>
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       {/* Student Success Stories */}
//       <div className="max-w-5xl mx-auto text-center mb-12">
//         <SectionHeader title="Student Success Stories" />
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//           {students.map((student, index) => (
//             <motion.div key={index} className="p-6 bg-white shadow-lg rounded-xl border border-gray-200"
//               whileHover={{ scale: 1.05 }}
//             >
//               <img src={student.image} alt={student.name} className="w-32 h-32 mx-auto rounded-full mb-3 border-4 border-[#1565c0]" />
//               <h3 className="text-xl font-semibold text-[#1565c0]">{student.name}</h3>
//               <p className="text-gray-700">{student.exam}</p>
//               <p className="text-gray-500 italic">"{student.quote}"</p>
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       {/* Testimonials */}
//       <div className="max-w-6xl mx-auto text-center mb-12">
//         <SectionHeader title="What Our Students Say" />
//         <Slider {...sliderSettings}>
//           {testimonials.map((testimonial, index) => (
//             <div key={index} className="p-6 bg-white shadow-xl rounded-xl text-center border border-gray-200">
//               <img src={testimonial.image} alt={testimonial.name} className="w-20 h-20 mx-auto rounded-full mb-3 border-4 border-[#ffb300]" />
//               <h3 className="text-lg font-semibold text-[#ff6f00]">{testimonial.name}</h3>
//               <p className="text-gray-700 italic">"{testimonial.feedback}"</p>
//               <div className="flex justify-center mt-2">
//                 {[...Array(testimonial.rating)].map((_, i) => (
//                   <FaStar key={i} className="text-yellow-500" />
//                 ))}
//               </div>
//             </div>
//           ))}
//         </Slider>
//       </div>
//     </div>
//   );
// };

// export default AboutUs;

const AboutUs = () => {
  return (
    <div>
      About Us Component
    </div>
  );
}

export default AboutUs;
