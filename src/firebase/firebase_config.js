// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";
// import { getFirestore } from "firebase/firestore/lite";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcpbkmPfHY6JQag0u3BU0Qu5B6tuxZGIU",
  authDomain: "socialnetworkhugme2.firebaseapp.com",
  projectId: "socialnetworkhugme2",
  storageBucket: "socialnetworkhugme2.firebasestorage.app",
  messagingSenderId: "390958907694",
  appId: "1:390958907694:web:72eea18a30f347340afabf"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);

