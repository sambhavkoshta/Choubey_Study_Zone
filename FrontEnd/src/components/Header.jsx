import React, { useState, useEffect } from 'react';
import { FaFacebook, FaInstagram, FaYoutube, FaPhone, FaEnvelope } from 'react-icons/fa';

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setIsVisible(prevScrollPos > currentScrollPos || currentScrollPos === 0);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
    <div 
      className={`bg-gray-800 text-white py-2 w-full z-50 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${window.innerWidth <= 768 ? 'hidden' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          {/* Contact Information */}
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center">
              <FaPhone className="h-4 w-4 mr-2" />
              <span className="text-sm">+91 9630849817</span>
            </div>
            <div className="flex items-center">
              <FaEnvelope className="h-4 w-4 mr-2" />
              <span className="text-sm hidden sm:inline">contact@chaubeystudyzone.com</span>
              <span className="text-sm sm:hidden">contact@csz.com</span>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="flex items-center space-x-4">
            <span className="text-sm mr-2 hidden sm:inline">Follow us:</span>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors duration-200"
              >
                <FaFacebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-400 transition-colors duration-200"
              >
                <FaInstagram className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com/@amitkumarchoubey3646?si=sj7EBWgMx2m1JNld"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red-500 transition-colors duration-200"
              >
                <FaYoutube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
