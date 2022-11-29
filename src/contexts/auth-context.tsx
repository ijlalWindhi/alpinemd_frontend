import { AuthState, initialAuthState } from "./auth-state";

/**
 * Contains the authenticated state and authentication methods provided by the `useAuth` hook.
 */
export interface AuthContextInterface extends AuthState {
  /**
   * If there's a valid token stored, return it. Otherwise calls `/authorize`
   * URL using the parameters provided as arguments.
   */
  getAccessToken: () => Promise<string | undefined>;

  /**
   * Performs a redirect to `/authorize` using the parameters provided as
   * arguments.
   */
  login: () => Promise<void>;

  /**
   * Clears the application session and performs a redirect to `/v2/logout`, using
   * the parameters provided as arguments, to clear the Auth0 session.
   */
  logout: () => Promise<void>;

  /**
   * Builds an `/authorize` URL for loginWithRedirect using the parameters
   * provided as arguments.
   */
  buildAuthorizeUrl: () => Promise<string>;

  /**
   * returns a URL to the logout endpoint using the parameters provided as arguments.
   */
  buildLogoutUrl: () => Promise<string>;

  /**
   * After the browser redirects back to the callback page,
   * call `handleRedirectCallback` to handle success and error
   * responses from Auth0. If the response is successful, results
   * will be valid according to their expiration times.
   *
   * @param url The URL to that should be used to retrieve the `state` and `code` values. Defaults to `window.location.href` if not given.
   */
  handleRedirectCallback: (url?: string) => Promise<void>;
}

const stub = (): never => {
  throw new Error("You forgot to wrap your component in <Auth0Provider>.");
};

export const initialContext = {
  ...initialAuthState,
  buildAuthorizeUrl: stub,
  buildLogoutUrl: stub,
  getAccessToken: stub,
  login: stub,
  logout: stub,
  handleRedirectCallback: stub,
};
