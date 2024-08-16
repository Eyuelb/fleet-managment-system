import { ApiRequestContext } from "@models/request";
import { genSaltSync, hashSync } from "bcrypt-ts";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@db/index";
import { users } from "@db/schema";

// Export handlers
export const { POST } = {
  POST: async function (request: NextRequest, ctx: ApiRequestContext) {
    const body = await request.json();
    try {
      if (!body.email || !body.name || !body.role) {
        return NextResponse.json(
          { message: "Invalid Request" },
          { status: 401 }
        );
      }

      const salt = genSaltSync(10);
      const password = hashSync("123456", salt);
      const result = await db
        .insert(users)
        .values({
          name: body.name,
          email: body.email,
          password: password,
          role: body.role,
        })
        .returning({
          id: users.id,
        });

      const res = NextResponse.json(result);
      return res;
    } catch (error) {
      console.error("Registration error:", error);
      return NextResponse.json(
        { message: "Registration Failed" },
        { status: 500 }
      );
    }
  },
};
