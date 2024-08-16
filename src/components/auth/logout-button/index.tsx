"use client";
import { useAuth } from "@lib/auth/auth.hooks";
import { logout } from "@lib/auth/auth.service";
import { Box, Group, Menu, Text, UnstyledButton } from "@mantine/core";
import {
  IconChevronDown,
  IconLogin,
  IconLogout,
  IconUserCircle,
} from "@tabler/icons-react";
export default function LogoutButton() {
  const { session } = useAuth();

  const isAuthenticated = !!session;
  const authStatus = isAuthenticated
    ? { state: "Logout", icon: <IconLogout size="0.9rem" stroke={1.5} /> }
    : { state: "Login", icon: <IconLogin size="0.9rem" stroke={1.5} /> };
  console.log(session);
  return (
    <Box className="relative">
      <Menu
        width={260}
        position="bottom-end"
        transitionProps={{ transition: "pop-top-right" }}
        withinPortal
      >
        <Menu.Target>
          <UnstyledButton px={"xs"} py={"sm"} className=" rounded-md">
            <Group gap={7}>
              <IconUserCircle size={20} />

              <Text fw={500} size="sm" mr={3}>
                {session?.user?.name}
              </Text>
              <IconChevronDown size={14} stroke={1.5} />
            </Group>
          </UnstyledButton>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item
            leftSection={authStatus.icon}
            onClick={async () => {
              isAuthenticated && (await logout());
              const isBrowser = typeof window !== "undefined";
              if (isBrowser) {
                window.location.href = "/auth/login";
              }
            }}
          >
            {authStatus.state}
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Box>
  );
}
