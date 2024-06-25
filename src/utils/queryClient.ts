import { QueryClient } from '@tanstack/react-query';

const getQueryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 5 * 1000 } },
});
export default getQueryClient;