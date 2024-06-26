"use client";

import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import useStateKey from "../../../hooks/useStateKey";

interface DataTableContextType<T> {
  data: T[];
  setData: React.Dispatch<React.SetStateAction<T[]>>;
  dataTotalCount: number;
  setDataTotalCount: React.Dispatch<React.SetStateAction<number>>;
  rowSelection?: T[];
  setRowSelection: React.Dispatch<React.SetStateAction<T[]>>;
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  setPagination: React.Dispatch<
    React.SetStateAction<{
      pageIndex: number;
      pageSize: number;
    }>
  >;
  stateKey?: string;
  resetKey?: () => void;
}
const DataTableContext = createContext<DataTableContextType<any> | undefined>(
  undefined
);

export const useDataTableContext = <T,>() => {
  const context = useContext<DataTableContextType<T> | undefined>(
    DataTableContext
  );
  if (!context) {
    throw new Error(
      "useDataTableContext must be used within a DataTableProvider"
    );
  }
  return context;
};

export function DataTableProvider<T>({ children }: PropsWithChildren) {
  const { key, resetKey } = useStateKey();
  const [data, setData] = useState<T[]>([]);
  const [dataTotalCount, setDataTotalCount] = useState<number>(0);
  const [rowSelection, setRowSelection] = useState<T[]>([]);
  const [{ pageIndex, pageSize }, setPagination] = useState<{
    pageIndex: number;
    pageSize: number;
  }>({
    pageIndex: 1,
    pageSize: 10,
  });
  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );
  return (
    <DataTableContext.Provider
      value={{
        data,
        setData,
        dataTotalCount,
        setDataTotalCount,
        rowSelection,
        setRowSelection,
        pagination,
        setPagination,
        stateKey: key,
        resetKey,
      }}
    >
      {children}
    </DataTableContext.Provider>
  );
}
