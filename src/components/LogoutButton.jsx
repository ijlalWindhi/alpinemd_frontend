import { useAuth } from "../contexts/auth-provider";

import { Button } from "./Button";

export default function LogoutButton() {
  const { logout } = useAuth();

  return (
    <Button
      onClick={logout}
    >
      Log Out
    </Button>
  );
}
