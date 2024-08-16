import { ApiRequestContext } from "@models/request";
import { compareSync, genSaltSync, hashSync } from "bcrypt-ts";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@db/index";
import { users } from "@db/schema";
import { eq } from "drizzle-orm";

// Export handlers
export const { POST } = {
  POST: async function (request: NextRequest, ctx: ApiRequestContext) {
    const body = await request.json();
    try {
      const { userId, oldPassword, newPassword } = body;

      // Validate the input
      if (!userId || !oldPassword || !newPassword) {
        return NextResponse.json(
          { message: "Invalid Request" },
          { status: 400 }
        );
      }

      // Fetch the user from the database
      const user = await db.query.users.findFirst({
        where: eq(users.id, userId),
      });

      if (!user || !user.password) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        );
      }

      // Check if the previous password matches
      const isPasswordValid = compareSync(oldPassword, user.password);
      if (!isPasswordValid) {
        return NextResponse.json(
          { message: "Previous password is incorrect" },
          { status: 401 }
        );
      }

      // Hash the new password
      const salt = genSaltSync(10);
      const hashedNewPassword = hashSync(newPassword, salt);

      // Update the user's password in the database
      await db
        .update(users)
        .set({
          password: hashedNewPassword,
        })
        .where(eq(users.id, userId));

      return NextResponse.json({ message: "Password updated successfully" });
    } catch (error) {
      console.error("Change password error:", error);
      return NextResponse.json(
        { message: "Change Password Failed" },
        { status: 500 }
      );
    }
  },
};
