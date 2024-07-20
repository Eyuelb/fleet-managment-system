"use client";
import SelectFromDataSource from "@components/data-source-select";
import useDynamicRequest from "@hooks/useDynamicRequest";
import { DataTable } from "@lib/data-table";
import { useDataTableContext } from "@lib/data-table/contexts/table";
import {
  Badge,
  Button,
  ButtonGroup,
  Flex,
  Group,
  LoadingOverlay,
  Select,
  UnstyledButton,
} from "@mantine/core";
import {
  generateQueryParams,
  getCustomDataSource,
  getDataSource,
  getDataSourceQuery,
  getSchemaColumns,
  updateStatus,
} from "@utils/helper";
import React, { useMemo } from "react";
import { filterFieldProps } from "../../../../../../config/component";
import { useSearchParamsShallow } from "@hooks/useSearchParamsShallow";
import { tripStatus } from "@db/schema";
import { CardList } from "@components/card-list";
import { ColumnsType } from "@db/model";
import QueryButton from "@components/common/query-button";
const resource = "fleetRequest";
const DataDisplay = () => {
  const { get, register, isLoaded, isEmpty, reset } = useSearchParamsShallow();
  const { rowSelection, ...tableState } = useDataTableContext();
  const queryParams = generateQueryParams({
    model: resource,
    select: [
      "id",
      "driver",
      "vehicle",
      "requestedBy",
      "requestedFor",
      "status",
      "startLocation",
      "endLocation",
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
  const { data, isLoading, isFetching, refetch } = useDynamicRequest<{
    content: ColumnsType<"fleetRequest">[];
  }>({
    ...getDataSourceQuery("fleetRequest",[queryParams]),
    queryKey: [resource, "list", queryParams],
    queryParams: queryParams,
    dataType: "paginated",
    ...tableState,
    placeholder: { content: [] },
    enabled: isLoaded,
  });
  const columns = useMemo(
    () => getSchemaColumns("fleetRequest", queryParams.select),
    [queryParams.select]
  );
  return (
    <div className="relative min-h-screen">
      <LoadingOverlay visible={isLoading || isFetching} />
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
            miw={100}
            placeholder="select"
            {...register("status")}
            data={tripStatus.enumValues}
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
      <CardList
        items={data?.content?.map((d) => ({
          title: `${d.startLocation} - ${d.endLocation}`,
          description: d.requestedFor ?? "",
          id: d.id,
          time: d.createdAt,
          from: d.requestedBy ?? "",
          status: <Badge size="xs" variant="light">{d.status}</Badge>,
          action: (
            <>
              {d.tripStatus === "YetToStart" && (
                <Group>
                  <QueryButton
                    {...updateStatus("fleetRequest", d.id, "Completed")}
                    onSuccess={() => refetch()}
                  >
                    <Button size="xs" color="green">
                      Completed
                    </Button>
                  </QueryButton>
                  <QueryButton
                    {...updateStatus("fleetRequest", d.id, "Cancelled")}
                    onSuccess={() => refetch()}
                  >
                    <Button size="xs" color="red">
                      Cancel
                    </Button>
                  </QueryButton>
                </Group>
              )}
            </>
          ),
        }))}
      />
    </div>
  );
};

export default DataDisplay;
