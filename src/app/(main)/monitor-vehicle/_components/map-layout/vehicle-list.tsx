import { LocationData } from "@components/google-map/model";
import { ColumnsType } from "@db/model";
import {
  Box,
  Checkbox,
  Group,
  Paper,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import React from "react";

type Props = {
  data: ColumnsType<"vehicles">[] | undefined;
  selected?: LocationData[];
  onSelect?: (data: LocationData[]) => void;
  isLoading?: boolean;
};

const VehicleList = (props: Props) => {
  const { data, onSelect, selected = [], isLoading } = props;
  const selectedRows = selected ? selected.map((s) => s.id) : [];

  return (
    <Box>
      <ScrollArea
        h={{
          base: "80vh",
        }}
        pt="md"
        pr={14}
      >
        <Stack gap={"xs"}>
          {data?.map((lo) => (
            <Paper
              key={lo.id}
              withBorder
              radius={"sm"}
              p={4}
              bg="var(--card)"
              className={
                selectedRows.includes(lo.id)
                  ? `border-[var(--mantine-color-primary-7)] border-2`
                  : ``
              }
            >
              <Group wrap="nowrap" justify="space-between" className="w-full">
                <Text fz={12} truncate>
                  {lo.name} - {lo.model}
                </Text>
                <Checkbox
                  size="xs"
                  aria-label="Select row"
                  checked={selectedRows.includes(lo.id)}
                  onChange={(event) =>
                    onSelect &&
                    onSelect(
                      event.currentTarget.checked
                        ? [
                            ...selected,
                            {
                              point: {
                                lat: Number(lo.lat) ?? 0,
                                lng: Number(lo.lng) ?? 0,
                              },
                              id: lo.id,
                            },
                          ]
                        : selected.filter((s) => s.id !== lo.id)
                    )
                  }
                />
              </Group>
            </Paper>
          ))}
        </Stack>
      </ScrollArea>
    </Box>
  );
};

export default VehicleList;
