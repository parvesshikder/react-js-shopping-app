// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
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

export const firebase = initializeApp(firebaseConfig);
export const auth = getAuth(firebase);
export default firebase;
export const storage = getStorage(firebase);