import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDtKqWrxwSytOubhBogIRzJcul0QpTO1_Y",
  authDomain: "sambhav-cfb48.firebaseapp.com",
  projectId: "sambhav-cfb48",
  storageBucket: "sambhav-cfb48.firebasestorage.app",
  messagingSenderId: "168918848059",
  appId: "1:168918848059:web:c1732563f00fc51720c21e",
  measurementId: "G-45HRJ0V0EH"
};

// Firebase initialize
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log(result.user);
    return result.user;
  } catch (error) {
    console.error("Google Sign-In Error:", error);
  }
};