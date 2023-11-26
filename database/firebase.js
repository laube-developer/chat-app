// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBRiw4W8Eo-H9yuo2mW7p4m1htWblPzqWU",
  authDomain: "chat-app-b9ceb.firebaseapp.com",
  projectId: "chat-app-b9ceb",
  storageBucket: "chat-app-b9ceb.appspot.com",
  messagingSenderId: "242820658513",
  appId: "1:242820658513:web:64ea26eed25a6ce4fbcf70",
  measurementId: "G-SVE7ST4LP1",
};

const initializeFirebase = ()=>{
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    // const analytics = getAnalytics(app);

    const auth = getAuth()

    return {
        app, /*analytics*/
    }
}

export default initializeFirebase