const OKTA_ORG_URL = `https://${process.env.REACT_APP_OKTA_ORG_URL}`;
const OKTA_CLIENT_ID = process.env.REACT_APP_OKTA_CLIENT_ID;

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_apiKey,
  authDomain: process.env.REACT_APP_FIREBASE_authDomain,
  projectId: process.env.REACT_APP_FIREBASE_projectId,
  storageBucket: process.env.REACT_APP_FIREBASE_storageBucket,
  messagingSenderId: process.env.REACT_APP_FIREBASE_messagingSenderId,
  appId: process.env.REACT_APP_FIREBASE_appId,
  measurementId: process.env.REACT_APP_FIREBASE_measurementId,
};

export const CUSTOM_TOKEN_ENDPOINT =
  (window.location.hostname === "localhost"
    ? process.env.REACT_APP_CUSTOM_TOKEN_ENDPOINT_LOCALHOST
    : process.env.REACT_APP_CUSTOM_TOKEN_ENDPOINT) || "";

const oktaBaseConfig = {
  clientId: OKTA_CLIENT_ID || "",
  redirectUri: window.location.origin + "/login/callback",
  scope: "openid profile email",
  scopes: ["openid", "profile", "email"],
};

type OktaBaseConfigT = {
  clientId: string;
  redirectUri: string;
  scope: string;
  scopes: string[];
};

export type OktaAuthConfigT = OktaBaseConfigT & {
  issuer: string;
};

export type OktaSignInConfigT = OktaBaseConfigT & {
  baseUrl: string;
};

const oktaAuthConfig: OktaAuthConfigT = {
  ...oktaBaseConfig,
  issuer: `${OKTA_ORG_URL}/oauth2/default`,
};

const oktaSignInConfig: OktaSignInConfigT = {
  ...oktaBaseConfig,
  baseUrl: OKTA_ORG_URL,
};

export { oktaAuthConfig, oktaSignInConfig };
