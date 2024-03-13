import React from "react";
import { auth } from "../services/firebase";
import { LogoutIcon, BellIcon } from "@heroicons/react/outline";

const NotificationButton = () => {
  const playNotificationSound = () => {
    // Create an audio element
    const audio = new Audio('./notification-sound.mp3');
    // Play the audio
    audio.play();
  };

  return (
    <button className="notification-button" onClick={playNotificationSound}>
      <BellIcon className="h-6 w-6" />
    </button>
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
      <button
        className="p-2 mr-2 capitalize border-2 border-solid bg-green-500 border-green-500 font-medium rounded-full text-white lg:hover:bg-green-500 lg:hover:text-white"
       title="Ring for Assistance"> 
        <NotificationButton/>
      </button>

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
