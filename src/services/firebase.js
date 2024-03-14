// import firebase from "firebase";
// import "firebase/auth";
// import "firebase/firestore";
// import "firebase/storage"

import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging, isSupported } from 'firebase/messaging';
import { getStorage } from "firebase/storage";

// Firebase Configs
const firebaseConfig = {
  apiKey: "AIzaSyAoISTgFdXmL9bfUa9BGm1TVj2Mk1pyp4k",
  authDomain: "edulink-416909.firebaseapp.com",
  projectId: "edulink-416909",
  storageBucket: "edulink-416909.appspot.com",
  messagingSenderId: "828688422847",
  appId: "1:828688422847:web:3b52a7175c51ef00dab30a",
  measurementId: "G-ZJJ7995D00"
};

// const auth = firebase.auth();
// const googleProvider = new firebase.auth.GoogleAuthProvider();
// const storage = firebase.storage();
// const messaging = firebase.messaging(app);

export const app = initializeApp(firebaseConfig);
// export const db = app.firestore();

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(auth);
export const db = getFirestore(app);
export const messaging = async () => await isSupported() && getMessaging(app);
export const storage = getStorage(app); 
