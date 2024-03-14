import { db, messaging } from "./firebase";
import { getToken, onMessage } from 'firebase/messaging';

export const FCM_TOKEN_COLLECTION = "fcmTokens";
export const FCM_TOKEN_KEY = "fcmToken"; // key for storing FCM token in Firestore
const VAPID_KEY = 'BDIUYUJKz2ZI948IaCeI7eWRASBtTcF3nSyok7KrBBzPacOqbRjPbrf-eOIvRhg0GiQvTxg7fhSTsnxqkY0kQE0'

async function requestNotificationsPermissions(uid) {
    console.log('Requesting notifications permission...');
    const permission = await Notification.requestPermission();
    
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      // Notification permission granted.
      await saveMessagingDeviceToken(uid);
    } else {
      console.log('Unable to get permission to notify.');
    }
  }

// Saves the messaging device token to Cloud Firestore.
export async function saveMessagingDeviceToken(uid) {
    console.log('save msg device token');
  
    try {
      const msg = await messaging();
      const fcmToken = await getToken(msg, { vapidKey: VAPID_KEY });
      if (fcmToken) {
        console.log('Got FCM device token:', fcmToken);
        
        // // Save device token to Firestore to use later
        // const tokenRef = doc(db, FCM_TOKEN_COLLECTION, uid);
        // await setDoc(tokenRef, { fcmToken });

        // This will fire when a message is received while the app is in the foreground.
        // When the app is in the background, firebase-messaging-sw.js will receive the message instead.
        await new Notification("asdd", { body: "vbody" });
        onMessage(msg, (message) => {
          console.log(
            'New foreground notification from Firebase Messaging!',
            message.notification
          );
          new Notification(message.notification.title, { body: message.notification.body });
        });
      } else {
        // Need to request permissions to show notifications.
        requestNotificationsPermissions(uid);
      }
    } catch (error) {
      console.error('Unable to get messaging token.', error);
    };
  }
