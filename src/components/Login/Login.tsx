import { useOktaAuth } from "@okta/okta-react";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { CUSTOM_TOKEN_ENDPOINT } from "../../config";
import firebase from "../../firebase";
import OktaSignInWidget from "../OktaSignInWidget/OktaSignInWidget";

const Login = ({ config }: any) => {
  const { oktaAuth, authState } = useOktaAuth();
  const [isReadyForRedirect, setRedirectReadiness] = useState(
    authState?.isAuthenticated
  );

  const onSuccess = async (tokens: any) => {
    oktaAuth.tokenManager.setTokens(tokens);
    console.log("tokens", tokens);
    // @ts-ignore
    const accessToken = tokens.accessToken.value;
    const oktaUserName = tokens.idToken.claims.name || "";
    const oktaUserEmail = tokens.idToken.claims.email || "";
    console.log("oktaUserName, oktaUserEmail", oktaUserName, oktaUserEmail);
    // Use the access token to call the firebaseCustomToken endpoint.
    const firebaseTokenResponse = await fetch(CUSTOM_TOKEN_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const firebaseToken = await firebaseTokenResponse.text();
    console.log("firebaseToken", firebaseToken);

    try {
      const firebaseUser = await firebase
        .auth()
        .signInWithCustomToken(firebaseToken);
      console.log("firebaseUser", firebaseUser);
      const { user } = firebaseUser;
      // const user = firebase.auth().currentUser;
      console.log("firebaseUser", firebaseUser, "user", user);

      if (user?.displayName !== oktaUserName) {
        await user?.updateProfile({ displayName: oktaUserName });
      }

      if (user?.email !== oktaUserEmail) {
        await user?.updateEmail(oktaUserEmail);
      }

      if (user) {
        console.log("oktaAuth, authState", oktaAuth, authState);
        // @ts-ignore
        oktaAuth.handleLoginRedirect(tokens);
        setRedirectReadiness(true);
      }
    } catch (err) {
      console.error("Error signing in with custom token.");
    }
  };

  const onError = (err: any) => {
    console.log("error logging in", err);
  };

  return isReadyForRedirect ? (
    <Redirect to={{ pathname: "/user-profile" }} />
  ) : (
    <OktaSignInWidget config={config} onSuccess={onSuccess} onError={onError} />
  );
};

export default Login;
