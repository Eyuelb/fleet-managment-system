'use client'
import { QueryClient } from '@tanstack/react-query';
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
      },
    },
  });
}
export const getQueryClient: QueryClient = makeQueryClient();

