import React from 'react';
import About from './About';
import CoursesPreview from './CoursesPreview';
import GalleryPreview from './GalleryPreview';
import Hero from './Hero';
const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-white to-gray-100 ">
      <Hero />
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-10 md:py-12">
        <div className="flex flex-col gap-8 sm:gap-10 md:gap-12 lg:gap-16">
          <About />
          <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 md:p-8 lg:p-10 transition-all duration-300 hover:shadow-lg">
            <CoursesPreview />
          </div>
          <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 md:p-8 lg:p-10 transition-all duration-300 hover:shadow-lg">
            <GalleryPreview />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;