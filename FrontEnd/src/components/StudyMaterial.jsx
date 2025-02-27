import React, { useState } from 'react';
import { motion } from 'framer-motion';

const StudyMaterial = () => {
  const [activeTab, setActiveTab] = useState('pdf');

  const materials = {
    pdf: [
      {
        title: 'Mathematics Notes - Chapter 1',
        description: 'Complete notes covering algebra fundamentals',
        url: '/path/to/math-ch1.pdf',
        thumbnail: 'https://via.placeholder.com/150?text=Math+Notes'
      },
      {
        title: 'Physics Formula Sheet',
        description: 'Quick reference guide for important formulas',
        url: '/path/to/physics-formulas.pdf', 
        thumbnail: 'https://via.placeholder.com/150?text=Physics'
      }
    ],
    videos: [
      {
        title: 'Calculus Basics',
        description: 'Introduction to differential calculus',
        url: 'https://youtube.com/embed/example1',
        thumbnail: 'https://via.placeholder.com/150?text=Calculus'
      },
      {
        title: 'Chemical Bonding',
        description: 'Understanding molecular structures',
        url: 'https://youtube.com/embed/example2',
        thumbnail: 'https://via.placeholder.com/150?text=Chemistry'
      }
    ]
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Study Materials
          </h1>
          <p className="text-lg text-gray-600">
            Access our comprehensive collection of study resources
          </p>
        </motion.div>

        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              onClick={() => setActiveTab('pdf')}
              className={`px-6 py-2 text-sm font-medium rounded-l-lg ${
                activeTab === 'pdf'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              PDF Materials
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`px-6 py-2 text-sm font-medium rounded-r-lg ${
                activeTab === 'videos'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Video Lectures
            </button>
          </div>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          {materials[activeTab].map((item, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
                >
                  {activeTab === 'pdf' ? 'Download PDF' : 'Watch Video'}
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default StudyMaterial;
