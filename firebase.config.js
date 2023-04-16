// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyACwK2NGu_VxLgfBnFSMj53QtIK9D4uhdY",
    authDomain: "email-password-auth-b9c5f.firebaseapp.com",
    projectId: "email-password-auth-b9c5f",
    storageBucket: "email-password-auth-b9c5f.appspot.com",
    messagingSenderId: "976394085284",
    appId: "1:976394085284:web:1588afe77f056dbee2d731"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;