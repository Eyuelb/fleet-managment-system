import { SidebarLinks } from "@components/common/layouts/common";
import { iconDefaultProps } from "./icon";
import {
  IconDashboard,
  IconFolderOpen,
  IconFolderPlus,
  IconFolderStar,
  IconMapPinSearch,
  IconSettingsBolt,
} from "@tabler/icons-react";

export const sidebarItems: SidebarLinks[] = [
  {
    label: "Dashboard",
    icon: <IconDashboard {...iconDefaultProps} />,
    link: "/",
  },
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
    label: "Request Approval",
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
    items: [
      {
        label: "Users",
        link: "/administration/users/list",
      },
      {
        label: "Roles",
        link: "/administration/roles/list",
      },
      {
        label: "Vehicles",
        link: "/administration/vehicles/list",
      },
    ],
  },
];
interface Resource {
  value: string;
  label: string;
}
const extractResources = (items: SidebarLinks[]): Resource[] => {
  const resources: Resource[] = [];

  items.forEach((item) => {
    if (item.link) {
      resources.push({ value: item.link, label: item.label });
    }
    if (item.items) {
      resources.push(...extractResources(item.items));
    }
  });

  return resources;
};

export const allRoutes = extractResources(sidebarItems);
