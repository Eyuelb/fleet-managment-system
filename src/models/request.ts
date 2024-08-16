import { Session } from "@lib/auth/auth.model";
import { NextRequest } from "next/server";

export type MethodType = "GET" | "POST" | "PUT" | "DELETE";

export interface ApiRequestContext {
  params: {
    slug?: string[];
  };
  session: Session | undefined;
}
