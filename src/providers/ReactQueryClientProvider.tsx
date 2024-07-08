"use client";
import React, { useMemo } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { get } from "@lib/http-request/services";
const defaultQueryFn = async ({ queryKey }: { queryKey: any }) => {
  const res = await get(queryKey.join());
  return res;
};
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: false,
        retry: false,
        retryDelay: 15000,
        staleTime: 5 * 60 * 1000,
        queryFn: defaultQueryFn,

      },
    },
  });
}
export const getQueryClient: QueryClient = makeQueryClient();

function ReactQueryProvider({ children }: React.PropsWithChildren) {
  const queryClient = useMemo(() => getQueryClient, [getQueryClient]);
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default ReactQueryProvider;
