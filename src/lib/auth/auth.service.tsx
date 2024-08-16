"use server";
import logger from "@utils/logger";
import { AUTH_SESSION_KEY, BaseUrl, sessionExpiresOn } from "./auth.consts";
import { Session, JWT } from "./auth.model";
import { cookies } from "next/headers";
export async function checkSession(session: JWT) {
  if (session) {
    // const currentTimestamp = Math.floor(Date.now() / 1000);
    // if (session.exp > currentTimestamp) {
    //     logger.log("expired")
    // }
    logger.log("safe", session);
  }
}
export async function clearCookieSession() {
  cookies().delete(AUTH_SESSION_KEY);
}

export async function logout() {
  const cookieStore = cookies();
  cookieStore.getAll().forEach((cookie) => {
    cookieStore.delete(cookie.name);
  });
}
export async function setCookieSession(session: Session) {
  const expires = new Date();
  expires.setHours(expires.getHours() + 4); // Set the expiration time to 2 minutes from now
  cookies().set({
    name: AUTH_SESSION_KEY,
    value: JSON.stringify(session),
    httpOnly: true,
    path: "/",
    expires
  });
}
export async function getSession() {
  const c = cookies();
  const session = c.get(AUTH_SESSION_KEY)?.value;
  if (session) {
    return JSON.parse(session) as Session;
  }
  return undefined;
}
export async function getAccessSession() {
  const c = cookies();
  const session = c.get(AUTH_SESSION_KEY)?.value;
  if (session) {
    return JSON.parse(session) as JWT;
  }
  return undefined;
}
export async function getUser(data?: JWT) {
  return {};
}
