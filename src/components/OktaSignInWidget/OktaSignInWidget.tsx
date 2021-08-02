//@ts-ignore
import OktaSignIn from "@okta/okta-signin-widget";
import "@okta/okta-signin-widget/dist/css/okta-sign-in.min.css";
import React, { useEffect, useRef } from "react";
import { Tokens } from "@okta/okta-auth-js";
import { OktaSignInConfigT } from "../../config";

type OktaSignInWidgetPropsT = {
  config: OktaSignInConfigT;
  onSuccess: (tokens: Tokens) => void;
  onError: (err: Error) => void;
};

const OktaSignInWidget: React.FC<OktaSignInWidgetPropsT> = ({
  config,
  onSuccess,
  onError,
}) => {
  const widgetRef = useRef(null);

  useEffect(() => {
    if (!widgetRef.current) {
      return () => {};
    }

    const widget = new OktaSignIn(config);

    widget
      .showSignInToGetTokens({
        el: widgetRef.current,
      })
      .then(onSuccess)
      .catch(onError);
    return () => widget.remove();
  }, []);

  return <div ref={widgetRef} />;
};

export default OktaSignInWidget;
