import { iconDefaultProps } from "@/config/icon";
import { PathsData } from "@components/google-map/model";
import { ColumnsType } from "@db/model";
import {
  ActionIcon,
  Badge,
  Box,
  Center,
  Divider,
  Group,
  Paper,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import {
  IconArrowLeft,
  IconArrowRight,
  IconCalendar,
  IconLocation,
  IconSteeringWheelFilled,
} from "@tabler/icons-react";
import formatData from "@utils/data-converter";
import React from "react";

type Props = {
  data: ColumnsType<"fleetRequest">[] | undefined;
  selected?: PathsData | null;
  onSelect?: (data: PathsData | null) => void;
  isLoading?: boolean;
};

const FleetList = (props: Props) => {
  const { data, onSelect, selected, isLoading } = props;
  const selectedCol = selected
    ? data?.find((d) => d.id === selected.id)
    : null;
  return (
    <Box>
      {selectedCol ? (
        <Box>
          <Paper bg="var(--card)" key={selectedCol.id} radius={"sm"} p={4}>
            <Group justify="between" className="w-full flex-1">
              <Group wrap="nowrap" gap="xs">
                <ActionIcon onClick={() => onSelect && onSelect(null)}>
                  <IconArrowLeft />
                </ActionIcon>
                <Text fz={14} truncate>
                  Back
                </Text>
              </Group>
            </Group>
          </Paper>
          <Stack justify="center" py={10} gap="xs">
            <Divider />
            <Center>
              <Badge variant="light" fw={500}>
                {selectedCol.status?.replace(/([a-z])([A-Z])/g, "$1 $2")}
              </Badge>
            </Center>
            <Text ta="center" fz={13}>
              {selectedCol.startLocation}
            </Text>
            <Center>
              <IconLocation {...iconDefaultProps} />
            </Center>
            <Text ta="center" fz={13}>
              {selectedCol.endLocation}
            </Text>
            <Divider />
            <Group justify="center" gap="xs">
              <IconSteeringWheelFilled {...iconDefaultProps} />
              <Text ta="center" fz={13}>
                {selectedCol.driver}
              </Text>
            </Group>
            <Group justify="center" gap="xs">
              <IconCalendar {...iconDefaultProps} />
              <Text ta="center" fz={13}>
                {formatData({
                  type: "date",
                  data: selectedCol.createdAt,
                })}
              </Text>
            </Group>

            <Divider />
          </Stack>
        </Box>
      ) : (
        <ScrollArea
          h={{
            base: "80vh",
          }}
          pt="md"
          px={10}

        >
          <Stack gap={"xs"}>
            {data?.map((lo) => (
              <Paper key={lo.id} withBorder radius={"sm"} p={4}>
                <Group wrap="nowrap" justify="space-between">
                  <Text fz={12} truncate maw={230}>
                    {lo.startLocation} - {lo.endLocation}
                  </Text>
                  <ActionIcon
                    onClick={() =>
                      onSelect &&
                      onSelect({
                        id: lo.id,
                        source: {
                          lat: Number(lo.startX),
                          lng: Number(lo.startY),
                        },
                        destination: {
                          lat: Number(lo.endX),
                          lng: Number(lo.endY),
                        },
                      })
                    }
                  >
                    <IconArrowRight />
                  </ActionIcon>
                </Group>
              </Paper>
            ))}
          </Stack>
        </ScrollArea>
      )}
    </Box>
  );
};

export default FleetList;
