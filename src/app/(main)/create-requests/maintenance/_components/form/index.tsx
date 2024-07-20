"use client";
import { FormBuilder } from "@lib/form-builder";
import {
  ActionIcon,
  Box,
  Button,
  Container,
  Flex,
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
import { DateTimePicker } from "@mantine/dates";
import { maintenanceType } from "@/config/enum";
type InsertModel = typeof maintenanceRequest.$inferInsert;
const init = {
  driver: "",
  vehicle: "",
  maintenanceType: "",
  maintenanceDateTime: new Date().toDateString(),
  maintenanceServiceProviderName: "",
  cost: "",
  note: "",
};
const RequestForm = ({
  name,
  rootPath,
}: {
  name: string;
  rootPath: string;
}) => {
  const [fields, setFields] = useSetState<InsertModel>(init);
  const { mutate, isPending } = useMutationRequest<any, any>({
    ...getDataSourceMutation("maintenanceRequest", "POST"),
    onSuccess: () => {
      setFields(init);
    },
  });
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
            onChange={(value) => value && setFields({ driver: value })}
          />
          <SelectFromDataSource
            label="Vehicle"
            className="form-field"
            placeholder="Select"
            dataSource={getDataSource("vehicles", "name", "name")}
            onChange={(value) => value && setFields({ vehicle: value })}
          />
          <Select
            className="form-field"
            label="Maintenance Type"
            data={maintenanceType}
            value={fields.maintenanceType}
            onChange={(value) => value && setFields({ maintenanceType: value })}
          />
          <DateTimePicker
            className="form-field"
            label="Maintenance Date Time"
            value={new Date(fields.maintenanceDateTime)}
            onChange={(value) =>
              value && setFields({ maintenanceDateTime: value.toISOString() })
            }
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
          />
          <NumberInput
            className="form-field"
            label="Cost"
            prefix="$"
            value={fields.cost}
            onChange={(value) => value && setFields({ cost: String(value) })}
          />
          <Textarea
            className="form-field"
            label="Note"
            value={String(fields.note)}
            onChange={(value) =>
              value && setFields({ note: String(value.currentTarget.value) })
            }
          />
          <Flex className=" items-center justify-end w-full">
            <Button
              onClick={() =>
                mutate({
                  ...fields,
                  status: "Submitted",
                })
              }
            >
              Submit
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Container>
  );
};

export default RequestForm;
