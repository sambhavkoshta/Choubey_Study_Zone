import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaYoutube, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#2c3e50] text-white py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* ✅ Section 1: Logo & About */}
        <div>
          <h2 className="text-2xl font-bold mb-3">Chaubey Study Zone</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Your gateway to success in competitive exams. Join us and excel in your journey.
          </p>
        </div>

        {/* ✅ Section 2: Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="text-gray-300 space-y-2">
            <li><Link to="/" className="hover:text-gray-100 transition">🏠 Home</Link></li>
            <li><Link to="/about" className="hover:text-gray-100 transition">📖 About Us</Link></li>
            <li><Link to="/courses" className="hover:text-gray-100 transition">🎓 Courses</Link></li>
            <li><Link to="/contact" className="hover:text-gray-100 transition">📞 Contact</Link></li>
          </ul>
        </div>

        {/* ✅ Section 3: Contact Details & Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="text-gray-300 space-y-2">
            <li className="flex items-center gap-2"><FaMapMarkerAlt /> Ahinsa Chowk, Jabalpur</li>
            <li className="flex items-center gap-2"><FaPhoneAlt /> +91 98765 43210</li>
            <li className="flex items-center gap-2"><FaEnvelope /> info@chaubeystudyzone.com</li>
          </ul>

          {/* ✅ Social Media Icons */}
          <div className="flex space-x-4 mt-4">
            <a href="https://www.youtube.com/@amitkumarchoubey3646?si=sj7EBWgMx2m1JNld" className="text-gray-300 hover:text-red-500 text-lg"><FaYoutube /></a>
            <a href="https://www.facebook.com/education.choubey/" className="text-gray-300 hover:text-blue-500 text-lg"><FaFacebookF /></a>
            <a href="https://www.instagram.com/explore/locations/169294656877011/choubey-study-zone/" className="text-gray-300 hover:text-pink-500 text-lg"><FaInstagram /></a>
          </div>
        </div>
      </div>

      {/* ✅ Divider */}
      <div className="border-t border-gray-600 mt-8"></div>

      {/* ✅ Copyright Section */}
      <div className="mt-6 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} Chaubey Study Zone. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
