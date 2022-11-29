import { useAuth } from "../contexts/AuthProvider";

import { Button } from "./Button";

export default function LoginButton() {
  const { login } = useAuth();

  return (
    <Button
      onClick={() => login()}
      primary
    >
      Log In
    </Button>
  );
}
