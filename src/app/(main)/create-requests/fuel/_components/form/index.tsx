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
import { fuelRequest } from "@db/schema";
import { useSetState } from "@mantine/hooks";
import SelectFromDataSource from "@components/data-source-select";
import { DateTimePicker } from "@mantine/dates";
import { fuelType } from "@/config/enum";
type InsertModel = typeof fuelRequest.$inferInsert;
const init = {
  driver: "",
  vehicle: "",
  fuelType: "",
  fuelingDateTime: new Date().toDateString(),
  gallonsLitersOfFuel: "",
  costPerGallonLiter: "",
  totalCost: "",
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
    ...getDataSourceMutation("fuelRequest", "POST"),
    onSuccess: () => {
      setFields(init);
    },
  });
  return (
    <Container className="rounded-md shadow-sm p-6 bg-[var(--card)] ">
      <Flex className="items-center py-4 w-full">
        <LoadingOverlay visible={isPending} />
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
            value={fields.driver}
            dataSource={getCustomDataSource("drivers", "name", "name")}
            onChange={(value) => value && setFields({ driver: value })}
          />
          <SelectFromDataSource
            label="Vehicle"
            className="form-field"
            placeholder="Select"
            value={fields.vehicle}
            dataSource={getDataSource("vehicles", "name", "name")}
            onChange={(value) => value && setFields({ vehicle: value })}
          />
          <Select
            className="form-field"
            label="Fuel Type"
            data={fuelType}
            value={fields.fuelType}
            onChange={(value) => value && setFields({ fuelType: value })}
          />
          <DateTimePicker
            className="form-field"
            label="Fueling Date Time"
            value={new Date(fields.fuelingDateTime)}
            onChange={(value) =>
              value && setFields({ fuelingDateTime: value.toISOString() })
            }
          />
          <NumberInput
            className="form-field"
            label="Gallons Liters Of Fuel"
            value={fields.gallonsLitersOfFuel}
            onChange={(value) =>
              value && setFields({ gallonsLitersOfFuel: String(value) })
            }
          />
          <NumberInput
            className="form-field"
            label="Cost Per Gallon Liter"
            prefix="$"
            value={fields.costPerGallonLiter}
            onChange={(value) =>
              value && setFields({ costPerGallonLiter: String(value) })
            }
          />
          <NumberInput
            className="form-field"
            label="Total Cost"
            value={fields.totalCost}
            onChange={(value) =>
              value && setFields({ totalCost: String(value) })
            }
            prefix="$"
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
