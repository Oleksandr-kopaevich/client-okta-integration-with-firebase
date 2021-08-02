import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { LoginCallback, SecureRoute, Security } from "@okta/okta-react";
import React from "react";
import { Route, useHistory } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import UserProfile from "./components/UserProfile/UserProfile";
import { oktaAuthConfig, oktaSignInConfig } from "./config";

const oktaAuth = new OktaAuth(oktaAuthConfig);

const App = () => {
  const history = useHistory();
  const restoreOriginalUri = async (_oktaAuth: any, originalUri: string) => {
    try {
      history.replace(toRelativeUrl(originalUri, window.location.origin));
    } catch (err) {
      console.log(err);
    }
  };

  const onAuthRequired = () => {
    history.push("/login");
  };

  return (
    <div className="App">
      <div className="page">
        <div className="content">
          <Security
            oktaAuth={oktaAuth}
            restoreOriginalUri={restoreOriginalUri}
            onAuthRequired={onAuthRequired}
          >
            <Route
              path="/login"
              exact={true}
              render={() => <Login config={oktaSignInConfig} />}
            />
            <Route path="/login/callback" component={LoginCallback} />
            <SecureRoute
              path={["/user-profile", "/"]}
              exact={true}
              component={UserProfile}
            />
          </Security>
        </div>
      </div>
    </div>
  );
};

export default App;
