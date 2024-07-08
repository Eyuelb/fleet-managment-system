import { ApiRequestContext, MethodType } from "@models/request";
import { ApiResources } from "@models/resources";
import { resourcesConfig } from "../config/resources";
import { NextResponse } from "next/server";

type RequestData<TBody> = {
  resource: ApiResources;
  id: string | undefined;
  method: MethodType;
  body: TBody | undefined;
  operation:string | undefined;
};
export const useRequestData = async <TBody>(
  request: Request,
  ctx: ApiRequestContext
): Promise<RequestData<TBody>> => {
  if (ctx.params.slug && ctx.params.slug.length > 0) {
    const resource = (ctx.params.slug[0] as ApiResources) ?? undefined;
    const id = ctx.params.slug[1] ?? undefined;
    const method = request.method as MethodType;
    const operation = ctx.params.slug[2] ?? undefined;

    const body =
      method === "POST" ? ((await request.json()) as TBody) : undefined;

    if (!resourcesConfig.map((c) => c.path).includes(resource)) {
      throw NextResponse.json({ error: "Invalid resource!" }, { status: 400 });
    }
    return {
      resource,
      id,
      method,
      body,
      operation
    };
  }
  else if (ctx.params.slug){
    console.log(ctx.params.slug)
  }
  throw NextResponse.json({ error: "Invalid request!" }, { status: 400 });
};
