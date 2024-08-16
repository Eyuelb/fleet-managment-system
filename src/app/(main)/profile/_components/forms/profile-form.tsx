"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "./profile-form-schema";
import { z } from "zod";
import {
  TextInput,
  Select,
  Button,
  Paper,
  Flex,
  Title,
  Box,
} from "@mantine/core";
import { IconUser, IconAt, IconGenderAgender } from "@tabler/icons-react";
import { iconDefaultProps } from "@/config/icon";

type ProfileFormValues = z.infer<typeof profileSchema>;

const ProfileUpdate: React.FC<{
  defaultValues: ProfileFormValues;
  onSubmit?: (data: ProfileFormValues) => void;
}> = ({ defaultValues, onSubmit }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  });

  const handleOnSubmit = (data: ProfileFormValues) => {
    onSubmit && onSubmit(data);
  };
  return (
    <Box className=" p-4">
      <Title order={2} className="text-center mb-4" c="dimmed">
        Profile
      </Title>
      <form
        onSubmit={handleSubmit(handleOnSubmit)}
        className=" w-full form-wrapper  xs:px-10 px-4"
      >
        <TextInput
          label="Full Name"
          leftSection={<IconUser {...iconDefaultProps} />}
          {...register("name")}
          error={errors.name?.message}
          className="w-full"
        />
        <TextInput
          label="Email"
          leftSection={<IconAt {...iconDefaultProps} />}
          {...register("email")}
          error={errors.email?.message}
          readOnly
          className="w-full"
        />
        <Flex className="items-center justify-end mt-4 w-full">
          <Button type="submit" className=" max-w-lg">
            Update Profile
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

export default ProfileUpdate;
