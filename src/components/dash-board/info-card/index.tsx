"use client";
import {
  ActionIcon,
  Badge,
  Card,
  Flex,
  Group,
  Paper,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import Link from "next/link";
import React, { CSSProperties, ReactNode } from "react";

interface InfoCardProps {
  className?: string;
  icon: React.ElementType;
  name: string;
  number: number;
  isActive?: boolean;
  bottomComponent?: boolean;
  children?: ReactNode;
  onClick?: () => void;
}

const InfoCard: React.FC<InfoCardProps> = ({
  icon: Icon,
  name,
  number,
  isActive = false,
  children,
  ...props
}) => {
  return (
    <Paper
      shadow="xs"
      p="lg"
      radius="xl"
      
      //withBorder
      //  bg="#ffffff3d"
       bg="var(--card)"
      w="100%"
      className=" transition duration-300 ease-in-out transform hover:border-1  cursor-pointer"
      {...props}
    >
      <Flex className=" justify-end items-center">
        <Badge color="green" variant="filled" hidden={!isActive}>
          Active
        </Badge>
      </Flex>
      <Group align="center" display={"apart"}>
        <div className="flex items-center space-x-2">
          <Text fz={26} fw={500} >
            {name}
          </Text>
        </div>
      </Group>
      <Flex mt="md" className="w-full justify-between items-center">
        <ThemeIcon variant="light" size={60}  className=" rounded-full">
          <Icon size={44} stroke={1.2} />
        </ThemeIcon>

        <ActionIcon  size={48}  className=" rounded-full">
          <IconArrowRight size={46} stroke={0.9} />
        </ActionIcon>
      </Flex>
    </Paper>
  );
};

export default InfoCard;
