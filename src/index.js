import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Auth0Provider } from "@auth0/auth0-react";
import ContextProvider from "./context/ContextProvider";
const root = ReactDOM.createRoot(document.getElementById("root"));

// dev-wwobm1ajytlvtehm.us.auth0.com
// xRoN68uap1Tylg6L897RnIXAapI6k06r

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-wwobm1ajytlvtehm.us.auth0.com"
      clientId="e1rwembZk3DEiPQyIOHThumXgo77VAfB"
      redirectUri={window.location.origin}
    >
      <ContextProvider>
        <App />
      </ContextProvider>
    </Auth0Provider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
