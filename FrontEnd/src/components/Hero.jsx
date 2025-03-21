import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'Welcome to Choubey Study Zone',
      subtitle: 'Your Gateway to Academic Excellence'
    },
    {
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
      title: 'Expert Faculty',
      subtitle: 'Learn from the Best in the Field'
    },
    {
      image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'Proven Results',
      subtitle: 'Transforming Dreams into Reality'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => 
        prevSlide === slides.length - 1 ? 0 : prevSlide + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  // Function to navigate to previous slide
  const prevSlide = () => {
    setCurrentSlide((prevSlide) => 
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  // Function to navigate to next slide
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => 
      prevSlide === slides.length - 1 ? 0 : prevSlide + 1
    );
  };

  return (
    <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
          aria-hidden={currentSlide !== index}
        >
          <div className="relative w-full h-full">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 z-10" />
            
            {/* Background Image with better loading strategy */}
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center"
              loading={index === 0 ? "eager" : "lazy"}
            />
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-white text-center px-4 sm:px-6 md:px-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 sm:mb-3 md:mb-4 tracking-tight">
                {slide.title}
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-2xl mx-auto opacity-90">
                {slide.subtitle}
              </p>
              <button
                className="mt-4 sm:mt-6 md:mt-8 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 bg-blue-600 text-white text-sm sm:text-base md:text-lg font-medium rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                onClick={() => navigate('/courses')}
              >
                Explore Courses
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows - Hidden on mobile, visible on larger screens */}
      <button 
        onClick={prevSlide}
        className="hidden sm:flex absolute left-4 top-1/2 transform -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 bg-black/30 hover:bg-black/50 rounded-full items-center justify-center text-white transition-all duration-300"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button 
        onClick={nextSlide}
        className="hidden sm:flex absolute right-4 top-1/2 transform -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 bg-black/30 hover:bg-black/50 rounded-full items-center justify-center text-white transition-all duration-300"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 sm:bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 focus:outline-none ${
              currentSlide === index 
                ? 'bg-white scale-110 sm:scale-125' 
                : 'bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={currentSlide === index ? "true" : "false"}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;