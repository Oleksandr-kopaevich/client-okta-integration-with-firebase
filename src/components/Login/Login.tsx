import { useOktaAuth } from "@okta/okta-react";
import React from "react";
import { Redirect } from "react-router-dom";
import { CUSTOM_TOKEN_ENDPOINT } from "../../config";
import firebase from "../../firebase";
import OktaSignInWidget from "../OktaSignInWidget/OktaSignInWidget";

const Login = ({ config }: any) => {
  const { oktaAuth, authState } = useOktaAuth();

  const onSuccess = async (tokens: any) => {
    oktaAuth.tokenManager.setTokens(tokens);
    console.log("tokens", tokens);
    // @ts-ignore
    const accessToken = tokens.accessToken.value;

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

      if (user) {
        console.log("oktaAuth, authState", oktaAuth, authState);
        // @ts-ignore
        oktaAuth.handleLoginRedirect(tokens);
      }
    } catch (err) {
      console.error("Error signing in with custom token.");
    }
  };

  const onError = (err: any) => {
    console.log("error logging in", err);
  };

  return authState?.isAuthenticated ? (
    <Redirect to={{ pathname: "/" }} />
  ) : (
    <OktaSignInWidget config={config} onSuccess={onSuccess} onError={onError} />
  );
};

export default Login;
