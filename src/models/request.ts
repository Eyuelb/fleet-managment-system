import { Session } from "@supabase/supabase-js";
import { NextRequest } from "next/server";

export type MethodType = "GET" | "POST" | "PUT" | "DELETE";

export interface ApiRequestContext {
  params: {
    slug?: string[];
  };
  session: Session | undefined;
}
