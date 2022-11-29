import { OAuthError } from "./errors";
import { AuthenticationResult } from "./globals";

const CODE_RE = /[?&]code=[^&]+/;
const STATE_RE = /[?&]state=[^&]+/;
const ERROR_RE = /[?&]error=[^&]+/;

export const hasAuthParams = (searchParams = window.location.href): boolean =>
  (CODE_RE.test(searchParams) || ERROR_RE.test(searchParams));

const normalizeErrorFn =
  (fallbackMessage: string) =>
  (
    error: Error | { error: string; error_description?: string } | ProgressEvent
  ): Error => {
    if ("error" in error) {
      return new OAuthError(error.error, error.error_description);
    }
    if (error instanceof Error) {
      return error;
    }
    return new Error(fallbackMessage);
  };

export const loginError = normalizeErrorFn("Login failed");

export const tokenError = normalizeErrorFn("Get access token failed");

export const formEncode = (payload: { [key: string]: any; }) => {
  return Object.entries(payload)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join("&");
}

export const parseQueryResult = (queryString: string): AuthenticationResult => {
  if (queryString.indexOf("#") > -1) {
    queryString = queryString.substr(0, queryString.indexOf("#"));
  }

  const queryParams = queryString.split("&");
  const parsedQuery: Record<string, any> = {};

  queryParams.forEach((qp) => {
    const [key, val] = qp.split("=");
    parsedQuery[key] = decodeURIComponent(val);
  });

  if (parsedQuery.expires_in) {
    parsedQuery.expires_in = parseInt(parsedQuery.expires_in);
  }

  return parsedQuery as AuthenticationResult;
};
