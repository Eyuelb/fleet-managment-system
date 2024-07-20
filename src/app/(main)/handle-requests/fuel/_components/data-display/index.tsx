"use client";
import SelectFromDataSource from "@components/data-source-select";
import useDynamicRequest from "@hooks/useDynamicRequest";
import { DataTable } from "@lib/data-table";
import { useDataTableContext } from "@lib/data-table/contexts/table";
import {
  ActionIcon,
  Flex,
  Group,
  Select,
  UnstyledButton,
} from "@mantine/core";
import {
  generateQueryParams,
  getCustomDataSource,
  getDataSource,
  getDataSourceQuery,
  getSchemaColumns,
} from "@utils/helper";
import React, { useMemo } from "react";
import { filterFieldProps } from "../../../../../../config/component";
import { useSearchParamsShallow } from "@hooks/useSearchParamsShallow";
import { requestStatus } from "@db/schema";
import { ColumnsType } from "@db/model";
import StatusBadge from "@lib/data-table/components/status-badge";
import Link from "next/link";
import { iconDefaultProps } from "@/config/icon";
import { IconEye } from "@tabler/icons-react";
const resource = "fuelRequest";
const DataDisplay = () => {
  const { get, register, isLoaded, isEmpty, reset } = useSearchParamsShallow();
  const { rowSelection, ...tableState } = useDataTableContext();
  const queryParams = generateQueryParams({
    model: 'fuelRequest',
    select: [
      "id",
      "driver",
      "vehicle",
      "fuelType",
      "status",
    ],
    where: [
      {
        column: "vehicle",
        operator: "ILIKE",
        value: get("vehicle"),
      },
      {
        column: "driver",
        operator: "ILIKE",
        value: get("driver"),
      },
      {
        column: "status",
        operator: "EQ",
        value: get("status"),
      },
    ],
    orderBy: {
      by: ["id"],
      direction: ["ASC"],
    },
  });
  const { isLoading, isFetching } = useDynamicRequest<{
    content: ColumnsType<"fuelRequest">[];
  }>({
    ...getDataSourceQuery("fuelRequest",[queryParams]),
    queryKey: [resource, "list", queryParams],
    queryParams: queryParams,
    dataType: "paginated",
    ...tableState,
    placeholder: { content: [] },
    enabled: isLoaded,
  });
  const columns = useMemo(
    () => [
      ...getSchemaColumns("fuelRequest", queryParams.select,['status','id']),
      {
        accessorKey: "status",
        header: "Status",
        Cell: ({ row }: any) => (
          <StatusBadge
            data={[
              { value: "Approved", label: "Approved", color: "green" },
              { value: "Submitted", label: "Pending", color: "orange" },
              { value: "Rejected", label: "Rejected", color: "red" },
            ]}
            value={row.original.status ?? ""}
          />
        ),
      },
      {
        header: "Actions",
        accessorKey: "id",
        Cell: ({ row }: any) => (
          <ActionIcon
            variant="light"
            component={Link}
            href={`/handle-requests/fuel/${row.original.id}`}
          >
            <IconEye {...iconDefaultProps} />
          </ActionIcon>
        ),
      },
    ],
    [queryParams.select]
  );
  return (
    <div className="relative min-h-screen">
      <Flex className="items-end justify-end py-4 gap-4">
        <Group wrap="nowrap">
          <SelectFromDataSource
            {...filterFieldProps}
            label="Filter by Driver"
            {...register("driver")}
            dataSource={getCustomDataSource("drivers", "name", "name")}
            clearable
          />
          <SelectFromDataSource
            {...filterFieldProps}
            label="Filter by Vehicle"
            {...register("vehicle")}
            dataSource={getDataSource("vehicles", "name", "name")}
            clearable
          />
          <Select
            {...filterFieldProps}
            label="Filter by Status"
            miw={120}
            placeholder="select"
            {...register("status")}
            data={requestStatus.enumValues}
            clearable
          />
        </Group>
        {!isEmpty && (
          <UnstyledButton
            className=" text-xs border rounded-xl px-3 flex items-center shadow-sm"
            bg={"var(--card)"}
            variant="primary"
            onClick={() => reset()}
          >
            <span className="mr-1">x</span>
            <span>Reset</span>
          </UnstyledButton>
        )}
      </Flex>
      <DataTable columns={columns} isLoading={isLoading || isFetching}/>

    </div>
  );
};

export default DataDisplay;
