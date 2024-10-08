"use client";
import { AppShell, RemoveScroll } from "@mantine/core";
import { useDisclosure, useElementSize } from "@mantine/hooks";
import { createContext, PropsWithChildren, useMemo } from "react";
import { MainHeaderLayout } from "./main-header-layout";
import { SidebarLayout } from "./main-sidebar-layout";
interface AppLayoutContextType {
  sideBarOpened?: boolean;
  toggleSidebar?: () => void;
}
export const AppLayoutContext = createContext<AppLayoutContextType>({});

export const MainLayout = (props: PropsWithChildren) => {
  const [sideBarOpened, { toggle }] = useDisclosure();
  const { ref, height } = useElementSize();

  const value = useMemo(
    () => ({
      sideBarOpened,
      toggleSidebar: toggle,
    }),
    [sideBarOpened, toggle]
  );
  return (
    <AppLayoutContext.Provider value={value}>
      <AppShell
        layout="alt"
        header={{ height }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !sideBarOpened, desktop: false },
        }}
        padding="md"
      >
        <AppShell.Header
          h={60}
          ref={ref}
          className={`${RemoveScroll.classNames.zeroRight} shadow-md`}
        >
          <MainHeaderLayout />
        </AppShell.Header>
        <AppShell.Navbar bg="var(--mantine-color-blue-9)">
          <SidebarLayout />
        </AppShell.Navbar>
        <AppShell.Main bg="var(--mantine-color-body)">
          {props.children}
        </AppShell.Main>
      </AppShell>
    </AppLayoutContext.Provider>
  );
};
