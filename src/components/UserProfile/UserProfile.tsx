import { useOktaAuth } from "@okta/okta-react";
import React, { useEffect, useState } from "react";
import firebase from "../../firebase";

const DEFAULT_USER = {
  displayName: "",
  email: "",
  uid: "",
};

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const { oktaAuth, authState } = useOktaAuth();

  const logout = async () => {
    try {
      oktaAuth.signOut();
      firebase.auth().signOut();
    } catch (e) {
      console.log("problems with signing out: ", e);
    }
  };

  const logoutButton = authState?.isAuthenticated && (
    <button onClick={logout}>Logout</button>
  );

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);

  const { displayName, email, uid } = user || DEFAULT_USER;

  return (
    <div
      style={{
        textAlign: "left",
        padding: "30px",
        maxWidth: "500px",
        margin: "0 auto",
      }}
    >
      <h1 style={{ fontSize: "24px" }}>
        User info from firebase (was got during registration from okta account)
      </h1>
      <div style={{ margin: "15px 0" }}>{logoutButton}</div>
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
