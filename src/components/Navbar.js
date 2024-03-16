import React, { useState, useEffect } from "react";
import { auth } from "../services/firebase";
import { LogoutIcon, BellIcon } from "@heroicons/react/outline";

import { isUserTokenSaved, saveMessagingDeviceToken, removeMessagingDeviceToken } from "../services/messaging"

const NotificationButton = () => {
  const [audio] = useState(() => new Audio('https://storage.googleapis.com/edulink/notification-sound.mp3'));
  audio.type = "audio/mp3";

  const [isSubscribed, setIsSubscribed] = useState(null);

  useEffect(() => {
    const checkUserSubscription = async () => {
      const userIsSubscribed = await isUserTokenSaved();
      setIsSubscribed(userIsSubscribed);
    };

    checkUserSubscription();
  }, []);

  const playNotificationSound = () => {
    audio.play();
  };

  const subscribeToNotification = () => {
    console.log("subscribeToNotification");
    saveMessagingDeviceToken();
    setIsSubscribed(true);
  };

  const unsubscribeToNotification = () => {
    console.log("unsubscribeToNotification");
    removeMessagingDeviceToken();
    setIsSubscribed(false);
  };

  const subscribeOrUnsubscribeButton = () => {
    if (isSubscribed == null) return;

    return <>
      {
        isSubscribed ? 
        <button className="p-2 mr-2 capitalize border-2 border-solid bg-red-500 border-red-500 font-medium rounded-full text-white lg:hover:bg-red-500 lg:hover:text-white notification-button"
          title="Unsubscribe" onClick={unsubscribeToNotification}>
            Unsubscribe
        </button> :
        <button className="p-2 mr-2 capitalize border-2 border-solid bg-green-500 border-green-500 font-medium rounded-full text-white lg:hover:bg-green-500 lg:hover:text-white notification-button"
          title="Subscribe" onClick={subscribeToNotification}>
            Subscribe
        </button>
      }
    </>
  }
  
  return (
    <div className="items-center justify-between">
      <button className="p-2 mr-2 capitalize border-2 border-solid bg-green-500 border-green-500 font-medium rounded-full text-white lg:hover:bg-green-500 lg:hover:text-white notification-button"
      title="Ring for Assistance" onClick={playNotificationSound}>
        <BellIcon className="h-6 w-6" />
      </button>
      {
       subscribeOrUnsubscribeButton() 
      }
    </div>
  );
};

const Navbar = ({ user }) => {
  return (
    <div className="flex items-center p-1 justify-between  w-full shadow-md sticky top-0 bg-blue-200 z-50 dark:text-black lg:px-10">
      {/* this shows the user Details on the navbar */}
      <div className="flex rounded-full p-2 pr-3">
        <img className="rounded-full w-10 h-10" src={user.photoURL} alt="" />
        <div className="ml-2">
          <p className="font-medium">{user.displayName}</p>
          <p className="text-xs">{user.email}</p>
        </div>
      </div>

      {/* Notification button */}
        <NotificationButton/>

      {/* Logout button */}
      <button
      title="Log out"
        className="p-2 mr-2 capitalize border-2 border-solid bg-red-500 border-red-500 font-medium rounded-full text-white lg:hover:bg-red-500 lg:hover:text-white"
        onClick={() => auth.signOut()}
      >
        <LogoutIcon className="w-5 h-5 " />
      </button>
    </div>
  );
};

export default Navbar;
