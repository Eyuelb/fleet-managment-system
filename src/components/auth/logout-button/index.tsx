"use client";
import { signOut } from "@app/(auth)/auth/_actions/auth.action";
import { ActionIcon } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import logger from "@utils/logger";
import { redirect } from "next/navigation";

export default function LogoutButton() {
  const onSubmitHandler = async () => {
    try {
      await signOut();
      redirect("/auth/login");
    } catch (error) {
      logger.error(error);
    }
  };
  return (
    <ActionIcon onClick={onSubmitHandler}>
      <IconLogout />
    </ActionIcon>
  );
}
