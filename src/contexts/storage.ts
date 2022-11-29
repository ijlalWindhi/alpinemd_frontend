import * as Cookies from "es-cookie";

interface ClientStorageOptions {
  daysUntilExpire?: number;
  cookieDomain?: string;
}

/**
 * Defines a type that handles storage to/from a storage location
 */
export type ClientStorage = {
  get<T extends Object>(key: string): T | undefined;
  save(key: string, value: any, options?: ClientStorageOptions): void;
  remove(key: string, options?: ClientStorageOptions): void;
};

/**
 * A storage protocol for marshalling data to/from cookies
 */
export const CookieStorage = {
  get<T extends Object>(key: string) {
    const value = Cookies.get(key);

    if (typeof value === "undefined") {
      return;
    }

    return <T>JSON.parse(value);
  },

  save(key: string, value: any, options?: ClientStorageOptions): void {
    let cookieAttributes: Cookies.CookieAttributes = {};

    if ("https:" === window.location.protocol) {
      cookieAttributes = {
        secure: true,
        sameSite: "none",
      };
    }

    if (options?.daysUntilExpire) {
      cookieAttributes.expires = options.daysUntilExpire;
    }

    if (options?.cookieDomain) {
      cookieAttributes.domain = options.cookieDomain;
    }

    Cookies.set(key, JSON.stringify(value), cookieAttributes);
  },

  remove(key: string, options?: ClientStorageOptions) {
    let cookieAttributes: Cookies.CookieAttributes = {};

    if (options?.cookieDomain) {
      cookieAttributes.domain = options.cookieDomain;
    }

    Cookies.remove(key, cookieAttributes);
  },
} as ClientStorage;

/**
 * A storage protocol for marshalling data to/from session storage
 */
export const SessionStorage = {
  get<T extends Object>(key: string) {
    /* c8 ignore next 3 */
    if (typeof sessionStorage === "undefined") {
      return;
    }

    const value = sessionStorage.getItem(key);

    if (value == null) {
      return;
    }

    return <T>JSON.parse(value);
  },

  save(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  },

  remove(key: string) {
    sessionStorage.removeItem(key);
  },
} as ClientStorage;
