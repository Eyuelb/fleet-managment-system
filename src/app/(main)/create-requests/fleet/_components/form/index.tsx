"use client";
import {
  ActionIcon,
  Box,
  Button,
  Container,
  Flex,
  LoadingOverlay,
  Select,
  Textarea,
  Title,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";
import { getDataSourceMutation } from "@/utils/helper";
import useMutationRequest from "@hooks/useMutationRequest";
import { fleetRequest } from "@db/schema";
import { useSetState } from "@mantine/hooks";
import { MapAutocompleteInput } from "@components/google-map/components/autocomleteInput";
import { departments } from "@/config/enum";
type InsertModel = typeof fleetRequest.$inferInsert;
const init = {
  driver: "",
  vehicle: "",
  startLocation: "",
  startX: "",
  startY: "",
  endLocation: "",
  endX: "",
  endY: "",
  distance: "",
  note: "",
  workGroup: "",
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
    ...getDataSourceMutation("fleetRequest", "POST"),
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
          {/* <SelectFromDataSource
            className="form-field"
            label="Driver"
            placeholder="Select"
            dataSource={getCustomDataSource("drivers", "name", "name")}
            onChange={(value) => value && setFields({ driver: value })}
          />d
          <SelectFromDataSource
            label="Vehicle"
            className="form-field"
            placeholder="Select"
            dataSource={getDataSource("vehicles", "name", "name")}
            onChange={(value) => value && setFields({ vehicle: value })}
          /> */}
          <MapAutocompleteInput
            label="Departure"
            className="form-field"
            onChange={async (val) => {
              setFields({
                startLocation: val?.name,
                startX: val?.bounds?.lat.toString(),
                startY: val?.bounds?.lng.toString(),
              });
            }}
            required
          />
          <MapAutocompleteInput
            label="Destination"
            className="form-field"
            onChange={async (val) => {
              setFields({
                endLocation: val?.name,
                endX: val?.bounds?.lat.toString(),
                endY: val?.bounds?.lng.toString(),
              });
            }}
            required
          />
          <Select
            className="form-field"
            label="Department"
            data={departments}
            value={fields.workGroup}
            onChange={(value) => value && setFields({ workGroup: value })}
          />
          <Textarea
            className="form-field"
            label="Note"
            onChange={(e) => setFields({ note: e.target.value })}
          />
          <Flex className=" items-center justify-end w-full">
            <Button
              onClick={() =>
                mutate({
                  ...fields,
                  status: "Submitted",
                  tripStatus: "YetToStart",
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
