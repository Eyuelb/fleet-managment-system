import {
  MantineReactTable,
  MRT_RowSelectionState,
  useMantineReactTable,
  type MRT_ColumnDef,
  type MRT_RowData, //default shape of TData (Record<string, any>)
  type MRT_TableOptions,
} from "mantine-react-table";
import { getDefaultMRTOptions } from "./config/defaultMRTOptions";
import { useDataTableContext } from "./contexts/table";
import BottomToolbar from "./components/bottom-toolbar";
import { useCallback, useState } from "react";
import useRowSelect from "./hooks/useRowSelect";
import "mantine-react-table/styles.css"; //make sure MRT styles were imported in your app root (once)
import { useDeepMemo } from "../form-builder/hooks/useDeepMemo";

interface Props<TData extends MRT_RowData>
  extends Partial<MRT_TableOptions<TData>> {
  columns: MRT_ColumnDef<TData>[];
  isLoading: boolean;
  isRowSelectable?: boolean;
  renderActionToolBar?: React.ReactNode;
}

export const DataTable = <TData extends MRT_RowData>({
  columns,
  isLoading,
  renderActionToolBar,
  renderRowActions,
  isRowSelectable,
}: Props<TData>) => {
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
  const defaultMRTOptions = getDefaultMRTOptions<TData>(); //get your default options
  const { data, dataTotalCount } = useDataTableContext<TData>();
  const memoData = useDeepMemo(() => data, [data]);

  const table = useMantineReactTable({
    ...defaultMRTOptions,
    columns,
    data: memoData,
    state: {
      isLoading,
      rowSelection,
    },
    rowCount: dataTotalCount,
    renderTopToolbarCustomActions: useCallback(
      () => renderActionToolBar,
      [renderActionToolBar] //add proper dependencies here if needed
    ),
    renderBottomToolbar: useCallback(
      () => (
        <BottomToolbar
          clear={() => setRowSelection({})}
          selectedCount={Object.keys(rowSelection).length}
        />
      ),
      [rowSelection] //add proper dependencies here if needed
    ),
    renderRowActions,
    enableRowSelection: isRowSelectable,
    onRowSelectionChange: setRowSelection,
    getRowId: (originalRow) => originalRow.uuid,
  });
  const updated = useRowSelect(table.getSelectedRowModel());

  return <MantineReactTable table={table} />;
};
