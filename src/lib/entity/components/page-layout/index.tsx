import React, { memo } from "react";
import { NavBack } from "./components/navigation-buttons";
import ActionLayout from "../action-layout";
import { Flex, Text } from "@mantine/core";
import { useResource } from "../../hooks/useResource";
import { toTittle } from "@utils/text";


const PageLayout = memo(() => {
  const resource = useResource();
  return (
    <div className="relative w-full h-full min-h-screen">
      <div className="w-full flex justify-between items-center">
        <Flex className="items-center gap-3">
          <NavBack />
          <Text fw={500} fz={24}>
          {toTittle(String(resource).replace('-', ' '))}
          </Text>
        </Flex>
        <div></div>
      </div>
      <ActionLayout />
    </div>
  );
});
PageLayout.displayName = "Page Layout";
export default PageLayout;
