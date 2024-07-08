"use client";
import InfoCard from "@components/dash-board/info-card";
import { IconCarMaintenance, IconFuelPump } from "@components/icon";
import { Box, Container, Flex, Text } from "@mantine/core";
import { IconCarGarage, IconRoad, IconTool } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React from "react";

const InfoCardsData = [
  { name: "Fuel", number: 0, link: "fuel", icon: IconFuelPump },
  { name: "Fleet", number: 0, link: "fleet", icon: IconRoad },
  {
    name: "Maintenance",
    number: 0,
    link: "maintenance",
    icon: IconCarMaintenance,
  },
];
const DashBoard = () => {
  const router = useRouter();
  const cards = InfoCardsData.map((card, index) => (
    <InfoCard
      key={index}
      icon={card.icon}
      name={card.name}
      number={card.number}
      onClick={() => router.push(`/create-requests/${card.link}`)}
    />
  ));

  return (
    <Container>
      <Flex className="items-center justify-center py-4">
        <Text fz={36}>Select Services</Text>
      </Flex>
      <Box className="w-full grid grid-cols-3 gap-4">{cards}</Box>
    </Container>
  );
};

export default DashBoard;
