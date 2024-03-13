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
const messaging = firebase.messaging(app);
export { db, auth, googleProvider, storage, messaging };


const VAPID_KEY = 'BDIUYUJKz2ZI948IaCeI7eWRASBtTcF3nSyok7KrBBzPacOqbRjPbrf-eOIvRhg0GiQvTxg7fhSTsnxqkY0kQE0'
export const fetchToken = (setTokenFound) => {
  return messaging.getToken(VAPID_KEY).then((currentToken) => {
    if (currentToken) {
      console.log('current token for client: ', currentToken);
      setTokenFound(true);
      // Track the token -> client mapping, by sending to backend server
      // show on the UI that permission is secured
    } else {
      console.log('No registration token available. Request permission to generate one.');
      setTokenFound(false);
      // shows on the UI that permission is required 
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // catch error while creating client token
  });
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage(messaging, (payload) => {
      resolve(payload);
    });
});