import { SidebarItem } from "@components/common/layouts/common";
import { iconDefaultProps } from "./icon";
import {
  IconFolderOpen,
  IconFolderPlus,
  IconFolderQuestion,
  IconFolderStar,
  IconHome,
  IconMapPinSearch,
  IconSettings,
  IconSettingsBolt,
  IconUser,
  IconUsers,
} from "@tabler/icons-react";

export const sidebarItems: SidebarItem[] = [
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
    ],
  },
];
interface Resource {
  value: string;
  label: string;
}
const extractResources = (items: SidebarItem[]): Resource[] => {
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
