import { useApiService } from "@hooks/useApiServices";
import { ApiRequestContext } from "@models/request";
import { NextRequest, NextResponse } from "next/server";
import { useRequestData } from "@hooks/useRequestData";
import logger from "@utils/logger";
import apiWrapper from "@utils/api/apiWrapper";

export const { GET, POST, PUT, DELETE } = {
  GET: apiWrapper(async function (request: NextRequest, ctx: ApiRequestContext) {
    const { id, resource, query ,session} = await useRequestData(request, ctx);
    const { getById, getAll, getByQuery } = await useApiService(resource,session);
    try {
      if (query) {
        const result = await getByQuery(query);
        if (!result) {
          return NextResponse.json(
            { error: "Data Not Found!" },
            { status: 404 }
          );
        }
        return NextResponse.json(result, { status: 200 });
      }
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
      logger.error(error);
      return NextResponse.json(
        { error: "Failed to fetch data" },
        { status: 500 }
      );
    }
  }, { withAuth: true }), // Example with authentication required
  POST: apiWrapper(async function (request: NextRequest, ctx: ApiRequestContext) {
    const { body, resource ,session} = await useRequestData(request, ctx);
    const { insert, insertSchema } = await useApiService(resource,session);

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
      return NextResponse.json(result[0], { status: 201 });
    } catch (error) {
      logger.error(error);
      return NextResponse.json(
        { error: "Failed to create data" },
        { status: 500 }
      );
    }
  }, { withAuth: true }), // Example with authentication required
  PUT: apiWrapper(async function (request: NextRequest, ctx: ApiRequestContext) {
    const { id, body, resource ,session} = await useRequestData(request, ctx);
    const { update, insertSchema } = await useApiService(resource,session);

    try {
      console.log({id,body})
      if (!id || !body) throw new Error('Error on id or body');

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
      logger.error(error);
      return NextResponse.json(
        { error: "Failed to update data",errors:error },
        { status: 500 }
      );
    }
  }, { withAuth: true }), // Example with authentication required
  DELETE: apiWrapper(async function (request: NextRequest, ctx: ApiRequestContext) {
    const { id, resource ,session} = await useRequestData(request, ctx);
    const { remove } = await useApiService(resource,session);
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
      logger.error(error);
      return NextResponse.json(
        { error: "Failed to delete data" },
        { status: 500 }
      );
    }
  }, { withAuth: true }), // Example with authentication required
};
