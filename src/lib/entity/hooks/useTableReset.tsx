import { useDataTableContext } from '@lib/data-table/contexts/table';
import { useMemoizedStateContext } from './useMemoizedStateContext';
import { useResource } from './useResource';
import { getQueryClient } from '../../../providers/ReactQueryClientProvider';

export const useTableReset = () => {
  const { setState } = useMemoizedStateContext();
  const { setPagination,resetKey } = useDataTableContext();
  const resource = useResource();

  const reset = () => {
    setPagination({
      pageIndex: 1,
      pageSize: 10,
    });
    setState(undefined);
    getQueryClient.invalidateQueries({
      queryKey: [resource],
    });
    resetKey&&resetKey()
  };

  return reset;
};
