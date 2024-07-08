import React from "react";
import { Box, Button, Flex } from "@mantine/core";
import { useSetState } from "@mantine/hooks";
import { MapAutocompleteInput } from "@components/google-map/components/autocomleteInput";
import { routes } from "@db/schema";
import useMutationRequest from "@hooks/useMutationRequest";
import { useCreate } from "@lib/entity/hooks/useRequest";
import useEntity from "@lib/entity/hooks/useEntity";
type InsertModel = typeof routes.$inferInsert;

const RouteForm = () => {
  const createQuery = useCreate();
  const { resource } = useEntity();

  const [route, setRoute] = useSetState<InsertModel>({
    name: "",
    startLocation: "",
    startX: "",
    startY: "",
    endLocation: "",
    endX: "",
    endY: "",
    distance: "",
  });

  const createMutation = useMutationRequest<any, InsertModel>({
    url: createQuery?.url() ?? "/",
    method: createQuery?.method,
    queryKey: [resource ?? ""],
    onSuccess: () => {
      console.log("Mutation-Created");
    },
  });
  return (
    <Box className="form-wrapper bg-[var(--card)] border shadow-sm  p-8 py-10 rounded-lg max-w-[600px]">
      <MapAutocompleteInput
        label="Departure"
        onChange={async (val) => {
          setRoute({
            startLocation: val?.name,
            startX: val?.bounds?.lat.toString(),
            startY: val?.bounds?.lng.toString(),
          });
        }}
        required
      />
      <MapAutocompleteInput
        label="Destination"
        onChange={async (val) => {
          setRoute({
            endLocation: val?.name,
            endX: val?.bounds?.lat.toString(),
            endY: val?.bounds?.lng.toString(),
          });
        }}
        required
      />
      <Flex className=" items-center justify-end w-full">
        <Button
          onClick={() =>
            createMutation.mutate({
              ...route,
              name: `${route.startLocation} - ${route.endLocation}`,
            })
          }
        >
          Submit
        </Button>
      </Flex>
    </Box>
  );
};

export default RouteForm;
