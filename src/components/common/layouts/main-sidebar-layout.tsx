import React from "react";
import { Sidebar } from "./common";
import { AppShell, ScrollArea } from "@mantine/core";
import { sidebarItems } from "@/config/menu";

export const SidebarLayout = () => {

  // const filteredSidebarItems = sidebarItems.filter(item => {
  //   if (item.items) {
  //     item.items = item.items.filter(subItem =>
  //       userRole.resources.includes(subItem.link)
  //     );
  //     return item.items.length > 0;
  //   }
  //   return userRole.resources.includes(item.link);
  // });

  return (
    <Sidebar>
      <AppShell.Section>
        <Sidebar.Header></Sidebar.Header>
      </AppShell.Section>
      <AppShell.Section grow my="md" component={ScrollArea}>
        <Sidebar.Items items={sidebarItems} />
      </AppShell.Section>

      <AppShell.Section>
        <Sidebar.Footer></Sidebar.Footer>
      </AppShell.Section>
    </Sidebar>
  );
};
