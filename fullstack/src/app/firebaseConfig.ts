// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBX7IU_x9865cznGmSUGeLjN2LDe3GI7_k",
  authDomain: "software-engineering-pro-c9dc8.firebaseapp.com",
  projectId: "software-engineering-pro-c9dc8",
  storageBucket: "software-engineering-pro-c9dc8.firebasestorage.app",
  messagingSenderId: "237893793014",
  appId: "1:237893793014:web:9957074a8fe34aa79e68d7",
  measurementId: "G-1Y0QF6K2G7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };