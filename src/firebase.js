// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsFvMEHjaJTZOJpiRgn7W_nmQ33sDrFS0",
  authDomain: "utmonlineoldmarket.firebaseapp.com",
  projectId: "utmonlineoldmarket",
  storageBucket: "utmonlineoldmarket.appspot.com",
  messagingSenderId: "954361167993",
  appId: "1:954361167993:web:f661adb6f3e6d9535b94a8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


//auth
export const auth = getAuth(app);
export default app;