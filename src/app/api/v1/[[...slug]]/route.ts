import { useApiService } from "@hooks/useApiServices";
import { ApiRequestContext } from "@models/request";
import { NextRequest, NextResponse } from "next/server";
import { useRequestData } from "@hooks/useRequestData";
import logger from "@utils/logger";

export const { GET, POST, PUT, DELETE } = {
  GET: async function (request: NextRequest, ctx: ApiRequestContext) {
    const { id, resource } = await useRequestData(request, ctx);
    const { getById, getAll } = useApiService(resource);
    try {
      if (id) {
        const result = await getById(id);
        if (!result || result.length === 0) {
          return NextResponse.json(
            { error: "Data Not Found!" },
            { status: 404 }
          );
        }
        return NextResponse.json(result[0], { status: 200 });
      }
      const result = await getAll();
      return NextResponse.json(result, { status: 200 });
    } catch (error) {
      logger.error(error)
      return NextResponse.json(
        { error: "Failed to fetch data" },
        { status: 500 }
      );
    }
  },
  POST: async function (request: Request, ctx: ApiRequestContext) {
    const { body, resource } = await useRequestData(request, ctx);
    const { insert, insertSchema } = useApiService(resource);

    try {
      const validation = insertSchema.omit({ id: true }).safeParse(body);
      if (!validation.success) {
        return NextResponse.json(
          { error: validation.error.errors },
          { status: 400 }
        );
      }
      const result = await insert(validation.data);
      if (!result || result.length === 0) {
        return NextResponse.json(
          { error: "Data Not Created!" },
          { status: 404 }
        );
      }
      return NextResponse.json(result[0], { status: 200 });
    } catch (error) {
      logger.error(error)
      return NextResponse.json(
        { error: "Failed to create data" },
        { status: 500 }
      );
    }
  },
  PUT: async function (request: Request, ctx: ApiRequestContext) {
    const { id, body, resource } = await useRequestData(request, ctx);
    const { update, insertSchema } = useApiService(resource);

    try {
      if (!id || !body) throw new Error();

      const validation = insertSchema.safeParse({
        ...(body as any),
        id,
      });
      if (!validation.success) {
        return NextResponse.json(
          { error: validation.error.errors },
          { status: 400 }
        );
      }
      const result = await update(validation.data, id);
      if (!result) {
        return NextResponse.json({ error: "Data Not Found!" }, { status: 404 });
      }
      return NextResponse.json(result, { status: 200 });
    } catch (error) {
      logger.error(error)
      return NextResponse.json(
        { error: "Failed to fetch data" },
        { status: 500 }
      );
    }
  },
  DELETE: async function (request: Request, ctx: ApiRequestContext) {
    const { id, resource } = await useRequestData(request, ctx);
    const { remove } = useApiService(resource);
    try {
      if (!id) throw new Error();
      const result = await remove(id);
      if (!result) {
        return NextResponse.json({ error: "Data Not Found!" }, { status: 404 });
      }
      return NextResponse.json(
        { message: "Data deleted successfully" },
        { status: 200 }
      );
    } catch (error) {
      logger.error(error)
      return NextResponse.json(
        { error: "Failed to fetch data" },
        { status: 500 }
      );
    }
  },
};
