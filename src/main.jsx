import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

import Root from "./routes/Root";
import Notes from "./routes/Notes";
import Welcome from "./routes/Welcome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Welcome />
      },
      {
        path: "notes",
        element: <Notes />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-g8-zbmf7.us.auth0.com"
      clientId="ULZu7mTauvujLXQRdPdtJbAB3hhj3QJo"
      redirectUri={window.location.origin + "/notes"}
    >
      <RouterProvider router={router} />
    </Auth0Provider>
  </React.StrictMode>
);
