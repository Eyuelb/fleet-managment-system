"use client";
import { notFound, redirect, usePathname } from "next/navigation";
import { useAuth, useAuthUser } from "./auth.hooks";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { SidebarLinks } from "@components/common/layouts/common";

export function useIsMounted() {
  const [isMounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return isMounted;
}

export const ProtectedLayout = (props: PropsWithChildren) => {
  const isMounted = useIsMounted();
  const pathname = usePathname();
  const user = useAuthUser();

  if (!isMounted) return <></>;

  if (!user) {
    if (pathname) {
      redirect(`/auth/login?callback=${pathname}`);
    }
    redirect(`/auth/login`);
  }

  return <React.Fragment>{props.children}</React.Fragment>;
};

export const RoleBasedLayout = (props: PropsWithChildren) => {
  const pathname = usePathname();
  const {session} = useAuth();
  const publicResources = ["profile"];
  const allowedResources = [...(session?.user?.role?.resources ?? []), ...publicResources];
  const resources = pathname.split("/").filter(Boolean);
  const isDashboard =
    pathname === "/" && allowedResources.includes("dashboard");
  if (
    !allowedResources.some(
      (level: string) => resources.includes(level ?? "/") || isDashboard
    )
  ) {
    return notFound();
  }
  return <React.Fragment>{props.children}</React.Fragment>;
};
function isResourceAllowed(resource?: string, resources?: string[]): boolean {
  return resources?.some((res) => resource?.includes(res)) ?? false;
}
// Function to get allowed routes from the menuLinks array
export function getAllowedRoutes(
  menuLinks: SidebarLinks[],
  resources: string[]
): SidebarLinks[] {
  return menuLinks
    .filter((menuItem) => {
      // Check if the main link is allowed, but exclude '/'
      const isLinkAllowed = menuItem.link
        ? menuItem.link !== '/' && isResourceAllowed(menuItem.link, resources)
        : false;

      // Check if any item link is allowed if there are items, excluding '/'
      const allowedItems = menuItem.items
        ? menuItem.items.filter(
            (item) => item.link !== '/' && isResourceAllowed(item?.link, resources)
          )
        : [];

      return isLinkAllowed || allowedItems.length > 0;
    })
    .map((menuItem) => ({
      ...menuItem,
      // Filter the items based on allowed resources, excluding '/'
      items:
        menuItem.items?.filter(
          (item) => item.link !== '/' && isResourceAllowed(item.link, resources)
        ) || undefined,
    }));
}