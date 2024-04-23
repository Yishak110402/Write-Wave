// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-ejzEhC2JuTkcSTZhvsT5LUyRstd68OI",
  authDomain: "write-wave-f29b6.firebaseapp.com",
  projectId: "write-wave-f29b6",
  storageBucket: "write-wave-f29b6.appspot.com",
  messagingSenderId: "36479851862",
  appId: "1:36479851862:web:9056bf7c05c67c8d624af7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageStorage = getStorage(app)