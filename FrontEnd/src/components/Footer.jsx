import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaYoutube, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaChevronRight } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#1e293b] to-[#0f172a] text-white py-16 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" 
             style={{backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "20px 20px"}}></div>
      </div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8 mb-12">
          <div className="transform transition duration-500 hover:translate-y-[-5px]">
            <h2 className="text-2xl font-bold mb-4 inline-block relative after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-12 after:h-1 after:bg-gradient-to-r after:from-blue-500 after:to-purple-600">
              Chaubey Study Zone
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed mt-5">
              Your gateway to success in competitive exams. Join us and excel in your journey.
            </p>
            <div className="mt-6 bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-sm shadow-lg border border-white border-opacity-10">
              <p className="text-gray-200 text-xs">
                "Education is the passport to the future, for tomorrow belongs to those who prepare for it today."
              </p>
            </div>
          </div>
          <div className="transform transition duration-500 hover:translate-y-[-5px]">
            <h3 className="text-lg font-semibold mb-6 inline-block relative after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-8 after:h-1 after:bg-gradient-to-r after:from-blue-500 after:to-purple-600">
              Quick Links
            </h3>
            <ul className="text-gray-300 space-y-3">
              <li>
                <Link to="/" className="group flex items-center hover:text-blue-400 transition-all duration-300">
                  <FaChevronRight className="mr-2 text-xs text-blue-400 group-hover:translate-x-1 transition-transform duration-300" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="group flex items-center hover:text-blue-400 transition-all duration-300">
                  <FaChevronRight className="mr-2 text-xs text-blue-400 group-hover:translate-x-1 transition-transform duration-300" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link to="/courses" className="group flex items-center hover:text-blue-400 transition-all duration-300">
                  <FaChevronRight className="mr-2 text-xs text-blue-400 group-hover:translate-x-1 transition-transform duration-300" />
                  <span>Courses</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="group flex items-center hover:text-blue-400 transition-all duration-300">
                  <FaChevronRight className="mr-2 text-xs text-blue-400 group-hover:translate-x-1 transition-transform duration-300" />
                  <span>Contact</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="transform transition duration-500 hover:translate-y-[-5px]">
            <h3 className="text-lg font-semibold mb-6 inline-block relative after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-8 after:h-1 after:bg-gradient-to-r after:from-blue-500 after:to-purple-600">
              Contact Us
            </h3>
            <ul className="text-gray-300 space-y-4">
              <li className="flex items-start gap-3 group">
                <div className="mt-1 bg-white bg-opacity-10 p-2 rounded text-blue-400 group-hover:bg-blue-400 group-hover:text-white transition-all duration-300">
                  <FaMapMarkerAlt className="text-sm" />
                </div>
                <span>Ahinsa Chowk, Jabalpur, Madhya Pradesh, India - 482002</span>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="mt-1 bg-white bg-opacity-10 p-2 rounded text-blue-400 group-hover:bg-blue-400 group-hover:text-white transition-all duration-300">
                  <FaPhoneAlt className="text-sm" />
                </div>
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="mt-1 bg-white bg-opacity-10 p-2 rounded text-blue-400 group-hover:bg-blue-400 group-hover:text-white transition-all duration-300">
                  <FaEnvelope className="text-sm" />
                </div>
                <span>info@chaubeystudyzone.com</span>
              </li>
            </ul>
          </div>
          <div className="transform transition duration-500 hover:translate-y-[-5px]">
            <h3 className="text-lg font-semibold mb-6 inline-block relative after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-8 after:h-1 after:bg-gradient-to-r after:from-blue-500 after:to-purple-600">
              Follow Us
            </h3>           
            <div className="mt-4 flex flex-col gap-4">
              <p className="text-gray-300 text-sm">Stay connected with us on social media for updates, resources, and success stories.</p>             
              <div className="flex gap-3 mt-2">
                <a 
                  href="https://www.youtube.com/@amitkumarchoubey3646?si=sj7EBWgMx2m1JNld" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-white bg-opacity-10 hover:bg-red-600 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 border border-white border-opacity-10 hover:border-transparent"
                  aria-label="YouTube"
                >
                  <FaYoutube className="text-lg" />
                </a>
                <a 
                  href="https://www.facebook.com/education.choubey/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-white bg-opacity-10 hover:bg-blue-600 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 border border-white border-opacity-10 hover:border-transparent"
                  aria-label="Facebook"
                >
                  <FaFacebookF className="text-lg" />
                </a>
                <a 
                  href="https://www.instagram.com/explore/locations/169294656877011/choubey-study-zone/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-white bg-opacity-10 hover:bg-pink-600 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 border border-white border-opacity-10 hover:border-transparent"
                  aria-label="Instagram"
                >
                  <FaInstagram className="text-lg" />
                </a>
              </div>         
            </div>
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent my-8"></div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} <span className="text-white">Chaubey Study Zone</span>. All rights reserved.
          </div>          
          <div className="flex gap-6 text-gray-400 text-sm">
            <Link to="/privacy" className="hover:text-white transition-colors duration-300">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors duration-300">Terms of Service</Link>
            <Link to="/sitemap" className="hover:text-white transition-colors duration-300">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;