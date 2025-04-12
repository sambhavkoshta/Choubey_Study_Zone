import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaUser, FaPaperPlane } from "react-icons/fa";
import API from "../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [emailError, setEmailError] = useState("");
  const [mapUrl, setMapUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    setLoading(true);
    API.get("/contact/location")
      .then((res) => setMapUrl(res.data.mapUrl))
      .catch(() => toast.error("Failed to load map"))
      .finally(() => setLoading(false));
  }, []);
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
      return false;
    }
    setEmailError("");
    return true;
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "email") {
      validateEmail(e.target.value);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email");
      return;
    }
    setIsSubmitting(true);
    try {
      await API.post("/contact/submit", formData);
      toast.success("Message Sent Successfully! 🚀");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen py-6 md:py-12 bg-[#F5F5F5] px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary mb-2 md:mb-4">Contact Us</h1>
          <p className="text-base md:text-lg text-gray-600">We're here to assist you. Reach out to us anytime!</p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-6 md:p-8 flex flex-col space-y-4 md:space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-xl md:text-2xl font-semibold text-primary flex items-center">
              <FaUser className="mr-2" /> Contact Information
            </h2>
            <div className="flex items-center text-gray-700">
              <FaPhone className="text-primary text-xl md:text-2xl mr-3 md:mr-4 flex-shrink-0" />
              <p className="text-base md:text-lg">+91 9630849817</p>
            </div>
            <div className="flex items-center text-gray-700">
              <FaEnvelope className="text-primary text-xl md:text-2xl mr-3 md:mr-4 flex-shrink-0" />
              <p className="text-base md:text-lg break-all">contact@chaubeystudyzone.com</p>
            </div>
            <div className="flex items-start text-gray-700">
              <FaMapMarkerAlt className="text-primary text-xl md:text-2xl mr-3 md:mr-4 mt-1 flex-shrink-0" />
              <p className="text-base md:text-lg">Ahinsa Chowk, Vijay Nagar, Jabalpur</p>
            </div>
            <div className="mt-4 md:mt-8">
              {loading ? (
                <div className="w-full h-48 md:h-64 bg-gray-200 animate-pulse rounded-lg"></div>
              ) : mapUrl ? (
                <iframe className="w-full h-48 md:h-64 rounded-lg shadow-lg" src={mapUrl} allowFullScreen loading="lazy"></iframe>
              ) : (
                <p className="text-center text-gray-500">Failed to load map</p>
              )}
            </div>
          </motion.div>
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-6 md:p-8"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-xl md:text-2xl font-semibold text-primary flex items-center mb-4 md:mb-6">
              <FaPaperPlane className="mr-2" /> Send us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className={`w-full p-3 rounded-lg border shadow-sm focus:ring-2 transition ${
                    emailError ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-primary/50 focus:border-primary"
                  }`}
                  required
                />
                {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
              </div>
              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                  required
                />
              </div>
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows={4}
                  className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-lg text-base md:text-lg font-medium hover:bg-primary-dark transition duration-300 disabled:opacity-70"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
      <ScrollToTopButton/>
    </div>
  );
};
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };   
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }; 
  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-4 right-4 bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110 hover:bg-blue-700 z-50 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
    >
      <span className="text-lg">↑</span>
    </button>
  );
};
export default Contact;