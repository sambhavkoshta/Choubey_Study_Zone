import React from "react";
import API from "../api";

const PaymentButton = ({ formData, course }) => {
  const handlePayment = async () => {
    try {
      const { data } = await API.post("/payments/create-order", {
        amount: course.price,
        courseId: course._id,
        userDetails: formData,
      });

      const options = {
        key:"rzp_test_U2SI67Bs4otObo",
        amount: data.amount,
        currency: "INR",
        name: "Chaubey Study Zone",
        description: `Payment for ${course.title}`,
        order_id: data.orderId,
        handler: async (response) => {
          try {
            const response = await API.post("/payment/verify-payment", {
            razorpay_order_id: orderResponse.data.orderId,
            razorpay_payment_id: razorpayResponse.razorpay_payment_id,
            razorpay_signature: razorpayResponse.razorpay_signature,
            courseId: course._id,
            });

            if (response.data.success) {
            alert("Payment Successful!");
            window.location.reload();
            }
        } catch (error) {
            console.error("Payment verification failed:", error);
            alert("Payment verification failed!");
        }
        },
        prefill: {
          name: `${formData.firstname} ${formData.lastname}`,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error initializing payment:", error);
      alert("Payment initialization failed!");
    }
  };

  return (
    <button
      type="button"
      className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-300"
      onClick={handlePayment}
    >
      Pay Now
    </button>
  );
};

export default PaymentButton;
