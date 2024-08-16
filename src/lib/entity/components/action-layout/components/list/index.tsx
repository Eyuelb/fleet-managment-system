import React from "react";
import { useResource } from "../../../../hooks/useResource";
import { useDelete, useList } from "../../../../hooks/useRequest";
import { useTable } from "../../../../hooks/useTable";
import { NavToCreate } from "../../../page-layout/components/navigation-buttons";
import { useActions } from "../../../../hooks/useActions";
import { useIsLoading } from "../../../../hooks/useIsLoading";
import { useFilter } from "../../../../hooks/useFilter";
import { injectProperties } from "../../../../utils/helper";
import { useDeepMemo } from "../../../../hooks/useDeepMemo";
import { useMemoizedStateContext } from "@lib/entity/hooks/useMemoizedStateContext";
import {
  DataTableProvider,
  useDataTableContext,
} from "@lib/data-table/contexts/table";
import { DataTable } from "@lib/data-table";
import { MRT_ColumnDef, MRT_RowData } from "mantine-react-table";
import { MemoizedStateProvider } from "@lib/entity/provider";
import { DeleteButton, UpdateButton, ViewButton } from "../../../button";
import { FilterGenerator } from "../filter";
import useQueryRequest from "@hooks/useQueryRequest";

const ListComponent = <TData extends MRT_RowData>() => {
  const actions = useActions();
  const resource = useResource();
  const listQuery = useList();
  const deleteQuery = useDelete();
  const table = useTable<TData>();
  const isLoading = useIsLoading();
  const filter = useFilter();
  const filterValues = useMemoizedStateContext().state as any;
  const { rowSelection, ...tableState } = useDataTableContext<TData>();

  const columnAction = injectProperties<MRT_ColumnDef<TData>[]>(
    actions?.isDelete === true || actions?.isUpdate === true,
    [
      {
        accessorKey: table?.accessorKey ?? "uuid",
        header: "Actions",
        Cell: (data) => {
          const extraActionColumn = table?.columns?.find(
            (column) => column.header === "Action"
          )?.Cell;
          return (
            <div className="flex items-center gap-2">
              <ViewButton id={data.cell.renderValue() as number} />
              <UpdateButton id={data.cell.renderValue() as number} />
              <DeleteButton
                url={deleteQuery?.url(data.row.original)}
                method={deleteQuery?.method}
                queryKey={[resource ?? ""]}
                hidden={actions?.isDelete === false || !actions?.isDelete}
              />
              {extraActionColumn && extraActionColumn(data)}
            </div>
          );
        },
      },
    ],
    []
  );
  const col = injectProperties<MRT_ColumnDef<TData>[]>(
    !!table?.columns,
    table?.columns?.filter((r) => r.header !== "Action") ?? [],
    []
  );
  const columns = useDeepMemo(() => [...col, ...columnAction], []);

  
  const data = useQueryRequest<any>({
    ...listQuery,
    url: listQuery?.url() ?? "/",
    queryKey: [resource, "list", filterValues,listQuery?.params],
    ...tableState,
    params: {
      ...listQuery?.params,
      ...filterValues,
    },
    queryParams:{
      model: resource
    }
  });

  return (
    <div className="mb-10 w-full h-full">
      <div className="flex justify-end items-center pb-2">
        {filter?.fields && <FilterGenerator />}
        <div></div>
      </div>

      <DataTable
        columns={columns}
        // enableRowSelection={table?.configs?.enableRowSelection}
        isLoading={isLoading || data.isFetching}
        renderActionToolBar={<NavToCreate />}
      />
    </div>
  );
};

const ListPage = () => {
  return (
    <DataTableProvider>
      <MemoizedStateProvider>
        <ListComponent />
      </MemoizedStateProvider>
    </DataTableProvider>
  );
};

export default ListPage;
