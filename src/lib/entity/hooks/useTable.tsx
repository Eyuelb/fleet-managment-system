import { useContext } from 'react';
import { EntityContext } from '../contexts';
import { useDeepMemo } from './useDeepMemo';
import { Table } from '../model';
import { MRT_RowData } from 'mantine-react-table';

export const useTable = <TData extends MRT_RowData ,> () => {
  const context = useContext(EntityContext);
  if (!context) {
    throw new Error('Must be used within a EntityProvider');
  }

  return useDeepMemo(() => context.table as Table<TData>, [context.table]);
};
