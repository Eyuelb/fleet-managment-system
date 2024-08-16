import { NextRequest, NextResponse } from "next/server";
import logger from "@utils/logger";
import { apiAuthenticate } from "./apiAuthenticate";
import { ApiRequestContext } from "@models/request";
import { Session } from "@lib/auth/auth.model";

// Define the type for the handler function
type Handler = (request: NextRequest, ctx: any) => Promise<NextResponse>;

// Define the type for the options
interface WrapperOptions {
  withAuth?: boolean;
}
type Response<T> =
  | T
  | {
      error: Error;
    }
  | {
      error: {
        message: any;
      };
    };
const apiWrapper = (handler: Handler, options?: WrapperOptions) => {
  return async (
    request: NextRequest,
    ctx: ApiRequestContext
  ): Promise<NextResponse> => {
    try {
      if (options?.withAuth) {
        // Assuming you have a function to get the user from the request
        const response = await apiAuthenticate(request);
        if (!isResponseOk(response)) {
          return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        ctx.session = response;
      }
      // Call the actual handler
      return await handler(request, ctx);
    } catch (error) {
      logger.error(error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  };
};

export default apiWrapper;

export function isResponseOk<T extends Session>(
  response: Response<T> | undefined
): response is T {
  return (
    response !== undefined &&
    response !== null &&
    !(
      typeof response === "object" &&
      "error" in response &&
      Boolean(response.error)
    )
  );
}
