import { ApiRequestContext, MethodType } from "@models/request";
import { ApiResources } from "@models/resources";
import { resourcesConfig } from "../config/resources";
import { NextRequest, NextResponse } from "next/server";
import { parseUrlParams } from "@utils/helper";
import { QueryParams } from "@db/model";
import { Session } from "@lib/auth/auth.model";

type RequestData<TBody> = {
  resource: ApiResources;
  id: string | undefined;
  method: MethodType;
  body: TBody | undefined;
  operation: string | undefined;
  params: {
    [k: string]: string;
  };
  query: QueryParams<any> | undefined;
  session: Session | undefined;
};
export const useRequestData = async <TBody>(
  request: NextRequest,
  ctx: ApiRequestContext
): Promise<RequestData<TBody>> => {
  try {
    if (ctx.params.slug && ctx.params.slug.length > 0) {
      const resource = (ctx.params?.slug[0] as ApiResources) ?? undefined;
      const id = ctx.params?.slug[1] ?? undefined;
      const method = request.method as MethodType;
      const operation = ctx.params.slug[2] ?? undefined;
      const session = ctx.session;
      const params = Object.fromEntries(request.nextUrl.searchParams.entries());
      const query = params?.q
        ? (parseUrlParams(params?.q) as QueryParams<any>)
        : undefined;
      const body =
        method === "POST" || method === "PUT" ? ((await request.json()) as TBody) : undefined;

      if (!resourcesConfig.map((c) => c.path).includes(resource)) {
        throw Error("Invalid resource!");
      }
      return {
        resource,
        id,
        method,
        body,
        operation,
        params,
        query,
        session
      };
    } else if (ctx?.params?.slug) {
       console.log(ctx.params?.slug);
    }
    throw Error("Invalid request!");
  } catch (error: any) {
    throw Error(error.message);
  }
};
