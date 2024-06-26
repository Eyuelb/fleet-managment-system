import { MRT_RowData, MRT_RowModel } from "mantine-react-table";
import { useState, useEffect } from "react";
import { useDataTableContext } from "../contexts/table";
import { useDeepMemo } from "../../form-builder/hooks/useDeepMemo";
interface DataState<T> {
  [page: number]: T[];
}

const useRowSelect = <T extends MRT_RowData>(rowModel: MRT_RowModel<T>) => {
  const [selected, setSelected] = useState<DataState<T>>({});
  const { setRowSelection, pagination } = useDataTableContext<T>();

  const data = useDeepMemo(
    () => rowModel.flatRows.map((row) => row.original),
    [rowModel]
  );
  const combined = useDeepMemo(
    () => Object.values(selected).reduce((acc, arr) => [...acc, ...arr], []),
    [selected]
  );
  useEffect(() => {
    if (data.length > 0) {
      setSelected((prevData) => ({
        ...prevData,
        [pagination.pageIndex]: data,
      }));
    }
    return () => {};
  }, [data]);

  useEffect(() => {
    setRowSelection(combined);
    console.log(combined);
    return () => {};
  }, [combined]);
};

export default useRowSelect;
