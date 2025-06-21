// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvqIpkaraCmFHvIZxpHnrfJrtZvkP0Yis",
  authDomain: "blog-61fe1.firebaseapp.com",
  projectId: "blog-61fe1",
  storageBucket: "blog-61fe1.firebasestorage.app",
  messagingSenderId: "536336674571",
  appId: "1:536336674571:web:f8471414e05e0360847c0e",
};

// Initialize Firebase
console.log("firebase add");

const app = initializeApp(firebaseConfig);
export default app;
