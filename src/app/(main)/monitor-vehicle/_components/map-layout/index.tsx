"use client";
import MapComponent from "@components/google-map/components/map-component";
import React, { useMemo, useState } from "react";
import { Box, Flex, Group, Tabs, Text } from "@mantine/core";
import MapLocationMarkers from "@components/google-map/components/map-location-markers";
import { generateQueryParams, getDataSourceQuery } from "@utils/helper";
import { ColumnsType } from "@db/model";
import { LocationData, PathsData } from "@components/google-map/model";
import { IconBinoculars } from "@tabler/icons-react";
import FleetList from "./fleet-list";
import VehicleList from "./vehicle-list";
import useDynamicRequest from "@hooks/useDynamicRequest";

type Props = {};
const DEFAULT_LOCATION = { lat: 9.002216510322896, lng: 38.76381902993236 };
const DEFAULT_LOCATION2 = { lat: 8.572239907829513, lng: 39.24917858106959 };
const locations = [
  // {
  //   point: { lat: 40.712776, lng: -74.005974 }, // Example location in New York
  //   id: "1",
  //   name: "New York City",
  //   description: "The Big Apple",
  // },
  {
    point: { lat: 34.052235, lng: -118.243683 }, // Example location in Los Angeles
    id: "2",
    name: "Los Angeles",
    description: "City of Angels",
  },
  // Add more locations as needed
];
const MapLayout = (props: Props) => {
  const [display, setDisplay] = useState<string | null>("fleet");
  const [selectedLocations, setSelectedLocations] = useState<LocationData[]>(
    []
  );

  const [fleetPaths, setFleetPaths] = useState<PathsData | null>();

  const fleetRequest = useDynamicRequest<{
    content: ColumnsType<"fleetRequest">[];
  }>({
    ...getDataSourceQuery("fleetRequest"),
    queryParams: generateQueryParams({
      model: "fleetRequest",
      where: [
        {
          column: "status",
          operator: "EQ",
          value: "Approved",
        },
      ],
    }),
    placeholder: { content: [] },
  });
  const vehiclesRequest = useDynamicRequest<ColumnsType<"vehicles">[]>({
    ...getDataSourceQuery("vehicles"),
    placeholder: [],
  });
  console.log(vehiclesRequest.data);

  return (
    <Flex className="size-full">
      <Box className="max-w-[330px] min-h-[90dvh] size-full bg-[var(--card)] p-3">
        <Tabs defaultValue="fleet" onChange={setDisplay}>
          <Tabs.List justify="center">
            <Tabs.Tab value="fleet">Fleet Monitor</Tabs.Tab>
            <Tabs.Tab value="vehicle">Vehicle Monitor</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="fleet" mt="xs">
            <FleetList
              data={fleetRequest.data.content}
              selected={fleetPaths}
              onSelect={setFleetPaths}
            />
          </Tabs.Panel>
          <Tabs.Panel value="vehicle">
            <VehicleList
              data={vehiclesRequest.data}
              selected={selectedLocations}
              onSelect={setSelectedLocations}
            />
          </Tabs.Panel>
        </Tabs>
      </Box>
      <Box className="flex-1">
        {display === "fleet" && (
          <>
            {fleetPaths ? (
              <MapComponent {...fleetPaths} />
            ) : (
              <Flex className="h-1/2 justify-center items-center">
                <Group>
                  <IconBinoculars size={40} stroke={1.8} />
                  <Text fw={600} ta="center">
                    Select Options To Monitor
                  </Text>
                </Group>
              </Flex>
            )}{" "}
          </>
        )}
        {display === "vehicle" && (
          <>
            <MapLocationMarkers locations={selectedLocations} />
          </>
        )}
      </Box>
    </Flex>
  );
};

export default MapLayout;
