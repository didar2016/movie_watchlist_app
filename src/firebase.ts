// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQphUInQXLTBjLKOdJYpKg6YKV6ewo2Dg",
  authDomain: "movie-hub-29702.firebaseapp.com",
  projectId: "movie-hub-29702",
  storageBucket: "movie-hub-29702.firebasestorage.app",
  messagingSenderId: "421258393475",
  appId: "1:421258393475:web:294924ffc179162e83e8b6"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
