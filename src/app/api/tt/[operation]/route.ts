import { NextRequest, NextResponse } from "next/server";

interface Request extends NextRequest {
  state: {
    tableName: string;
  };
}
interface RequestContext {
  params: {
    operation?: string;
  };
}
export const { GET, POST } = {
  GET: async function (request: Request, ctx: RequestContext) {
    return NextResponse.json({ get: "get" });
  },
  POST: async function (request: Request, ctx: RequestContext) {
    return NextResponse.json({ post: "post" });
  },
};
