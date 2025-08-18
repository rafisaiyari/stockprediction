// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-0fuHpI2Wb-OBbay72Vb6tQYEjgHf1Os",
  authDomain: "stonksmaangas.firebaseapp.com",
  projectId: "stonksmaangas",
  storageBucket: "stonksmaangas.firebasestorage.app",
  messagingSenderId: "643441318531",
  appId: "1:643441318531:web:802acacce2cb7f163959b6",
  measurementId: "G-K1TNJ48HV3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);