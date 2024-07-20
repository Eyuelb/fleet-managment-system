"use client";
import {
  QueryOptions,
  useQuery,
  keepPreviousData,
} from "@tanstack/react-query";
import { useEffect } from "react";
import { createSearchParams } from "@utils/helper";
import { get, post } from "../lib/http-request/services";
import { MethodType } from "../models/request";
import { QueryParams } from "@db/model";
import { notifications } from "@mantine/notifications";

interface SortStatusType {
  columnAccessor: string;
  direction: string;
}
interface QueryRequestProps<T> extends QueryOptions {
  url: string;
  method?: MethodType;
  dataType?: "paginated" | "un-paginated" | undefined;
  queryParams?: {
    [key: string]: any;
  };
  params?: {
    [key: string]: any;
  };
  placeholder?: T;
  enabled?: boolean;
  setData?: React.Dispatch<React.SetStateAction<any>>;
  setPageSize?: (value: React.SetStateAction<number>) => void;
  pagination?: {
    pageIndex: number;
    pageSize: number;
  };
  setPagination?: (
    value: React.SetStateAction<{
      pageIndex: number;
      pageSize: number;
    }>
  ) => void;
  dataTotalCount?: number;
  setDataTotalCount?: React.Dispatch<React.SetStateAction<number>>;
  pageNumber?: number;
  pageSize?: number;
  sort?: string;
  sortStatus?: SortStatusType;
  refetchInterval?: number;
}

type PatinationData<T> = {
  content?: T;
  total?: number;
  offset?: number;
  limit?: number;
};
function useDynamicRequest<T>(props: QueryRequestProps<T>) {
  const {
    url: bUrl,
    method = "GET",
    dataType = "un-paginated",
    queryParams,
    params: bParams,
    placeholder = [],
    enabled,
    setData,
    setPageSize,
    setPagination,
    setDataTotalCount,
    sortStatus,
    pagination,
    refetchInterval,
    ...queryProps
  } = props;

  const pageNumber = pagination?.pageIndex ?? 1;
  const pageSize = pagination?.pageSize ?? 1;

  const params = createSearchParams({
    ...(dataType === "paginated"
      ? {
          q: JSON.stringify({
            ...queryParams,
            offset: pageNumber - 1,
            limit: pageSize,
          }),
        }
      : {
          q: JSON.stringify(queryParams),
        }),
    ...bParams,
  });
  const url = params ? `${bUrl}?${params}` : `${bUrl}`;
  const paginatedQuery = dataType === "paginated" ? [pageNumber, pageSize] : [];

  const query = useQuery({
    queryKey: [...(queryProps.queryKey ?? []), ...paginatedQuery],
    queryFn: async () => {
      switch (method) {
        case "GET":
          return await get<any>(url);
        case "POST":
          return await post<any, any>(url);
        default:
          return await get<any>(url);
      }
    },
    placeholderData: keepPreviousData,
    enabled,
    refetchInterval: refetchInterval, //
  });

  useEffect(() => {
    if (dataType === "paginated") {
      if (query.data) {
        const data = query.data as PatinationData<T>;
        console.log(data.content);
        data.content && setData && setData(data.content);
        data.total && setDataTotalCount && setDataTotalCount(data.total);
      }
    }
    if (dataType === "un-paginated") {
      if (query.data && Array.isArray(query.data)) {
        setData && setData(query.data);
        setPageSize && setPageSize(query.data.length);
      }
    }
    return () => {};
  }, [query.data]);
  useEffect(() => {
    if (query.isError) {
      notifications.show({
        color: "red",
        message: query.error.message,
      });
    }
    return () => {};
  }, [query.isError, query.error]);
  return {
    ...query,
    data: query.data ? (query.data as T) : (placeholder as T),
  };
}

export default useDynamicRequest;
