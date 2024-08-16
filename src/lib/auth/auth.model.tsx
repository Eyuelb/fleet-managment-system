export type Session = {
  user: User | undefined;
  token: JWT | undefined;
  account: Account | undefined;
};

export type Account = {
  password: string | null;
  id: string;
  name: string;
  email: string;
  refresh_token: string | null;
  access_token: string | null;
  image: string | null;
  role: string | null;
};

export type User = {
  password: string | null;
  id: string;
  name: string;
  email: string;
  refresh_token: string | null;
  access_token: string | null;
  image: string | null;
  role: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string | null;
    updatedBy: string | null;
    description: string | null;
    resources: string[] | null;
} | null
};

export type Role = {
  name: string;
  readOnly: boolean;
  description: string;
  active: boolean;
  uuid: string;
  roleType: null;
};

export type UserLoginResponse = {
  userUUid: string;
  fullName: string;
  phoneNumber: string;
  organizationName: string;
  organizationUuid: string;
  roles:Role[];
  resources: string[];
  access_token: string;
  refresh_token: string;
};

export type UserLoginRequestDto = {
  phoneNumber: string;
  password: string;
};

export interface JWT {
  access_token: string;
  refresh_token: string;
}

export type AuthContextType = {
  session: Session;
  setSession: (data: Session) => void;
  signOut: () => Promise<void>
};

type Awaitable<T> = T | PromiseLike<T>;

export interface DefaultJWT extends Record<string, unknown> {
  name?: string | null;
  email?: string | null;
  picture?: string | null;
  sub?: string;
  iat?: number;
  exp?: number;
  jti?: string;
}

/**
 * Returned by the `jwt` callback and `getToken`, when using JWT sessions
 *
 * [`jwt` callback](https://next-auth.js.org/configuration/callbacks#jwt-callback) | [`getToken`](https://next-auth.js.org/tutorials/securing-pages-and-api-routes#using-gettoken)
 */
export interface JWT extends Record<string, unknown>, DefaultJWT {}

export interface JWTEncodeParams<Payload = JWT> {
  /**
   * The maximum age of the Auth.js issued JWT in seconds.
   *
   * @default 30 * 24 * 60 * 60 // 30 days
   */
  maxAge?: number;
  /** Used in combination with `secret`, to derive the encryption secret for JWTs. */
  salt: string;
  /** Used in combination with `salt`, to derive the encryption secret for JWTs. */
  secret: string;
  /** The JWT payload. */
  token?: Payload;
}

export interface JWTDecodeParams {
  /** Used in combination with `secret`, to derive the encryption secret for JWTs. */
  salt: string;
  /** Used in combination with `salt`, to derive the encryption secret for JWTs. */
  secret: string;
  /** The Auth.js issued JWT to be decoded */
  token?: string;
}

export interface JWTOptions {
  /**
   * The secret used to encode/decode the Auth.js issued JWT.
   * @internal
   */
  secret: string;
  /**
   * The maximum age of the Auth.js issued JWT in seconds.
   *
   * @default 30 * 24 * 60 * 60 // 30 days
   */
  maxAge: number;
  /** Override this method to control the Auth.js issued JWT encoding. */
  encode: (params: JWTEncodeParams) => Awaitable<string>;
  /** Override this method to control the Auth.js issued JWT decoding. */
  decode: (params: JWTDecodeParams) => Awaitable<JWT | null>;
}
