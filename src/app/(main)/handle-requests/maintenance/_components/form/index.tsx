"use client";
import {
  ActionIcon,
  Box,
  Button,
  Container,
  Flex,
  Group,
  LoadingOverlay,
  NumberInput,
  Select,
  Textarea,
  TextInput,
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
import { maintenanceRequest } from "@db/schema";
import { useSetState } from "@mantine/hooks";
import SelectFromDataSource from "@components/data-source-select";
import StatusBadge from "@lib/data-table/components/status-badge";
import { DateTimePicker } from "@mantine/dates";
type InsertModel = typeof maintenanceRequest.$inferInsert;

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
    ...getDataSourceMutation("maintenanceRequest", "PUT", initValue.id),
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
            {...register("driver")}
            disabled
          />
          <SelectFromDataSource
            label="Vehicle"
            className="form-field"
            placeholder="Select"
            dataSource={getDataSource("vehicles", "name", "name")}
            {...register("vehicle")}
            disabled
          />
          <Select
            className="form-field"
            label="Maintenance Type"
            data={[
              "Routine Maintenance",
              "Preventive Maintenance",
              "Corrective Maintenance",
              "Scheduled Maintenance",
              "Seasonal Maintenance",
              "Safety Maintenance",
            ]}
            {...register("maintenanceType")}
            disabled
          />
          <DateTimePicker
            className="form-field"
            label="Maintenance Date Time"
            value={new Date(fields.maintenanceDateTime)}
            onChange={(value) =>
              value && setFields({ maintenanceDateTime: value.toISOString() })
            }
            disabled
          />
          <TextInput
            className="form-field"
            label="Maintenance Service Provider Name"
            value={fields.maintenanceServiceProviderName}
            onChange={(value) =>
              value &&
              setFields({
                maintenanceServiceProviderName: String(
                  value.currentTarget.value
                ),
              })
            }
            disabled
          />
          <NumberInput
            className="form-field"
            label="Cost"
            prefix="$"
            value={fields.cost}
            onChange={(value) => value && setFields({ cost: String(value) })}
            disabled
          />
          <Textarea
            className="form-field"
            label="Note"
            value={String(fields.note)}
            onChange={(value) =>
              value && setFields({ note: String(value.currentTarget.value) })
            }
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
