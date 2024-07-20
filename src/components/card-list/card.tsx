import React from "react";
import {
  Text,
  Flex,
  Card,
  Box,
  Anchor,
  Checkbox,
  Paper,
  Stack,
  Group,
} from "@mantine/core";
import { CardItemProps } from "./model";
import formatData from "@utils/data-converter";

const CardItem: React.FC<CardItemProps> = (props) => {
  const { onChange, isSelected, selectable, data } = props;

  return (
    <Paper
      radius="sm"
      shadow="xs"
      withBorder={false}
      data-checked={isSelected}
      className={`flex bg-[var(--card)]  items-center rounded-md w-full transition-colors duration-150 ease 
      ${isSelected ? "data-checked" : ""} rounded p-4`}
    >
      <Flex className="w-full gap-3 h-full">
        {selectable && (
          <Checkbox
            size="xs"
            checked={isSelected}
            onChange={onChange}
            className="cursor-pointer"
          />
        )}
        <Flex className="flex-col gap-1 w-full ">
          <Stack gap="xs">
            <Group justify="space-between">
              <Group className="gap-2">
                <Text fz={12} c="dimmed" truncate>
                  {data.from}
                </Text>
                <Text fz={12}>.</Text>

                <Text fz={12}>
                  {formatData({
                    type: "date",
                    data: data.time,
                  })}
                </Text>
              </Group>

              <Flex>{data.status}</Flex>
            </Group>

            <Flex>
              <Text fz={12}>{data.title}</Text>
            </Flex>
            <Flex>
              <Text fz={12} w={200} c="dimmed" truncate>
                {data.description}
              </Text>
            </Flex>
          </Stack>

          <Flex className="items-center justify-center mt-6">
            {data.action}
          </Flex>
        </Flex>
      </Flex>
    </Paper>
  );
};

export default CardItem;
