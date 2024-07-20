import React from "react";
import { Sidebar, SidebarItem } from "./common";
import { AppShell, ScrollArea } from "@mantine/core";
import { IconFolderOpen, IconFolderPlus, IconFolderQuestion, IconFolderStar, IconHome, IconMapPinSearch, IconSettings, IconSettingsBolt, IconUser, IconUsers } from "@tabler/icons-react";
import { iconDefaultProps } from "../../../config/icon";
const sidebarItems: SidebarItem[] = [
  {
    label: "My Requests",
    icon: <IconFolderStar {...iconDefaultProps} />,
    link: "/my-requests",
  },
  {
    label: "Create Requests",
    icon: <IconFolderPlus {...iconDefaultProps} />,
    link: "/create-requests",

  },
  {
    label: "Handle Requests",
    icon: <IconFolderOpen {...iconDefaultProps} />,
    link: "/handle-requests",
  },
  {
    label: "Monitor Vehicle",
    icon: <IconMapPinSearch {...iconDefaultProps} />,
    link: "/monitor-vehicle",
  },
  {
    label: "Administration",
    icon: <IconSettingsBolt {...iconDefaultProps} />,
    items:[
      {
        label: "Users",
        link: "/administration/users/list",
      },
      {
        label: "Roles",
        link: "/administration/roles/list",
      },
      {
        label: "Groups",
        link: "/administration/groups/list",
      },
      {
        label: "Vehicles",
        link: "/administration/vehicles/list",
      },
      {
        label: "Routes",
        link: "/administration/routes/list",
      },
    ]
  },


];
export const SidebarLayout = () => {
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
