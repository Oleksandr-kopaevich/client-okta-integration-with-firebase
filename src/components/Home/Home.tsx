import { useOktaAuth } from "@okta/okta-react";
import React from "react";
import { Link, useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();
  const { oktaAuth, authState } = useOktaAuth();

  if (!authState) return null;

  const login = async () => history.push("/login");
  const logout = async () => oktaAuth.signOut();

  const button = authState.isAuthenticated ? (
    <button onClick={logout}>Logout</button>
  ) : (
    <button onClick={login}>Login</button>
  );

    console.log("authState ", authState)

  return (
    <div>
      <Link to="/">Home</Link>
      <br />
      <Link to="/user-profile">User profile</Link>
      <br />
      {button}
    </div>
  );
};

export default Home;
