// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFb5QwLmBmMHYQsOCaAmdF1TAr-GT1kgI",
  authDomain: "gemist-solutions.firebaseapp.com",
  projectId: "gemist-solutions",
  storageBucket: "gemist-solutions.firebasestorage.app",
  messagingSenderId: "785035861401",
  appId: "1:785035861401:web:0aa735ab8741622d16c708",
  measurementId: "G-9LFEXBT2MK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);