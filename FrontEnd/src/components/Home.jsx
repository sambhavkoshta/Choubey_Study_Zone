import React from 'react';
import About from './About';
import CoursesPreview from './CoursesPreview';
import GalleryPreview from './GalleryPreview';
import Hero from './Hero';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-white to-gray-100">
      {/* Hero Section - Slider */}
      <Hero />

      {/* Content Section */}
      <div className="container mx-auto px-6 sm:px-12 py-12">
        <div className="flex flex-col gap-16">
          <About />
          <div className="bg-white shadow-md rounded-lg p-6 md:p-10">
            <CoursesPreview />
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 md:p-10">
            <GalleryPreview />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
