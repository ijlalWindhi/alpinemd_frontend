import { AuthState } from "./auth-state";
import { User } from "./globals";

type Action =
  | {
      type:
        | "INITIALIZED"
        | "GET_ACCESS_TOKEN_COMPLETE"
        | "HANDLE_REDIRECT_COMPLETE";
      user?: User;
    }
  | { type: "LOGOUT" }
  | { type: "ERROR"; error: Error };

export const reducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case 'INITIALIZED':
      return {
        ...state,
        isAuthenticated: !!action.user,
        user: action.user,
        isLoading: false,
        error: undefined,
      }
    case 'HANDLE_REDIRECT_COMPLETE':
    case 'GET_ACCESS_TOKEN_COMPLETE':
      if (state.user?.updated_at === action.user?.updated_at) {
        return state;
      }
      return {
        ...state,
        isAuthenticated: !!action.user,
        user: action.user,
      }
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: undefined,
      }
    case 'ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      }
  }
};
