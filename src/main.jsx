import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import 'remixicon/fonts/remixicon.css';

import { Auth0Provider } from "@auth0/auth0-react";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-g8-zbmf7.us.auth0.com"
      clientId="ULZu7mTauvujLXQRdPdtJbAB3hhj3QJo"
      redirectUri={window.location.origin + "/notes"}
      audience="https://alpinemd.com/"
      scope="read:notes write:notes update:notes delete:notes"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
