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



interface SortStatusType {
  columnAccessor: string;
  direction: string;
}
interface QueryRequestProps<T> extends QueryOptions {
  url: string;
  method?: MethodType;
  dataType?: "paginated" | "un-paginated" | undefined;
  params?: {
    [key: string]: any;
  };
  placeholder?: T;
  enabled?: boolean;
  setData?: React.Dispatch<React.SetStateAction<T>>;
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
  totalElements?: number;
  number?: number;
  totalPages?: number;
  size?: number;
};
function useQueryRequest<T>(props: QueryRequestProps<T>) {
  const {
    url: bUrl,
    method = "GET",
    dataType = "un-paginated",
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
          page: (pageNumber - 1) as number,
          size: pageSize as number,
          sort: `id,${sortStatus?.direction ?? ""}`,
        }
      : {}),
    ...bParams,
  });
  const url = params ? `${bUrl}?${params}` : `${bUrl}`;
  const paginatedQuery = dataType === "paginated" ? [pageNumber, pageSize] : [];

  const query = useQuery({
    queryKey: [...(queryProps.queryKey ?? []), ...paginatedQuery],
    queryFn: async () => {
      switch (method) {
        case "GET":
          return await get<T>(url);
        case "POST":
          return await post<T, any>(url);
        default:
          return await get<T>(url);
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
        data.content && setData && setData(data.content);
        ///
        data.totalElements &&
          setDataTotalCount &&
          setDataTotalCount(data.totalElements);
        data.size && setPageSize && setPageSize(data.size);

        if (data.size && data.number && setPagination) {
          if (query.data)
            setPagination({
              pageIndex: data.number + 1,
              pageSize: data.size,
            });
        }
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

  return { ...query, data: query.data ? query.data : placeholder };
}

export default useQueryRequest;
