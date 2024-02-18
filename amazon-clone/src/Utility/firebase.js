import firebase from "firebase/compat/app";
// auth
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCa1pAE_SrB2z46egx8wppt6tDorO-EUbM",
  authDomain: "clone-8d1be.firebaseapp.com",
  projectId: "clone-8d1be",
  storageBucket: "clone-8d1be.appspot.com",
  messagingSenderId: "745383853974",
  appId: "1:745383853974:web:95f7e80c6cfa3db37327b7"
};





// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();