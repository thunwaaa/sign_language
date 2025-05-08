// Import the functions you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrKiMDPhULJlHxMaUH0_muXAppR5dsmSg",
  authDomain: "handgesture-3971d.firebaseapp.com",
  projectId: "handgesture-3971d",
  storageBucket: "handgesture-3971d.appspot.com",
  messagingSenderId: "484360634488",
  appId: "1:484360634488:web:888a4d635f819b1931ed8d",
  measurementId: "G-RJTK7VHT0X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ✅ Initialize and export auth
export const auth = getAuth(app);
export const db = getFirestore(app);