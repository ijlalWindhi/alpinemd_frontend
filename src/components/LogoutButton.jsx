import { useAuth0 } from "@auth0/auth0-react";

import { Button } from "./Button";

export default function LogoutButton() {
  const { logout } = useAuth0();

  return (
    <Button
      onClick={() => logout({ returnTo: window.location.origin })}
    >
      Log Out
    </Button>
  );
}
