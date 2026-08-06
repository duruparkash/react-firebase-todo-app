// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWulck1xcAld-eCAQX0Bi9TkhHvxUO5-k",
  authDomain: "todo-app-8f5b4.firebaseapp.com",
  projectId: "todo-app-8f5b4",
  storageBucket: "todo-app-8f5b4.firebasestorage.app",
  messagingSenderId: "199485997238",
  appId: "1:199485997238:web:bc0bd7183242a7dfa46617",
  measurementId: "G-W634TXTHZ3"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };

