import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAdpzP_siNV3l5_yMJrTyGaagNTNMd9kPs",
    authDomain: "trippie-a4cec.firebaseapp.com",
    projectId: "trippie-a4cec",
    storageBucket: "trippie-a4cec.firebasestorage.app",
    messagingSenderId: "650992651400",
    appId: "1:650992651400:web:afdf571cf0ea62c533e33d"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, db, auth, googleProvider };
