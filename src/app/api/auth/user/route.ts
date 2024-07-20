import { listUsers } from "@lib/supabase/auth/actions";
import createClient from "@lib/supabase/server";
import { ApiRequestContext } from "@models/request";
import logger from "@utils/logger";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const { GET } = {
  GET: async function (request: NextRequest, ctx: ApiRequestContext) {
    try {
      const cookieStore = cookies();
      const supabase = createClient({ cookieStore, isAdmin: true })
      const result = await supabase.auth.admin.listUsers()
      return NextResponse.json({result}, { status: 200 });
    } catch (error) {
      logger.error(error);
      return NextResponse.json(
        { error: "Failed to fetch data" },
        { status: 500 }
      );
    }
  },
};
