import React, { useState } from 'react';

const Feedback = ({ isAuthenticated }) => {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle feedback submission logic here
    console.log('Feedback submitted:', feedback, 'Rating:', rating);
    setSubmitted(true);
  };

  if (!isAuthenticated) {
    return <div className="text-center text-red-500">You must be logged in to provide feedback.</div>;
  }

  return (
    <div className="max-w-lg mx-auto p-6 border border-gray-300 rounded-lg bg-gray-50 shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Feedback</h2>
      {submitted ? (
        <p className="text-green-600">Thank you for your feedback!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Rating:</label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <label key={star} className="cursor-pointer">
                  <input
                    type="radio"
                    name="rating"
                    value={star}
                    onChange={() => setRating(star)}
                    className="hidden"
                  />
                  <span className={`text-2xl ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}>★</span>
                </label>
              ))}
            </div>
          </div>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Enter your feedback here..."
            required
            className="w-full h-32 p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="mt-4 w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default Feedback;
