import {
  createContext,
  useEffect,
  useCallback,
  useContext,
  useReducer,
  useRef,
  useMemo,
} from "react";
import React from "react";
import jwt_decode from "jwt-decode";

import { AuthContextInterface, initialContext } from "./auth-context";
import { initialAuthState } from "./auth-state";
import { formEncode, hasAuthParams, loginError, parseQueryResult, tokenError } from "./utils";
import { RedirectLoginResult, User } from "./globals";
import { reducer } from "./reducer";

interface AuthProviderOptions {
  children?: React.ReactNode;
  domain: string;
  tenant: string;
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  audience: string;
  scope: string;
}

const AuthContext = createContext<AuthContextInterface>(initialContext);

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider(options: AuthProviderOptions) {
  const didInitialize = useRef(false);
  const [state, dispatch] = useReducer(reducer, initialAuthState);

  const buildAuthorizeUrl = useCallback(async () => {
    return `${options.domain}/${options.tenant}/authorize`
    + `?client_id=${encodeURIComponent(options.clientId)}`
    + `&redirect_uri=${encodeURIComponent(options.redirectUri)}`
    + `&audience=${encodeURIComponent(options.audience)}`
    + `&scope=${encodeURIComponent(options.scope)}`;
  }, [options]);

  const login = useCallback(async () => {
    window.location.assign(await buildAuthorizeUrl());
  }, [options]);

  const _requestToken = useCallback(
    async (code: string) => {
      const authResult = await fetch(
        `${options.domain}/${options.tenant}/oauth/token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formEncode({
            code: code,
            grant_type: "authorization_code",
            client_id: options.clientId,
            client_secret: options.clientSecret,
            redirect_uri: options.redirectUri,
          }),
        }
      ).then((response) => response.json());

      if (!authResult) {
        throw new Error("Failed requesting token: unexpected response");
      }

      if (authResult.error) {
        throw new Error("Failed requesting token: grant error");
      }

      if (authResult.id_token || authResult.access_token) {
        authResult.decoded = {};
      }

      if (authResult.id_token) {
        authResult.decoded.id_token = jwt_decode(authResult.id_token);
      }

      if (authResult.access_token) {
        authResult.decoded.access_token = jwt_decode(authResult.access_token);
      }

      localStorage.setItem("domain", JSON.stringify(authResult));
      return authResult as RedirectLoginResult;
    },
    [options]
  );

  const handleRedirectCallback = useCallback(
    async (url: string = window.location.href) => {
      try {
        const queryStringFragments = url.split("?").slice(1);

        if (queryStringFragments.length === 0) {
          throw new Error("There are no query params available for parsing.");
        }

        const { code, error, error_description } = parseQueryResult(
          queryStringFragments.join("")
        );

        if (error) {
          throw new Error(`${error}: ${error_description}`);
        }

        if (code) {
          await _requestToken(code);
          return;
        }

        throw new Error("Failed to handle redirect callback: unknown error");
      } catch (error) {
        throw tokenError(error);
      } finally {
        dispatch({
          type: 'HANDLE_REDIRECT_COMPLETE',
          user: await getUser()
        })
      }
    },
    [options]
  );

  const getAccessToken = useCallback(async (): Promise<string | undefined> => {
    try {
      const tokens = JSON.parse(localStorage.getItem("domain") || "{}");

      if (tokens?.access_token) {
        return Promise.resolve(tokens.access_token);
      }

      return Promise.resolve(undefined);
    } catch (error) { 
      throw tokenError(error);
    } finally {
      dispatch({
        type: 'GET_ACCESS_TOKEN_COMPLETE',
        user: await getUser()
      });
    }
  }, [options]);

  const getUser = useCallback((): Promise<User | undefined> => {
    const tokens = JSON.parse(localStorage.getItem("domain") || "{}");

    if (tokens?.decoded?.id_token) {
      return Promise.resolve(tokens.decoded.id_token);
    }

    return Promise.resolve(undefined);
  }, [options]);

  const buildLogoutUrl = useCallback((): Promise<string> => {
    return Promise.reject("Not Implemented");
  }, [options]);

  const logout = useCallback((): Promise<void> => {
    localStorage.removeItem("domain");

    dispatch({
      type: 'LOGOUT'
    });

    return Promise.resolve();
  }, [options]);

  useEffect(() => {
    if (didInitialize.current) {
      return;
    }
    didInitialize.current = true;

    (async (): Promise<void> => {
      try {
        let user: User | undefined;

        if (hasAuthParams()) {
          await handleRedirectCallback();
        }

        user = await getUser();

        dispatch({ type: 'INITIALIZED', user });
      } catch (error) {
        dispatch({ type: 'ERROR', error: loginError(error) });
      }
    })();
  }, [options]);

  const contextValue = useMemo(() => {
    return {
      ...state,
      buildAuthorizeUrl,
      login,
      handleRedirectCallback,
      logout,
      getAccessToken,
      buildLogoutUrl,
    };
  }, [
    state,
    buildAuthorizeUrl,
    login,
    handleRedirectCallback,
    logout,
    getAccessToken,
    buildLogoutUrl,
  ]);

  return (
    <AuthContext.Provider value={contextValue}>
      {options.children}
    </AuthContext.Provider>
  );
}
