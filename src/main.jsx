import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import 'remixicon/fonts/remixicon.css';

import App from "./App";
import AuthProvider from "./contexts/auth-provider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider
      domain="http://localhost:8000"
      tenant="alpinemd"
      clientId="6344f502f139bd25aebf1c10"
      clientSecret="$2b$04$YzZ43eIxfjA1nlnjsszYXu7GLHxwk7hBtfreqBOU9m3eCSqZWDjmC"
      redirectUri={window.location.origin + "/notes"}
      audience="https://alpinemd.com/"
      scope="read:notes write:notes update:notes delete:notes"
    >
      <App />
    </AuthProvider>
  </React.StrictMode>
);
