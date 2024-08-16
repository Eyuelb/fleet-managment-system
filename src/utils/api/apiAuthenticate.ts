import { getSession } from "@lib/auth/auth.service";
import { NextRequest, NextResponse } from "next/server";

/**
 * Use this method on api routes to check if user is authenticated and having required permissions.
 * This method can only be used from the server side.
 * Member permission is mandatory whenever orgSlug/projectRef query param exists
 * @param {NextRequest}    req
 * @param {Object}            config      requireUserDetail: bool, requireOwner: bool
 *
 * @returns {Object<user, error, description>}
 *   user null, with error and description if not authenticated or not enough permissions
 */
export async function apiAuthenticate(req: NextRequest) {
  if (!req) {
    return { error: new Error("Request is not available") };
  }

  try {
    const user = await getSession();
    if (!user) {
      throw new Error("The user does not have permission");
    }
    return user;
  } catch (error: any) {
    console.error("Error at apiAuthenticate", error);
    throw new Error(error.message ?? "unknown");
  }
}

