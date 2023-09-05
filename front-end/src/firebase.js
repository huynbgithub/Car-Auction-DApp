// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: "futurev-car-auction.firebaseapp.com",
    projectId: "futurev-car-auction",
    storageBucket: "futurev-car-auction.appspot.com",
    messagingSenderId: "817175804833",
    appId: "1:817175804833:web:c8972323ae4748d62ea9e0",
    measurementId: "G-DSKPCLD6JH"
};

// Initialize Firebase
const initializeFirebase = () => initializeApp(firebaseConfig)

export default initializeFirebase