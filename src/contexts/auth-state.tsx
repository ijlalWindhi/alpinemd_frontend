import { User } from "./globals";

/**
 * The auth state which, when combined with the auth methods, make up the return object of the `useAuth` hook.
 */
export interface AuthState {
  error?: Error;
  isAuthenticated: boolean;
  isLoading: boolean;
  user?: User;
}

/**
 * The initial auth state.
 */
export const initialAuthState: AuthState = {
  isAuthenticated: false,
  isLoading: true,
};
