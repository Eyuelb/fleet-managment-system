"use client";
import {
  ActionIcon,
  Box,
  Button,
  Container,
  Flex,
  Group,
  LoadingOverlay,
  Select,
  Textarea,
  Title,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";
import {
  getDataSource,
  getCustomDataSource,
  getDataSourceMutation,
} from "@/utils/helper";
import useMutationRequest from "@hooks/useMutationRequest";
import { fleetRequest } from "@db/schema";
import { useSetState } from "@mantine/hooks";
import { MapAutocompleteInput } from "@components/google-map/components/autocomleteInput";
import SelectFromDataSource from "@components/data-source-select";
import { departments } from "@/config/enum";
import StatusBadge from "@lib/data-table/components/status-badge";
import { DateTimePicker } from "@mantine/dates";
type InsertModel = typeof fleetRequest.$inferInsert;

const RequestHandleForm = ({
  name,
  rootPath,
  initValue,
  refresh,
}: {
  name: string;
  rootPath: string;
  initValue: InsertModel;
  refresh?: () => void;
}) => {
  const [fields, setFields] = useSetState<InsertModel>(initValue);
  const register = (name: keyof InsertModel) => ({
    value: fields[name],
    onChange: (value: InsertModel[typeof name]) => setFields({ [name]: value }),
  });
  const { mutate, isPending } = useMutationRequest<any, any>({
    ...getDataSourceMutation("fleetRequest", "PUT", initValue.id),
    massage: {
      success: `Request handled successfully`,
    },
    onSuccess: () => {
      refresh && refresh();
    },
  });
  const isHandled = initValue.status !== "Submitted";
  return (
    <Container className="rounded-md shadow-sm p-6 bg-[var(--card)] relative">
      <LoadingOverlay visible={isPending} />
      <Flex className="items-center py-4 w-full">
        <ActionIcon
          variant="transparent"
          size={48}
          component={Link}
          href={rootPath}
        >
          <IconArrowLeft size={46} stroke={0.9} />
        </ActionIcon>
        <Title order={1} fw={400} flex={1} ta="center">
          {name}
        </Title>
      </Flex>
      <Flex className="items-center justify-center py-4 ">
        <Box className="w-full form-wrapper container mx-auto">
          <SelectFromDataSource
            className="form-field"
            label="Driver"
            placeholder="Select"
            dataSource={getCustomDataSource("drivers", "name", "name")}
            disabled={isHandled}
            {...register("driver")}
          />
          <SelectFromDataSource
            label="Vehicle"
            className="form-field"
            placeholder="Select"
            dataSource={getDataSource("vehicles", "name", "name")}
            disabled={isHandled}
            {...register("vehicle")}
          />
          <MapAutocompleteInput
            label="Departure"
            className="form-field"
            value={fields.startLocation ?? ""}
            onChange={async (val) => {
              setFields({
                startLocation: val?.name,
                startX: val?.bounds?.lat.toString(),
                startY: val?.bounds?.lng.toString(),
              });
            }}
            required
            disabled
          />
          <MapAutocompleteInput
            label="Destination"
            className="form-field"
            value={fields.endLocation ?? ""}
            onChange={async (val) => {
              setFields({
                endLocation: val?.name,
                endX: val?.bounds?.lat.toString(),
                endY: val?.bounds?.lng.toString(),
              });
            }}
            required
            disabled
          />
          <Select
            className="form-field"
            label="Department"
            data={departments}
            {...register("workGroup")}
            disabled
          />
          <Select
            className="form-field"
            label={"Type"}
            data={["Single-Trip", "Round-Trip"]}
            {...register("type")}
            disabled
          />
          {fields.departureDate && (
            <DateTimePicker
              className="form-field"
              label="Departure Date Time"
              value={
                new Date(fields.departureDate ?? new Date().toDateString())
              }
              onChange={(value) =>
                value && setFields({ departureDate: value.toISOString() })
              }
              disabled
            />
          )}

          <Textarea
            className="form-field"
            label="Note"
            value={register("note").value ?? ""}
            onChange={(e) => register("note").onChange(e.target.value)}
            disabled
          />
          {isHandled ? (
            <Group className=" items-center justify-end w-full">
              <StatusBadge
                data={[
                  { value: "Approved", label: "Approved", color: "green" },
                  { value: "Rejected", label: "Rejected", color: "red" },
                ]}
                value={initValue.status ?? ""}
              />
            </Group>
          ) : (
            <Group className=" items-center justify-end w-full">
              <Button
                color="green"
                onClick={() =>
                  mutate({
                    ...fields,
                    status: "Approved",
                  })
                }
              >
                Approve
              </Button>
              <Button
                color="red"
                onClick={() =>
                  mutate({
                    ...fields,
                    status: "Rejected",
                  })
                }
              >
                Reject
              </Button>
            </Group>
          )}
        </Box>
      </Flex>
    </Container>
  );
};

export default RequestHandleForm;
