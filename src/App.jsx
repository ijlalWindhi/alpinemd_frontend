import { useEffect, useState } from "react";
import { useAuth } from "./contexts/auth-provider";

export default function App() {
  const { login, logout, isAuthenticated, user, getAccessToken } = useAuth();

  const [accessToken, setAccessToken] = useState();

  useEffect(() => {
    (async () => {
      setAccessToken(await getAccessToken())
    })();
  }, [isAuthenticated]);

  return (
    <div>
      <pre>
        { isAuthenticated && JSON.stringify(user) } <br />
        { isAuthenticated && JSON.stringify(accessToken) }
      </pre>
      <button onClick={login}>Login Bang</button>
      <button onClick={logout}>Logout Bang</button>
    </div>
  );
}
