import React, { PropsWithChildren, RefObject, useContext } from "react";
import { Burger, Indicator, NavLink, Text, ThemeIcon } from "@mantine/core";
import styles from "./sidebar-item.module.scss";
import { useCallback } from "react";
import { useActivePath } from "@hooks/useActivePath";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppLayoutContext } from "../layouts/main-layout";
import { useNetwork } from "@mantine/hooks";

export interface SidebarItem {
  label: string;
  icon?: string | React.ReactNode | undefined;
  link?: string;
  external?: boolean;
  items?: SidebarItem[];
}

export interface SidebarItemsProps {
  items: SidebarItem[];
}

const Sidebar = ({ children }: PropsWithChildren) => {
  return <div className="w-full h-full flex flex-col">{children}</div>;
};
const SidebarHeader: React.FC = () => {
  const { toggleSidebar, sideBarOpened } = useContext(AppLayoutContext);

  return (
    <div className="p-4 flex justify-between items-center">
      <Text fw={500} fz={24} ta="center">
        Fleet Management
      </Text>
      <Burger
        opened={sideBarOpened}
        onClick={toggleSidebar}
        hiddenFrom="sm"
        size="sm"
      />
    </div>
  );
};
interface SidebarItemProps extends SidebarItem {
  ref?:
    | ((instance: HTMLButtonElement | null) => void)
    | RefObject<HTMLButtonElement>
    | null
    | undefined;
  type?: "child" | "root";
  children?: React.ReactNode;
}
const SidebarItem: React.FC<SidebarItemProps> = (props) => {
  const { toggleSidebar } = useContext(AppLayoutContext);
  const router = useRouter();
  const { link, type, label, icon, children } = props;
  const handleClick = (link: string) => {
    toggleSidebar && toggleSidebar();
    router.push(link);
  };

  const isActive = useActivePath();
  const selectedItemRef = useCallback(
    (node: HTMLAnchorElement, selected: boolean) => {
      if (node && selected) {
        node.scrollIntoView({ behavior: "smooth" });
      }
    },
    []
  );
  const defaultProps = {
    active: isActive(link),
    classNames: styles,
    label: (
      <Text
        fz={type === "child" ? 14.6 : 14.6}
        fw={type === "child" ? 400 : 400}
        maw={150}
        truncate
      >
        {label}
      </Text>
    ),
    leftSection: icon ? (
      <ThemeIcon variant="light" autoContrast aria-label={label}>
        {icon}
      </ThemeIcon>
    ) : null,
    className: "rounded-md",
    ref: (node: HTMLAnchorElement) => selectedItemRef(node, isActive(link)),
    fw: 500,
    children,
    my: 3,
  };
  return (
    <>
      {link ? (
        <NavLink
          component={Link}
          href={link}
          onClick={() => link && handleClick(link)}
          {...defaultProps}
        />
      ) : (
        <NavLink {...defaultProps} />
      )}
    </>
  );
};

const SidebarItems: React.FC<SidebarItemsProps> = ({ items }) => {
  function createNavLinks(links: SidebarItem[], type?: "child" | "root") {
    return links.map((link, index) => (
      <SidebarItem key={link.label + String(index)} {...link} type={type}>
        {link.items && createNavLinks(link.items, "child")}
      </SidebarItem>
    ));
  }
  return <div className="flex-1 px-4"> {createNavLinks(items, "root")}</div>;
};
const SidebarFooter: React.FC = () => {
  const networkStatus = useNetwork();
  const currentYear = new Date().getFullYear();

  return (
    <div className="py-4 flex justify-between items-center border-t mx-4">
      <div className=" text-xs ">
        <div className="flex justify-between items-center">
          <Indicator
            processing
            color={networkStatus.online ? "teal" : "red"}
            size={9}
            position="middle-end"
          >
            <Text
              fw={500}
              color={networkStatus.online ? "teal" : "red"}
              size="sm"
              pr={10}
            >
              {networkStatus.online ? "Online" : "Offline"}
            </Text>
          </Indicator>
          <div className="text-center"></div>{" "}
        </div>
        <div className="flex gap-2 justify-between items-center">
          <div> &copy; {currentYear} </div>
          <div className="flex gap-2 justify-between items-center"></div>
        </div>
      </div>
    </div>
  );
};

Sidebar.Header = SidebarHeader;
Sidebar.Footer = SidebarFooter;
Sidebar.Items = SidebarItems;
Sidebar.Item = SidebarItem;

export { Sidebar };
