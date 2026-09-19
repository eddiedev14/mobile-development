// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAk2lWQ8lGNqNzNuIJzZe7b_5QOvggDUWw",
  authDomain: "mobile-development-ea468.firebaseapp.com",
  projectId: "mobile-development-ea468",
  storageBucket: "mobile-development-ea468.firebasestorage.app",
  messagingSenderId: "759964426933",
  appId: "1:759964426933:web:aedb43eaba2329ffa354fc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

export { app, auth, db };
