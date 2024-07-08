"use client";
import { fleet } from "@db/schema";
import { FormBuilder } from "@lib/form-builder";
import { ActionIcon, Box, Container, Flex, Text, Title } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { getDataSource } from "../../../../../../utils/helper";
import useMutationRequest from "@hooks/useMutationRequest";
type InsertModel = typeof fleet.$inferInsert;

const RequestForm = ({
  name,
  rootPath,
}: {
  name: string;
  rootPath: string;
}) => {
  const { mutate, isPending } = useMutationRequest<any, InsertModel>({
    url: "/api/v1/fleet",
    method: "POST",
    queryKey: ["routes", "insert"],
    onSuccess: () => {
      console.log("Mutation-Created");
    },
  });
  return (
    <Container className="rounded-md shadow-sm p-6 bg-[var(--card)] ">
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
        <FormBuilder
          isLoading={isPending}
          className="w-full form-wrapper container mx-auto"
          fields={[
            {
              name: "routeId",
              label: "Route",
              type: "select",
              dataSource: getDataSource("routes", "id", "name"),
            },
            {
              name: "vehicleId",
              label: "Vehicle",
              type: "select",
              dataSource: getDataSource("vehicles", "id", "name"),
            },
          ]}
          onSubmit={(values) => mutate({ ...values, status: "Submitted" })}
          buttonProps={{
            bg: "var(--mantine-primary-color-filled)",
            color: "white",
            children: "Submit",
          }}
          buttonWrapperProps={{
            className: "flex w-full justify-end",
          }}
        />
      </Flex>
    </Container>
  );
};

export default RequestForm;
