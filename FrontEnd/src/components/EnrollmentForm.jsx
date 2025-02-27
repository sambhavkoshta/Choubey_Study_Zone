import React from 'react';

const EnrollmentForm = ({ course, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Enroll in {course.title}</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Full Name</label>
            <input type="text" className="w-full px-3 py-2 border rounded-lg" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input type="email" className="w-full px-3 py-2 border rounded-lg" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone Number</label>
            <input type="tel" className="w-full px-3 py-2 border rounded-lg" required />
          </div>
          <button type="submit" className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
            Submit Enrollment
          </button>
        </form>
        <button onClick={onClose} className="mt-4 text-red-500">Close</button>
      </div>
    </div>
  );
};

export default EnrollmentForm;
