import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useAuth } from "./contexts/auth-provider.tsx";
import styled from "styled-components";

import Root from "./routes/Root";
import Dashboard from "./routes/Dashboard";
import Welcome from "./routes/Welcome";
import NoteForm from "./routes/NoteForm";
import NoteList from "./routes/NoteList";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
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
        element: <Dashboard />,
        children: [
          {
            index: true,
            element: <NoteList />
          },
          {
            path: "new",
            element: <NoteForm />
          },
        ]
      }
    ]
  },
]);

export default function App() {
  const { isLoading } = useAuth();
  
  if (isLoading) {
    return <Wrapper><p>Loading User Info...</p></Wrapper>;
  }

  return <RouterProvider router={router} />;
}

