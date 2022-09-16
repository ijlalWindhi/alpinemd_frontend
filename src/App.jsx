import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

import Root from "./routes/Root";
import Notes from "./routes/Notes";
import Welcome from "./routes/Welcome";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  font-family: monospace;
  font-size: x-large;
`;

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

export default function App() {
  const { isLoading } = useAuth0();
  
  if (isLoading) {
    return <Wrapper><p>Loading User Info...</p></Wrapper>;
  }

  return <RouterProvider router={router} />;
}