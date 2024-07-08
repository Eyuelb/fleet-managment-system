import { get } from "@lib/http-request/services";
import { SignJWT, jwtVerify } from "jose";
import { NextRequest } from "next/server";
import { ErrorResponse } from "../api/response";
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY ?? "";
export const JWT_EXPIRES_IN = (60 * 60) as number;
export const JWT_REFRESH_EXPIRATION = (180 * 60) as number;

type TokenType = "access" | "refresh";

const now = () => Math.floor(Date.now() / 1000) | 0;

const tokenService = {
  isValid: async (token: string) => {
    function isTokenExpired(expirationTime: number): boolean {
      const nowInSeconds = now();
      return expirationTime <= nowInSeconds;
    }

    if (!token) return false;
    try {
      const secretKey = tokenService.getDerivedEncryptionKey();
      const { payload } = await jwtVerify(token, secretKey);
      if (payload.exp) {
        return !isTokenExpired(payload.exp); // Token is valid and not expired
      } else {
        return false; // Token is either expired or does not have expiration time
      }
    } catch (error) {
      return false;
    }
  },
  decode: async (token: string) => {
    if (!token) return null;
    try {
      const secretKey = tokenService.getDerivedEncryptionKey();
      const { payload } = await jwtVerify(token, secretKey);
      return payload;
    } catch (error) {
      throw error;
    }
  },
  createJWT: async (data: any, type: TokenType) => {
    const alg = "HS256";
    const accessTokenExpiration = now() + JWT_EXPIRES_IN;
    const refreshTokenExpiration = now() + JWT_REFRESH_EXPIRATION;

    try {
      const secretKey = tokenService.getDerivedEncryptionKey();
      const expiresIn: number =
        type === "access" ? accessTokenExpiration : refreshTokenExpiration;
      const payload = {
        ...data,
        iat: now(),
        exp: expiresIn,
      };
      const createdJWT = await new SignJWT(payload)
        .setProtectedHeader({ alg })
        .setJti(crypto.randomUUID())
        .sign(secretKey);
      return createdJWT;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  getDerivedEncryptionKey: () => {
    const secret = new TextEncoder().encode(JWT_SECRET_KEY.toString());
    return secret;
  },
  validateRequestMiddleware: async (
    req: NextRequest,
    ctx: any,
    next: () => Promise<void>
  ) => {
    const cookies_access_token = req.cookies.get("access_token");
    const cookies_refresh_token = req.cookies.get("refresh_token");

    if (!cookies_access_token) {
      return ErrorResponse(401, "Invalid Request Access Token is required");
    }
    if (!cookies_refresh_token) {
      return ErrorResponse(401, "Invalid Request Refresh Token is required");
    }
    const access_token_isValid = await tokenService.isValid(
      cookies_access_token.value
    );
    if (!access_token_isValid) {
      return ErrorResponse(403, "Access Token Is Expired");
    }
    const refresh_token_isValid = await tokenService.isValid(
      cookies_refresh_token.value
    );
    if (!refresh_token_isValid) {
      return ErrorResponse(401, "Refresh Token Is Expired");
    }
    return next();
  },
  getToken: async (req: NextRequest, type: TokenType) => {
    if (type === "access") {
      const cookies_token = req.cookies.get("access_token");
      if (cookies_token) {
        return cookies_token.value;
      }
    }
    if (type === "refresh") {
      const cookies_token = req.cookies.get("refresh_token");
      if (cookies_token) {
        return cookies_token.value;
      }
    }

    return null;
  },
  refreshTokenRequest: async () => {
    try {
      const res = await get<{ data: FormData }>("/auth/refresh-token");
      return res;
    } catch (error) {
      throw error;
    }
  },
};

export default tokenService;
