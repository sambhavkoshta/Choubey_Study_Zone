import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaRegCheckCircle, FaTimesCircle, FaCreditCard, FaLock, FaSpinner } from "react-icons/fa";

const EnrollmentForm = ({ course, user, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [animateExit, setAnimateExit] = useState(false);
  const handleClose = () => {
    setAnimateExit(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };
  useEffect(() => {
    const checkEnrollment = async () => {
      if (!user) return;
      try {
        const response = await axios.get(
          `http://localhost:7000/api/student/check-enrollment?userId=${user._id}&courseId=${course._id}`
        );

        if (response.data.enrolled) {
          setIsEnrolled(true);
          
          const toastKey = `toast_shown_${user._id}_${course._id}`;
          if (!localStorage.getItem(toastKey)) {
            toast.info("✅ You are already enrolled in this course!", { 
              autoClose: 3000,
              position: "top-center",
              hideProgressBar: false,
            });
            localStorage.setItem(toastKey, "true");
          }

          setTimeout(() => {
            handleClose();
          }, 2000);
        }
      } catch (error) {
        console.error("❌ Enrollment check error:", error);
        toast.error("⚠️ Something went wrong, please try again!", { 
          autoClose: 3000,
          position: "top-center" 
        });
      }
    };

    checkEnrollment();
  }, [user, course, onClose]);
  const handlePayment = async () => {
    if (isEnrolled) return;

    try {
      setLoading(true);

      const token = localStorage.getItem("userToken");
      const response = await axios.post(
        "http://localhost:7000/api/payments/create-order",
        { amount: course.price, currency: "INR", receipt: `receipt_${Date.now()}` },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { orderId, amount, currency } = response.data;

      const options = {
        key: "rzp_test_U2SI67Bs4otObo",
        amount: amount,
        currency: currency,
        name: "Chaubey Study Zone",
        description: course.title,
        order_id: orderId,
        handler: async function (response) {
          try {
            await axios.post("http://localhost:7000/api/payments/verify-payment", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              userId: user._id,
              courseId: course._id,
              amount: course.price,
            });

            toast.success("🎉 Payment successful! You have been enrolled in the course.", { 
              autoClose: 3000,
              position: "top-center"
            });
            handleClose();
          } catch (error) {
            toast.error("❌ Payment verification failed. Please try again.", { 
              autoClose: 3000,
              position: "top-center"
            });
          }
        },
        prefill: {
          name: `${user?.firstname} ${user?.lastname}`,
          email: user?.email,
          contact: user?.phone,
        },
        theme: { color: "#4f46e5" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error("⚠️ Payment initialization failed. Please try again.", { 
        autoClose: 3000,
        position: "top-center" 
      });
    } finally {
      setLoading(false);
    }
  };
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300"
      style={{ opacity: animateExit ? 0 : 1 }}
      onClick={handleClose}
    >
      <div 
        className={`bg-white dark:bg-gray-800 p-0 rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden transform transition-all duration-300 ${animateExit ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}
        onClick={e => e.stopPropagation()}
      >
        <div className="relative h-48 overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600">
          {course.imageUrl ? (
            <img 
              src={course.imageUrl} 
              alt={course.title} 
              className="w-full h-full object-cover opacity-85" 
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
              <h3 className="text-3xl font-bold text-white">Chaubey Study Zone</h3>
            </div>
          )}
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 text-white bg-black bg-opacity-30 hover:bg-opacity-40 rounded-full p-2 transition-all duration-200 hover:rotate-90"
            aria-label="Close"
          >
            <FaTimesCircle className="text-xl" />
          </button>
          <div className="absolute bottom-4 right-4 bg-white dark:bg-gray-900 text-indigo-600 dark:text-indigo-400 font-bold py-2 px-4 rounded-full shadow-lg">
            ₹{formatPrice(course.price)}
          </div>
        </div>
        <div className="px-6 py-6">
          <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">{course.title}</h2>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {course.description}
            </p>
            {course.highlights && (
              <div className="mt-3 space-y-1">
                {course.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start">
                    <FaRegCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <p className="text-sm text-gray-600 dark:text-gray-300">{highlight}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          {isEnrolled ? (
            <div className="bg-green-50 dark:bg-green-900 dark:bg-opacity-20 border border-green-200 dark:border-green-800 rounded-lg p-4 text-center">
              <FaRegCheckCircle className="text-3xl text-green-500 mx-auto mb-2" />
              <p className="text-green-700 dark:text-green-400 font-medium">
                You are already enrolled in this course!
              </p>
              <p className="text-sm text-green-600 dark:text-green-500 mt-1">
                Redirecting to the course page...
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-center mb-4 text-gray-500 dark:text-gray-400 text-sm">
                <FaLock className="mr-2" />
                <span>Secure Payment via Razorpay</span>
              </div>
              <button
                onClick={handlePayment}
                className="w-full relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium shadow-lg hover:from-indigo-700 hover:to-purple-700 transform hover:-translate-y-1 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin inline mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <FaCreditCard className="inline mr-2" />
                    Proceed to Pay ₹{formatPrice(course.price)}
                  </>
                )}
              </button>
              <button
                onClick={handleClose}
                className="w-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-3 bg-gray-50 dark:bg-gray-800 text-center text-xs text-gray-500 dark:text-gray-400">
          By enrolling, you agree to our Terms of Service and Privacy Policy
        </div>
      </div>
    </div>
  );
};

export default EnrollmentForm;