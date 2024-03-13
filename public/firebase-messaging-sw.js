// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
    apiKey: "AIzaSyAoISTgFdXmL9bfUa9BGm1TVj2Mk1pyp4k",
    authDomain: "edulink-416909.firebaseapp.com",
    projectId: "edulink-416909",
    storageBucket: "edulink-416909.appspot.com",
    messagingSenderId: "828688422847",
    appId: "1:828688422847:web:3b52a7175c51ef00dab30a",
    measurementId: "G-ZJJ7995D00"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});