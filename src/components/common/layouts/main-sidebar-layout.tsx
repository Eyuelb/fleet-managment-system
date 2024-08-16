import React, { useMemo } from "react";
import { Sidebar } from "./common";
import { AppShell, ScrollArea } from "@mantine/core";
import { sidebarItems } from "@/config/menu";
import { useAuthUser } from "@lib/auth/auth.hooks";
import { getAllowedRoutes } from "@lib/auth/auth.guard";

export const SidebarLayout = () => {
  const user = useAuthUser();
  const resources = user?.role?.resources
    ? [...user?.role?.resources, ...["/"]]
    : [];
  const allowedRoutes = useMemo(
    () => getAllowedRoutes(sidebarItems, resources),
    [user?.role]
  );
  return (
    <Sidebar>
      <AppShell.Section>
        <Sidebar.Header></Sidebar.Header>
      </AppShell.Section>
      <AppShell.Section grow my="md" component={ScrollArea}>
        <Sidebar.Items items={allowedRoutes} />
      </AppShell.Section>

      <AppShell.Section>
        <Sidebar.Footer></Sidebar.Footer>
      </AppShell.Section>
    </Sidebar>
  );
};
