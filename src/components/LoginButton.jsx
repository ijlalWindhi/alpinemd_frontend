import { useAuth0 } from "@auth0/auth0-react";
import "./Button.css";

export default function LoginButton() {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      onClick={() => loginWithRedirect()}
      className="button button-primary"
    >
      Log In
    </button>
  );
}
