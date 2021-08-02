import { useOktaAuth } from "@okta/okta-react";
import React, { useEffect, useState } from "react";
import firebase from "../../firebase";

const DEFAULT_USER = {
  displayName: "",
  email: "",
  uid: "",
};

const UserProfile: React.FC = () => {
  const [user, setUser] = useState(DEFAULT_USER);
  const { oktaAuth, authState } = useOktaAuth();

  const logout = async () => {
    try {
    oktaAuth.signOut();
    firebase.auth().signOut();
    } catch (e) {
      console.log("problems with signing out: ", e)
    }
  };

  const logoutButton = authState?.isAuthenticated && (
    <button onClick={logout}>Logout</button>
  );

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user: any) => {
      if (user) {
        setUser(user);
        // User is signed in. Display some user profile information.
        console.log("firebase.auth().onAuthStateChanged", user);
      }
    });
  }, []);

  const { displayName, email, uid } = user;

  return (
    <div style={{ textAlign: "left", padding: "30px" }}>
      <h1>
        User info from firebase (was got during registration from okta account)
      </h1>
      <div>{logoutButton}</div>
      <div>
        <div>
          <b>Name:</b>
          <span> {displayName}</span>
        </div>
        <div>
          <b>Email:</b>
          <span> {email}</span>
        </div>
        <div>
          <b>uid:</b>
          <span> {uid}</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
