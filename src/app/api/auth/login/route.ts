import { useRequestData } from "@hooks/useRequestData";
import { ApiRequestContext } from "@models/request";
import tokenService from "@utils/token";
import { compare } from "bcrypt-ts";
import { users } from "@db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@db/index";

async function authenticateUser(email: string, password: string) {
  try {
    const result = await db.select().from(users).where(eq(users.email, email));
    if (result.length === 0) {
      throw new Error("Authentication Failed");
    }

    const passwordsMatch = await compare(password, result[0].password!);
    const usersData = {
      usersId: result[0].id,
    };
    if (passwordsMatch) {
      // Generate access token using the refresh token
      const access_token = await tokenService.createJWT(usersData, "access");
      const refresh_token = await tokenService.createJWT(usersData, "refresh");

      // Return users data along with tokens
      const authenticatedUser = {
        access_token,
        refresh_token,
      };
      return authenticatedUser;
    } else {
      throw new Error("Authentication Failed");
    }
  } catch (error) {
    console.log(error);

    throw new Error("Error on Authentication");
  }
}

// Export handlers
export const { POST } = {
  POST: async function (request: NextRequest, ctx: ApiRequestContext) {
    const body = (await useRequestData(request, ctx)).body as any;
    try {
      const auth = await authenticateUser(body.email, body.password);
      const res = NextResponse.json(auth);
      res.cookies.set("access_token", auth.access_token, {
        path: "/",
      });
      res.cookies.set("refresh_token", auth.refresh_token, {
        path: "/",
      });
      return res;
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { message: "Authentication Failed" },
        { status: 401 }
      );
    }
  },
};
