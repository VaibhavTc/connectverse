// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-ed1c0.firebaseapp.com",
  projectId: "mern-auth-ed1c0",
  storageBucket: "mern-auth-ed1c0.appspot.com",
  messagingSenderId: "993401313465",
  appId: "1:993401313465:web:c42e30d2d7be12b839a368",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
