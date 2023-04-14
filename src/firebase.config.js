// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3CN5clGp45bUXhMFBJi6LcmqOW3gNIY8",
  authDomain: "clone-1f2ba.firebaseapp.com",
  projectId: "clone-1f2ba",
  storageBucket: "clone-1f2ba.appspot.com",
  messagingSenderId: "403405504952",
  appId: "1:403405504952:web:dff88520a96be1699d0f4d",
  measurementId: "G-XGTZXM9487"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export default firebaseConfig;
