export interface RedirectLoginResult<TAppState = any> {
  /**
   * State stored when the redirect request was made
   */
  appState?: TAppState;
}

export interface AuthenticationResult {
  code?: string;
  error?: string;
  error_description?: string;
}

export interface AuthorizationParams {
  /**
   * Maximum allowable elapsed time (in seconds) since authentication.
   * If the last time the user authenticated is greater than this value,
   * the user must be reauthenticated.
   */
  max_age?: string | number;

  /**
   * The default scope to be used on authentication requests.
   *
   * This defaults to `profile email` if not set. If you are setting extra scopes and require
   * `profile` and `email` to be included then you must include them in the provided scope.
   *
   * Note: The `openid` scope is **always applied** regardless of this setting.
   */
  scope?: string;

  /**
   * The default audience to be used for requesting API access.
   */
  audience?: string;

  /**
   * The default URL where Auth0 will redirect your browser to with
   * the authentication result. It must be whitelisted in
   * the "Allowed Callback URLs" field in your Auth0 Application's
   * settings. If not provided here, it should be provided in the other
   * methods that provide authentication.
   */
  redirect_uri?: string;

  /**
   * If you need to send custom parameters to the Authorization Server,
   * make sure to use the original parameter name.
   */
  [key: string]: any;
}

interface BaseLoginOptions {
  /**
   * URL parameters that will be sent back to the Authorization Server. This can be known parameters
   * defined by Auth0 or custom parameters that you define.
   */
  authorizationParams?: AuthorizationParams;
}

export interface AuthClientOptions extends BaseLoginOptions {
  /**
   * Your authorization server domain.
   */
  domain: string;

  /**
   * The issuer to be used for validation of JWTs, optionally defaults to the domain above
   */
  issuer?: string;

  /**
   * The Client ID found on your Application settings page
   */
  clientId: string;

  /**
   * A maximum number of seconds to wait before declaring background calls to /authorize as failed for timeout
   * Defaults to 60s.
   */
  authorizeTimeoutInSeconds?: number;

  /**
   * Specify the timeout for HTTP calls using `fetch`. The default is 10 seconds.
   */
  httpTimeoutInSeconds?: number;

  /**
   * Number of days until the cookie `auth0.is.authenticated` will expire
   * Defaults to 1.
   */
  sessionCheckExpiryDays?: number;
}

export class User {
  name?: string;
  given_name?: string;
  family_name?: string;
  middle_name?: string;
  nickname?: string;
  preferred_username?: string;
  profile?: string;
  picture?: string;
  website?: string;
  email?: string;
  email_verified?: boolean;
  gender?: string;
  birthdate?: string;
  zoneinfo?: string;
  locale?: string;
  phone_number?: string;
  phone_number_verified?: boolean;
  address?: string;
  updated_at?: string;
  sub?: string;
  [key: string]: any;
}
