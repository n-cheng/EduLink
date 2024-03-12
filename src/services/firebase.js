import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage"

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

// Checking if app already initialize then don't initialize again
const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();
export { db, auth, googleProvider, storage };
