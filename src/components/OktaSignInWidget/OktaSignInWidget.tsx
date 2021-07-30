//@ts-ignore
import OktaSignIn from "@okta/okta-signin-widget";
import "@okta/okta-signin-widget/dist/css/okta-sign-in.min.css";
import React, { useEffect, useRef } from "react";

type OktaSignInWidgetT = {
  config: any;
  onSuccess: (req: any) => any;
  onError: (err: any) => void;
};

const OktaSignInWidget: React.FC<OktaSignInWidgetT> = ({
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

    // widget.renderEl({ el: widgetRef.current }, onSuccess, onError);

    return () => widget.remove();
  }, []);

  return <div ref={widgetRef} />;
};

export default OktaSignInWidget;
