import {
  Button,
  Flex,
  Group,
  Pagination,
  ScrollArea,
  Select,
} from "@mantine/core";
import React, { memo } from "react";
import { useDataTableContext } from "../../contexts/table";
type Props = {
  clear?: () => void;
  selectedCount?: number;
};
const BottomToolbar = memo(({ clear, selectedCount }: Props) => {
  const { pagination, setPagination, dataTotalCount } = useDataTableContext();
  return (
    <Flex className="w-full overflow-auto justify-between items-center px-4 py-3 gap-4 border-t">
      <Flex className="min-w-max" align="center" gap="sm" fz={12} pl="sm">
        <Group hidden={!selectedCount}>
          {selectedCount} of {dataTotalCount} row(s) selected
          <Button onClick={clear} size="compact-xs" variant="subtle">
            clear Selection
          </Button>
        </Group>
      </Flex>
      <Flex className="min-w-max gap-4">
        <Select
          data={["10", "20", "30", "40"]}
          size="xs"
          w={60}
          value={String(pagination.pageSize)}
          onChange={(value) =>
            setPagination((prev) => ({
              ...prev,
              pageSize: Number(value),
            }))
          }
        />
        <Pagination
          total={Math.ceil(dataTotalCount / pagination.pageSize)}
          value={pagination.pageIndex}
          onChange={(value) => {
            console.log(value);
            setPagination((preValue) => ({
              ...preValue,
              pageIndex: Number(value),
            }));
          }}
          autoContrast
          color="primary.4"
        />
      </Flex>
    </Flex>
  );
});

BottomToolbar.displayName = "BottomToolbar";
export default BottomToolbar;
