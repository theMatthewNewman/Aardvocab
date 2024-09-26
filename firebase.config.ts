// Import the functions you need from the SDKs you need
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration


const firebaseConfig = {
  apiKey: "AIzaSyCcoCUVvutwrZdRVqFo39wDAOHl6GkYzAc",
  authDomain: "aardvocab-c1169.firebaseapp.com",
  databaseURL: "https://aardvocab-c1169-default-rtdb.firebaseio.com",
  projectId: "aardvocab-c1169",
  storageBucket: "aardvocab-c1169.appspot.com",
  messagingSenderId: "201987574965",
  appId: "1:201987574965:web:b230a605f521b6a4f602fc",
  measurementId: "G-2G1YHJVW48"
};


// Initialize Firebase

export const app = firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const fire = firebase

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const storage = firebase.storage();

export const provider = new firebase.auth.GoogleAuthProvider();

