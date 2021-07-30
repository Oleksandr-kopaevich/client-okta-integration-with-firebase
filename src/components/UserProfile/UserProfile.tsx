import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import firebase from "../../firebase";

const UserProfile: React.FC = () => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user: any) => {
      if (user) {
        // User is signed in. Display some user profile information.
        console.log("firebase.auth().onAuthStateChanged", user);
      }
    });
  }, []);

  return (
    <div>
      <Link to="/">Home</Link>
    </div>
  );
};

export default UserProfile;
