import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
const AboutUs = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState({
    mission: false,
    specializations: false,
    approach: false,
    location: false,
    journey: false,
    services: false,
    testimonial: false,
    cta: false
  });
  const sectionRefs = {
    mission: useRef(null),
    specializations: useRef(null),
    approach: useRef(null),
    location: useRef(null),
    journey: useRef(null),
    services: useRef(null),
    testimonial: useRef(null),
    cta: useRef(null)
  };
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const sectionId = entry.target.getAttribute('data-section');
        if (entry.isIntersecting) {
          setIsVisible(prev => ({ ...prev, [sectionId]: true }));
        }
      });
    }, observerOptions);
    Object.entries(sectionRefs).forEach(([key, ref]) => {
      if (ref.current) {
        ref.current.setAttribute('data-section', key);
        observer.observe(ref.current);
      }
    });
    setIsVisible(prev => ({ ...prev, mission: true }));
    setTimeout(() => setIsVisible(prev => ({ ...prev, specializations: true })), 300);
    setTimeout(() => setIsVisible(prev => ({ ...prev, approach: true })), 600);
    return () => observer.disconnect();
  }, []);
  const getAnimationClass = (section) => {
    return isVisible[section] 
      ? "opacity-100 translate-y-0 transition-all duration-700" 
      : "opacity-0 translate-y-10 transition-all duration-700";
  };
  const handleRegister = () => {
    navigate('/register');
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-20 left-10 w-20 h-20 bg-white opacity-10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-indigo-300 opacity-10 rounded-full animate-ping"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-blue-300 opacity-10 rounded-full animate-bounce"></div>
        </div>    
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight animate-fadeIn">
            About Choubey Study Zone
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-blue-100 animate-slideUp">
            Premier Coaching Institute for Banking, SSC & Railway Exams in Jabalpur
          </p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div 
          ref={sectionRefs.mission}
          className={`bg-white rounded-xl shadow-xl p-6 md:p-10 mb-12 ${getAnimationClass('mission')}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            <div className="space-y-6">
              <div className="relative transition-all duration-500 hover:scale-102 hover:-rotate-1">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg transform -rotate-1"></div>
                <div className="relative bg-white p-4 sm:p-6 rounded-lg border border-blue-100 z-10">
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 flex items-center">
                    <span className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 rounded-full flex items-center justify-center text-white mr-2 sm:mr-3 flex-shrink-0">1</span>
                    <span>Our Mission</span>
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base">
                    At Choubey Study Zone, we are committed to providing exceptional coaching for Banking, SSC, and Railway examinations. Our mission is to empower students with knowledge, skills, and confidence to excel in competitive exams and secure their dream government jobs.
                  </p>
                </div>
              </div>  
              <div 
                ref={sectionRefs.approach}
                className={`relative transition-all duration-500 hover:scale-102 hover:rotate-1 ${getAnimationClass('approach')}`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg transform rotate-1"></div>
                <div className="relative bg-white p-4 sm:p-6 rounded-lg border border-indigo-100 z-10">
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 flex items-center">
                    <span className="w-6 h-6 sm:w-8 sm:h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white mr-2 sm:mr-3 flex-shrink-0">2</span>
                    <span>Our Approach</span>
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base">
                    We believe in a strategic approach to competitive exam preparation, focusing on concept clarity, practice, and exam strategies. Our methodology has been refined over years of experience to deliver consistent results.
                  </p>
                </div>
              </div>
            </div>
            <div 
              ref={sectionRefs.specializations}
              className={`${getAnimationClass('specializations')}`}
            >
              <div className="bg-gradient-to-tr from-blue-50 to-indigo-50 p-4 sm:p-6 rounded-lg border border-blue-100 h-full transition-all duration-500 hover:shadow-lg">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-5 flex items-center">
                  <span className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 rounded-full flex items-center justify-center text-white mr-2 sm:mr-3 flex-shrink-0">3</span>
                  <span>Our Specializations</span>
                </h2>
                <ul className="space-y-3 sm:space-y-4">
                  {[
                    "Banking Exam Preparation (IBPS, SBI, RBI)",
                    "SSC Exam Coaching (CGL, CHSL, MTS)",
                    "Railway Exam Training (RRB, Group D, NTPC)",
                    "Expert faculty with proven success record"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start transform transition-all duration-300 hover:translate-x-2">
                      <span className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-blue-600 rounded-full flex items-center justify-center text-white mr-2 sm:mr-3 mt-0.5 text-xs sm:text-sm">✓</span>
                      <span className="text-gray-700 text-sm sm:text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div 
          ref={sectionRefs.location}
          className={`grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 ${getAnimationClass('location')}`}
        >
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-blue-100 transform transition-all duration-500 hover:-rotate-1 hover:shadow-xl">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-3 sm:py-4 px-4 sm:px-6 text-white">
              <h2 className="text-lg sm:text-xl font-semibold">Our Location</h2>
            </div>
            <div className="p-4 sm:p-6">
              <p className="text-gray-600 mb-3 flex items-start text-sm sm:text-base">
                <span className="text-blue-500 mr-2 flex-shrink-0">📍</span>
                <span><strong>Address:</strong> Ahinsa Chowk, Vijay Nagar Colony, Jabalpur, Madhya Pradesh 482002</span>
              </p>
              <p className="text-gray-600 mb-3 flex items-start text-sm sm:text-base">
                <span className="text-blue-500 mr-2 flex-shrink-0">🏢</span>
                <span><strong>Landmark:</strong> Near Vijay Nagar Colony</span>
              </p>
              <p className="text-gray-600 flex items-start text-sm sm:text-base">
                <span className="text-blue-500 mr-2 flex-shrink-0">📞</span>
                <span><strong>Contact:</strong> 097539 30006</span>
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-indigo-100 transform transition-all duration-500 hover:rotate-1 hover:shadow-xl">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-700 py-3 sm:py-4 px-4 sm:px-6 text-white">
              <h2 className="text-lg sm:text-xl font-semibold">Working Hours</h2>
            </div>
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-2 gap-2 sm:gap-3 text-gray-600 text-sm sm:text-base">
                {[
                  ["Monday - Friday:", "9:00 AM - 8:00 PM"],
                  ["Saturday:", "9:00 AM - 8:00 PM"],
                  ["Sunday:", "9:00 AM - 6:00 PM"]
                ].map(([day, hours], index) => (
                  <React.Fragment key={index}>
                    <div className="font-medium">{day}</div>
                    <div className="text-right">{hours}</div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div 
          ref={sectionRefs.journey}
          className={`mb-12 ${getAnimationClass('journey')}`}
        >
          <div className="relative transition-all duration-500 hover:scale-102">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl transform -rotate-1"></div>
            <div className="relative bg-white rounded-xl shadow-lg p-5 sm:p-8 border border-blue-100 z-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">Our Journey</h2>
              <p className="text-gray-600 mb-4 text-sm sm:text-base">
                Established in Jabalpur, Choubey Study Zone has emerged as a trusted name for competitive exam preparation. Our institute was founded with the vision to provide quality coaching for government job aspirants at affordable rates.
              </p>
              <p className="text-gray-600 text-sm sm:text-base">
                Over the years, we've helped thousands of students realize their dreams of securing government jobs. Our alumni are now serving in various banks, SSC departments, and railway sectors across India, which stands testament to our teaching quality and dedication.
              </p>
            </div>
          </div>
        </div>
        <div 
          ref={sectionRefs.services}
          className={`mb-12 ${getAnimationClass('services')}`}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">Services We Offer</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Banking Exam Coaching",
                description: "Comprehensive preparation for IBPS PO/Clerk, SBI PO/Clerk, RBI Assistant, and other banking exams with specialized focus on quantitative aptitude, reasoning, English, and banking awareness.",
                gradient: "from-blue-500 to-blue-700",
                icon: "🏦"
              },
              {
                title: "SSC Exam Training",
                description: "Expert coaching for SSC CGL, CHSL, MTS, and other SSC examinations with detailed coverage of all subjects and regular mock tests to track progress.",
                gradient: "from-indigo-500 to-indigo-700",
                icon: "📝"
              },
              {
                title: "Railway Exam Preparation",
                description: "Specialized training for RRB NTPC, Group D, ALP, and other railway recruitment exams with focus on technical and non-technical sections.",
                gradient: "from-purple-500 to-purple-700",
                icon: "🚆"
              }
            ].map((service, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 transform transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
              >
                <div className={`bg-gradient-to-r ${service.gradient} py-3 sm:py-4 px-4 sm:px-6 text-white flex items-center`}>
                  <span className="mr-2 text-xl">{service.icon}</span>
                  <h3 className="text-lg sm:text-xl font-semibold">{service.title}</h3>
                </div>
                <div className="p-4 sm:p-6">
                  <p className="text-gray-600 text-sm sm:text-base">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div 
          ref={sectionRefs.testimonial}
          className={`mb-12 ${getAnimationClass('testimonial')}`}
        >
          <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-xl p-6 sm:p-8 text-white text-center transition-all duration-500 hover:shadow-2xl transform hover:scale-102 relative overflow-hidden">
            <div className="absolute top-2 left-6 text-5xl opacity-20 animate-pulse">❝</div>
            <div className="absolute bottom-2 right-6 text-5xl opacity-20 animate-pulse">❞</div>
            
            <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">❝</div>
            <p className="text-base sm:text-lg mb-4 sm:mb-6 italic mx-auto max-w-2xl">
              "Choubey Study Zone's structured approach and dedicated faculty helped me crack the SBI PO exam. Their mock tests and performance analysis were key to my success."
            </p>
            <p className="font-medium">- Recent Student Success</p>
          </div>
        </div>
        <div 
          ref={sectionRefs.cta}
          className={`mb-12 ${getAnimationClass('cta')}`}
        >
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 text-center border border-blue-100 transition-all duration-500 hover:shadow-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">Start Your Preparation Today</h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Join Choubey Study Zone for expert guidance on your journey to securing a government job
            </p>
            <div className="flex flex-col xs:flex-row justify-center space-y-3 xs:space-y-0 xs:space-x-4">
              <button className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-medium py-3 sm:py-4 px-6 sm:px-8 rounded-lg transition duration-300 transform hover:scale-105 shadow-md hover:shadow-lg text-sm sm:text-base">
                Call: 097539 30006
              </button>
              <button 
                onClick={handleRegister}
                className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-medium py-3 sm:py-4 px-6 sm:px-8 rounded-lg transition duration-300 transform hover:scale-105 shadow-md hover:shadow-lg text-sm sm:text-base"
              >
                Register Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <ScrollToTopButton />
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
const globalStyles = `
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
.animate-fadeIn {
  animation: fadeIn 1s ease-out;
}
.animate-slideUp {
  animation: slideUp 0.8s ease-out 0.2s both;
}
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 0.7; }
  50% { opacity: 0.4; }
}
.animate-ping {
  animation: ping 3s cubic-bezier(0, 0, 0.2, 1) infinite;
}
@keyframes ping {
  75%, 100% { transform: scale(1.5); opacity: 0; }
}
.animate-bounce {
  animation: bounce 2s infinite;
}
@keyframes bounce {
  0%, 100% { transform: translateY(-10%); }
  50% { transform: translateY(0); }
}
.hover\\:scale-102:hover {
  transform: scale(1.02);
}
@media (min-width: 475px) {
  .xs\\:flex-row {
    flex-direction: row;
  }
  .xs\\:space-y-0 {
    margin-top: 0;
  }
  .xs\\:space-x-4 > * + * {
    margin-left: 1rem;
  }
}
`;
export default AboutUs;