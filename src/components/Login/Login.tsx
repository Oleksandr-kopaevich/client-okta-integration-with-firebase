import { Tokens } from "@okta/okta-auth-js";
import { useOktaAuth } from "@okta/okta-react";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { CUSTOM_TOKEN_ENDPOINT } from "../../config";
import firebase from "../../firebase";
import OktaSignInWidget from "../OktaSignInWidget/OktaSignInWidget";
import { OktaSignInConfigT } from "../../config";

type LoginPropsT = {
  config: OktaSignInConfigT;
};

const Login = ({ config }: LoginPropsT) => {
  const { oktaAuth, authState } = useOktaAuth();
  const [isReadyForRedirect, setRedirectReadiness] = useState(
    authState?.isAuthenticated
  );

  const onSuccess = async (tokens: Tokens) => {
    const accessToken = tokens.accessToken?.accessToken || "";
    const oktaUserName = tokens.idToken?.claims.name || "";
    const oktaUserEmail = tokens.idToken?.claims.email || "";
    const firebaseTokenResponse = await fetch(CUSTOM_TOKEN_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const firebaseToken = await firebaseTokenResponse.text();

    try {
      const firebaseUserCredential = await firebase
        .auth()
        .signInWithCustomToken(firebaseToken);

      const { user } = firebaseUserCredential;

      if (user?.displayName !== oktaUserName) {
        await user?.updateProfile({ displayName: oktaUserName });
      }

      if (user?.email !== oktaUserEmail) {
        await user?.updateEmail(oktaUserEmail);
      }

      if (user) {
        oktaAuth.handleLoginRedirect(tokens);
        setRedirectReadiness(true);
      }
    } catch (err) {
      console.error("Error signing in with custom token.");
    }
  };

  const onError = (err: Error) => {
    console.error("error logging in", err);
  };

  return isReadyForRedirect ? (
    <Redirect to={{ pathname: "/user-profile" }} />
  ) : (
    <OktaSignInWidget config={config} onSuccess={onSuccess} onError={onError} />
  );
};

export default Login;
