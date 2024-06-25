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
  GET: async function (req: NextRequest, ctx: RequestContext) {
    try {
      console.log(req)
      // const { page, pageSize, where, orderBy } = req.;

      // // Convert query params to appropriate types
      // const pageNumber = page ? parseInt(page as string, 10) : undefined;
      // const pageSizeNumber = pageSize ? parseInt(pageSize as string, 10) : undefined;
      // return NextResponse.json({ get: "get" });
    } catch (err) {}
  },
  POST: async function (req: Request, ctx: RequestContext) {
    return NextResponse.json({ post: "post" });
  },
};
