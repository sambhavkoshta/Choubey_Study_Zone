import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import API from '../api';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [emailError, setEmailError] = useState("");

  const validateEmail = (email) => {
    // Basic Email Regex Validation
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
      [e.target.name]: e.target.value
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

    try {
      const response = await API.post("/contact", formData);
      console.log(response.data);
       toast.success("Message Sent Successfully! 🚀");
      setFormData({ name: '', email: '', phone: '', message: '' })
    } catch (error) {
      console.error("Error submitting form", error);
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-500">Get in touch with us for any queries or support</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Contact Information</h2>
            <div className="space-y-6">
              <div className="flex items-center">
                <FaPhone className="text-indigo-600 text-xl mr-4" />
                <div>
                  <h3 className="font-medium text-gray-700">Phone</h3>
                  <p className="text-gray-600">+91 9630849817</p>
                </div>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="text-indigo-600 text-xl mr-4" />
                <div>
                  <h3 className="font-medium text-gray-700">Email</h3>
                  <p className="text-gray-600">contact@chaubeystudyzone.com</p>
                </div>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-indigo-600 text-xl mr-4" />
                <div>
                  <h3 className="font-medium text-gray-700">Address</h3>
                  <p className="text-gray-600">Choubey Study Zone, Ahinsa Chowk, Vijay Nagar, Jabalpur, Madhya Pradesh 482002</p>
                </div>
              </div>
            </div>
          </div>

          <motion.div 
            className="bg-white rounded-lg shadow-lg p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" required />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" required />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" required />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" required />
              </div>
              <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-300">Send Message</button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
