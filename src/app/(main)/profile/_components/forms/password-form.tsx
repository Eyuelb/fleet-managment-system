"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordSchema } from "./password-form-schema";
import { z } from "zod";
import {
  TextInput,
  Button,
  Paper,
  Box,
  Flex,
  PasswordInput,
  Title,
} from "@mantine/core";
import { IconPhone, IconKey } from "@tabler/icons-react";
import { iconDefaultProps } from "@/config/icon";

type PasswordFormValues = z.infer<typeof passwordSchema>;

const PasswordUpdate: React.FC<{
  defaultValues: PasswordFormValues;
  onSubmit?: (data: PasswordFormValues) => void;
}> = ({ defaultValues, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues,
  });

  const handleOnSubmit = (data: PasswordFormValues) => {
    onSubmit && onSubmit(data);
  };

  return (
    <Box className="p-4 max-w-lg mx-auto">
      <Title order={2} className="text-center mb-4" c="dimmed">
        Password Update
      </Title>
      <form onSubmit={handleSubmit(handleOnSubmit)} className="space-y-6">
        <PasswordInput
          label="Old Password"
          leftSection={<IconKey {...iconDefaultProps} />}
          {...register("oldPassword")}
          error={errors.oldPassword?.message}
          className="w-full"
        />
        <PasswordInput
          label="New Password"
          leftSection={<IconKey {...iconDefaultProps} />}
          {...register("newPassword")}
          error={errors.newPassword?.message}
          className="w-full"
        />
        <PasswordInput
          label="Confirm New Password"
          leftSection={<IconKey {...iconDefaultProps} />}
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
          className="w-full"
        />
        <Flex className="items-center justify-end mt-4 w-full">
          <Button type="submit" className="max-w-lg">
            Update Password
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

export default PasswordUpdate;
