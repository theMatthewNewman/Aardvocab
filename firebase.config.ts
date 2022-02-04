// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOp2bojLU1VdoLc113u0V9oSGpeX-Yhqk",
  authDomain: "webgrim.firebaseapp.com",
  projectId: "webgrim",
  storageBucket: "webgrim.appspot.com",
  messagingSenderId: "851403839642",
  appId: "1:851403839642:web:ccc365938d170735dce723"
};


// Initialize Firebase

export const app = firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

export const auth = firebase.auth();

export const provider = new firebase.auth.GoogleAuthProvider();

