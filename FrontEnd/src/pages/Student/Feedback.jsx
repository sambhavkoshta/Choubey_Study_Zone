import { useState, useEffect } from "react";
import { FaStar, FaComments, FaPaperPlane, FaCheckCircle, FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";

const ratingLabels = ["Very Bad", "Poor", "Average", "Good", "Excellent"];
const ratingColors = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6"];

const Feedback = () => {
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  // Animation trigger effect
  useEffect(() => {
    setAnimate(true);
    const timeout = setTimeout(() => setAnimate(false), 1000);
    return () => clearTimeout(timeout);
  }, [rating]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Determine star size based on screen width
  const getStarSize = () => {
    if (windowWidth < 380) return 28;
    if (windowWidth < 640) return 32;
    return 36;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a rating before submitting! ⭐", {
        position: "top-center",
        className: "bg-red-50 border-l-4 border-red-500",
      });
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
      toast.success("Feedback submitted successfully!", {
        position: "top-center",
        className: "bg-green-50 border-l-4 border-green-500",
      });

      // Reset form after 3 seconds
      setTimeout(() => {
        setMessage("");
        setRating(0);
        setHoverRating(0);
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
        className: "bg-red-50 border-l-4 border-red-500",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-3 sm:p-5 lg:p-8 bg-white shadow-xl rounded-2xl border border-gray-200 mt-4 md:mt-8 transition-all duration-500 hover:shadow-2xl">
      {submitted ? (
        <div className="flex flex-col items-center justify-center text-center p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 animate-fadeIn">
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-green-200 to-blue-200 rounded-full opacity-70 blur-md animate-pulse"></div>
            <FaCheckCircle size={windowWidth < 640 ? 50 : 70} className="relative text-green-600 animate-bounce" />
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
            Thank You for Your Feedback!
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">Your input helps us improve our services!</p>
          <div className="flex justify-center mt-2 sm:mt-4">
            {[...Array(5)].map((_, i) => (
              <FaHeart
                key={i}
                className="mx-1 text-pink-500 animate-pulse"
                style={{
                  animationDelay: `${i * 0.15}s`,
                  opacity: 0.7 + i * 0.1,
                }}
                size={windowWidth < 640 ? 18 : 24}
              />
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center justify-center">
              <span className="relative inline-block">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-75 blur-sm"></div>
                <FaComments className="relative text-white text-2xl sm:text-3xl md:text-4xl p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                <span className="absolute top-0 right-0 h-2 w-2 sm:h-3 sm:w-3 bg-blue-500 rounded-full animate-ping"></span>
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mt-3">
              Submit Feedback
            </h2>
            <p className="text-sm sm:text-base text-gray-500 text-center mt-2 animate-pulse">We value your opinion!</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Feedback Message */}
            <div className="group relative border border-gray-200 p-3 sm:p-4 rounded-xl transition-all duration-300 hover:border-blue-300 hover:shadow-md focus-within:border-blue-400 focus-within:shadow-lg focus-within:ring-2 focus-within:ring-blue-200">
              <label className="flex items-center gap-2 font-medium text-gray-700 mb-2 text-sm sm:text-base">
                <FaComments className="text-blue-500" /> 
                <span>Your Feedback</span>
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share your thoughts with us..."
                className="w-full outline-none resize-none rounded-lg p-2 sm:p-3 text-sm sm:text-base text-gray-700 placeholder-gray-400 bg-gray-50 focus:bg-white transition-all"
                rows={windowWidth < 640 ? "3" : "4"}
              ></textarea>
              <div className={`absolute bottom-2 right-2 text-xs ${message.length > 400 ? 'text-orange-500' : 'text-gray-400'}`}>
                {message.length} / 500
              </div>
            </div>

            {/* Star Rating System */}
            <div className="border border-gray-200 p-3 sm:p-4 rounded-xl transition-all duration-300 hover:border-yellow-300 hover:shadow-md focus-within:border-yellow-400 focus-within:shadow-lg focus-within:ring-2 focus-within:ring-yellow-200">
              <label className="flex items-center gap-2 font-medium text-gray-700 mb-2 sm:mb-3 text-sm sm:text-base">
                <FaStar className="text-yellow-500" /> 
                <span>Your Rating</span>
              </label>
              <div className="flex gap-1 sm:gap-3 justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <div key={star} className="relative">
                    {(hoverRating || rating) >= star && (
                      <span className="absolute inset-0 blur-md" 
                        style={{ color: ratingColors[(hoverRating || rating) - 1] }}></span>
                    )}
                    <FaStar
                      size={getStarSize()}
                      className={`cursor-pointer transition-all duration-300 ${
                        (hoverRating || rating) >= star 
                          ? "scale-110" 
                          : "text-gray-300 hover:text-gray-400"
                      }`}
                      style={{
                        color: (hoverRating || rating) >= star 
                          ? ratingColors[(hoverRating || rating) - 1] 
                          : undefined,
                        transform: animate && rating === star ? "scale(1.3)" : undefined,
                      }}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                    />
                  </div>
                ))}
              </div>
              
              <div className="mt-2 sm:mt-3 h-6 text-center">
                {rating > 0 ? (
                  <p className="font-medium animate-fadeIn text-sm sm:text-base" style={{ color: ratingColors[rating - 1] }}>
                    {ratingLabels[rating - 1]} 
                    <span className="ml-1">
                      {Array(rating).fill("★").join("")}
                    </span>
                  </p>
                ) : (
                  <p className="text-gray-500 text-xs sm:text-sm">Please select a rating</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium flex items-center justify-center gap-2 sm:gap-3 transition-all duration-300 ease-in-out disabled:opacity-70 hover:shadow-lg hover:shadow-indigo-200 text-sm sm:text-base"
            >
              <span className="absolute right-full group-hover:right-0 top-0 h-full w-full bg-white bg-opacity-20 transform skew-x-12 transition-all duration-700 ease-out"></span>
              <FaPaperPlane 
                size={windowWidth < 640 ? 16 : 18} 
                className={`${loading ? "animate-spin" : "group-hover:translate-x-1 group-hover:-translate-y-1"} transition-transform duration-300`} 
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