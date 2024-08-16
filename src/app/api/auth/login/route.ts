import { ApiRequestContext } from "@models/request";
import tokenService from "@utils/token";
import { compare } from "bcrypt-ts";
import { users } from "@db/schema";
import { eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@db/index";
import { setCookieSession } from "@lib/auth/auth.service";
import { SchemaType } from "@db/model";

// Export handlers
export const { POST } = {
  POST: async function (request: NextRequest, ctx: ApiRequestContext) {
    const body = await request.json();
    try {
      if (!body.email || !body.password) {
        return NextResponse.json(
          { message: "Invalid Request" },
          { status: 401 }
        );
      }
      const { rows } = await db.execute(
        sql.raw(`
          SELECT users.id, users.name, users.email, users.refresh_token, users.access_token, users.password, users.image, users.created_by, users.updated_by, json_build_object(
            'id', roles.id,
            'name', roles.name,
            'description', roles.description,
            'resources', roles.resources
          ) AS role
          FROM users
          LEFT JOIN roles ON users.role::text = roles.id::text
          WHERE users.email = '${body.email}'
        `)
      );

      if (rows.length === 0) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        );
      }

      // Access the first row
      const user = rows[0] as any;
      const passwordsMatch = await compare(body.password, user.password!);
      if (!passwordsMatch) {
        return NextResponse.json(
          { message: "Invalid Credentials" },
          { status: 401 }
        );
      }

      const usersData = {
        usersId: user.id,
      };
      const usersInfo = {
        usersId: user.id,
        ...user,
      };

      // Generate access and refresh tokens
      const access_token = await tokenService.createJWT(usersInfo, "access");
      const refresh_token = await tokenService.createJWT(usersData, "refresh");

      // Return users data along with tokens
      const authenticatedUser = {
        access_token,
        refresh_token,
      };

      const session = {
        token: authenticatedUser,
        user: usersInfo,
        account: usersInfo,
      };
      console.log(usersInfo);

      await setCookieSession(session);

      const res = NextResponse.json(session);
      return res;
    } catch (error) {
      console.error("Authentication error:", error);
      return NextResponse.json(
        { message: "Authentication Failed" },
        { status: 500 }
      );
    }
  },
};
