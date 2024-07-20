import { queryBuilder } from "@db/manage";
import { ApiRequestContext } from "@models/request";
import logger from "@utils/logger";
import { NextRequest, NextResponse } from "next/server";

export const { GET } = {
  GET: async function (request: NextRequest, ctx: ApiRequestContext) {
    try {
      const result = await queryBuilder("users")
        .select(["id", "name"])
        .where([
          {
            column: "role",
            operator: 'ILIKE',
            value: "ec0d77af-30f9-4b87-9d02-ceaeef20f259",
          },
        ])
        .build();
      return NextResponse.json(result, { status: 200 });
    } catch (error) {
      logger.error(error);
      return NextResponse.json(
        { error: "Failed to fetch data" },
        { status: 500 }
      );
    }
  },
};
