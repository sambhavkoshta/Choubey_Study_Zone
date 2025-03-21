import axios from "axios";

const API_BASE_URL = "http://localhost:7000/api/payment"; // Backend URL

export const createOrder = async (amount) => {
    try {
        const { data } = await axios.post(`${API_BASE_URL}/create-order`, {
            amount,
            currency: "INR",
            receipt: "receipt#1",
        });

        return data.order;
    } catch (error) {
        console.error("Order Creation Error:", error);
        throw error;
    }
};

export const verifyPayment = async (paymentData) => {
    try {
        const { data } = await axios.post(`${API_BASE_URL}/verify-payment`, paymentData);
        return data;
    } catch (error) {
        console.error("Payment Verification Error:", error);
        throw error;
    }
};
