import { useState } from "react";
import { FaStar, FaComments, FaPaperPlane, FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify"; // Added import for toast

const ratingLabels = ["Very Bad", "Poor", "Average", "Good", "Excellent"];

const Feedback = () => {
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a rating before submitting! ⭐");
      return;
    }

    setLoading(true);
    const token = localStorage.getItem("userToken");

    try {
      const response = await fetch("http://localhost:7000/api/feedbacks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message, rating }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setSubmitted(true);
      toast.success("Feedback submitted successfully!");

      // Reset form after 2 seconds
      setTimeout(() => {
        setMessage("");
        setRating(0);
        setHoverRating(0);
        setSubmitted(false);
      }, 2000);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8 bg-white shadow-xl rounded-2xl border border-gray-200 mt-6 md:mt-10 transition-all duration-300">
      {submitted ? (
        <div className="flex flex-col items-center justify-center text-center p-8 space-y-4">
          <div className="relative">
            <div className="absolute -inset-1 bg-green-200 rounded-full opacity-50 blur-md animate-pulse"></div>
            <FaCheckCircle size={60} className="relative text-green-600 animate-bounce" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Thank You for Your Feedback!</h2>
          <p className="text-gray-600">Your input helps us improve our services!</p>
        </div>
      ) : (
        <>
          <div className="mb-8">
            <div className="flex items-center justify-center">
              <span className="relative inline-block">
                <FaComments className="text-blue-500 text-3xl md:text-4xl" />
                <span className="absolute top-0 right-0 h-3 w-3 bg-blue-500 rounded-full animate-ping"></span>
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mt-2">
              Submit Feedback
            </h2>
            <p className="text-gray-500 text-center mt-2">We value your opinion!</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Feedback Message */}
            <div className="group relative border border-gray-200 p-4 rounded-xl transition-all duration-300 hover:border-blue-300 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-200">
              <label className="flex items-center gap-2 font-medium text-gray-700 mb-2">
                <FaComments className="text-blue-500" /> 
                <span>Your Feedback</span>
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share your thoughts with us..."
                className="w-full outline-none resize-none rounded-lg p-3 text-gray-700 placeholder-gray-400 bg-gray-50 focus:bg-white transition-all"
                rows="4"
              ></textarea>
              <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                {message.length} / 500
              </div>
            </div>

            {/* Star Rating System */}
            <div className="border border-gray-200 p-4 rounded-xl transition-all duration-300 hover:border-yellow-300 focus-within:border-yellow-400 focus-within:ring-2 focus-within:ring-yellow-200">
              <label className="flex items-center gap-2 font-medium text-gray-700 mb-3">
                <FaStar className="text-yellow-500" /> 
                <span>Your Rating</span>
              </label>
              <div className="flex gap-3 justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <div key={star} className="relative">
                    {(hoverRating || rating) >= star && (
                      <span className="absolute inset-0 text-yellow-300 blur-sm"></span>
                    )}
                    <FaStar
                      size={36}
                      className={`cursor-pointer transition-all duration-300 ${
                        (hoverRating || rating) >= star 
                          ? "text-yellow-400 scale-110" 
                          : "text-gray-300 hover:text-gray-400"
                      }`}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                    />
                  </div>
                ))}
              </div>
              
              <div className="mt-3 h-6 text-center">
                {rating > 0 ? (
                  <p className="text-gray-700 font-medium">
                    {ratingLabels[rating - 1]} 
                    <span className="ml-1 text-yellow-500">
                      {Array(rating).fill("★").join("")}
                    </span>
                  </p>
                ) : (
                  <p className="text-gray-500 text-sm">Please select a rating</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium flex items-center justify-center gap-3 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 ease-in-out disabled:opacity-70"
            >
              <span className="absolute right-full group-hover:right-0 top-0 h-full w-12 bg-white bg-opacity-20 transform rotate-12 transition-all duration-1000 ease-out"></span>
              <FaPaperPlane 
                size={18} 
                className={`${loading ? "" : "group-hover:translate-x-1 group-hover:-translate-y-1"} transition-transform duration-300`} 
              /> 
              <span>{loading ? "Submitting..." : "Submit Feedback"}</span>
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Feedback;