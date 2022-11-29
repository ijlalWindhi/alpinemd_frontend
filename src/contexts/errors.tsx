export class OAuthError extends Error {
  constructor(public error: string, public error_description?: string) {
    super(error_description || error);

    // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, OAuthError.prototype);
  }
}
