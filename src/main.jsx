import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "remixicon/fonts/remixicon.css";

import App from "./App";
import AuthProvider from "./contexts/auth-provider";

import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ChakraProvider>
            <AuthProvider
                domain="http://localhost:2005"
                tenant="ijlal"
                clientId="635a6d7a42a94f6e298869a0"
                clientSecret="$2b$04$yMCGwaNoq6olOTUeKxB3bO5xFDz5XcSt0bD86jUBVa8vToDgxCxVq"
                redirectUri={window.location.origin + "/notes"}
                audience="http://localhost:8080"
                scope="read:notes write:notes update:notes delete:notes"
            >
                <App />
            </AuthProvider>
        </ChakraProvider>
    </React.StrictMode>
);
