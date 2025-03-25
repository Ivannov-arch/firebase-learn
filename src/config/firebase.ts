// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBWMMggQxhRAaBdgIM43RmY0NTlHUpB5R4",
  authDomain: "fir-learn-54dae.firebaseapp.com",
  projectId: "fir-learn-54dae",
  storageBucket: "fir-learn-54dae.firebasestorage.app",
  messagingSenderId: "894309244670",
  appId: "1:894309244670:web:eb271e6d14f847033a4faf",
  measurementId: "G-CP2T4MT0ZY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);

// const analytics = getAnalytics(app);