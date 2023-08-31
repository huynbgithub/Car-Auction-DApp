// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);