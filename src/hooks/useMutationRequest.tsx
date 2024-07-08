
"use client"
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { get, post, update, remove } from "@lib/http-request/services";
import showNotification from "@lib/notification";
import { createSearchParams } from "@utils/helper";
import { MethodType } from "@models/request";
import { getQueryClient } from "../providers/ReactQueryClientProvider";

interface MutationRequestProps<T, Args = any>
  extends UseMutationOptions<T, any, Args> {
  url: string;
  method?: MethodType;
  params?: {
    [key: string]: any;
  };
  dataType?: "paginated" | "un-paginated" | undefined;
  placeholder?: T;
  enabled?: boolean;
  massage?: {
    success?: string;
    error?: string;
  };
  queryKey?: string[];
}
function useMutationRequest<T, Args>(props: MutationRequestProps<T, Args>) {
  const {
    url: bUrl,
    method = "Post",
    params: bParams,
    placeholder = [],
    enabled,
    massage = {
      success: "Success",
      error: "Error",
    },
    dataType = "un-paginated",
    queryKey,
    onSuccess,
    onError,
  } = props;
  const params = createSearchParams({
    ...bParams,
  });
  const url = params ? `${bUrl}?${params}` : `${bUrl}`;
  const key = queryKey ?? [url];
  const query = useMutation({
    mutationKey: key,
    mutationFn: async (body?: Args) => {
      switch (method) {
        case "GET":
          return await get<any>(url);
        case "POST":
          return await post<T, Args>(url, body);
        case "PUT":
          return await update<T, Args>(url, body); // Replace '' with the appropriate endpoint
        case "DELETE":
          return await remove<T>(url); // Replace '' with the appropriate endpoint
        default:
          throw new Error(`Invalid queryType: ${method}`);
      }
    },
    onSuccess: async (data: T, variables: Args, context) => {
      showNotification({
        withBorder: true,
        type: "success",
        message: massage?.success ?? "",
      });
      await getQueryClient.invalidateQueries({
        queryKey: key,
      });
      onSuccess && onSuccess(data, variables, context);
    },
    onError: (error: any, variables: Args, context) => {
      showNotification({
        withBorder: true,
        type: "error",
        message: error.message ? error.message : massage?.error ?? "",
      }),
        onError && onError(error, variables, context);
    },
  });

  return { ...query, data: query.data ? query.data : placeholder };
}

export default useMutationRequest;
