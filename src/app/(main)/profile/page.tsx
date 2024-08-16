"use client";
import React, { useMemo, useState } from "react";
import ProfileUpdate from "./_components/forms/profile-form";
import {
  Box,
  Center,
  Flex,
  Group,
  LoadingOverlay,
  Paper,
  SegmentedControl,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import PasswordUpdate from "./_components/forms/password-form";
import {
  IconBuilding,
  IconPasswordUser,
  IconUserEdit,
  IconUsersGroup,
} from "@tabler/icons-react";
import { iconDefaultProps } from "@/config/icon";
import { User } from "@/lib/auth/auth.model";
import useMutationRequest from "@/hooks/useMutationRequest";
import { useAuth } from "@/lib/auth/auth.hooks";
import UserProfileCard from "./_components/profile/user-profile-card";
import { PAPER_PROPS } from "@/config/ui";
import useQueryRequest from "@hooks/useQueryRequest";

const App: React.FC = () => {
  const { session } = useAuth();
  const userId = session.user?.id;

  const getUserReq = useQueryRequest({
    url: `/api/v1/users/${userId}`,
    enabled: !!userId,
    queryKey: ["user-info"],
    placeholder: null,
  });
  const updateUserReq = useMutationRequest({
    url: `/api/v1/users/${userId}`,
    enabled: !!userId,
    queryKey: ["user-info"],
    method:"PUT"
  });
  const passwordUpdateReq = useMutationRequest({
    url: `/api/auth/change-password`,
    enabled: !!userId,
    queryKey: ["user-info"],
  });
  const user = useMemo(
    () => getUserReq?.data as User | null,
    [getUserReq.data]
  );
  console.log(session);
  const [display, setDisplay] = useState<string | null>("profile");
  return (
    <div className="min-h-screen container mx-auto">
      <Box className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Box className="lg:col-span-1">
          <Stack>
            <UserProfileCard
              isLoading={
                getUserReq.isLoading ||
                getUserReq.isFetching ||
                updateUserReq.isPending
              }
              data={{
                name: user?.name ?? "",
                email: user?.email ?? "",
              }}
            />
            <Paper {...PAPER_PROPS}>
              <Text size="lg" fw={600} mb="md">
                About
              </Text>
              {/* <Group>
                <Tooltip label="Organization">
                  <IconBuilding {...iconDefaultProps} />
                </Tooltip>
                <Text>{session.token?.organizationName}</Text>
              </Group>{" "}
              <Group>
                <Tooltip label="Organization">
                  <IconBuilding {...iconDefaultProps} />
                </Tooltip>
                <Text>{session.token?.organizationName}</Text>
              </Group> */}
              <Group>
                <Tooltip label="Member">
                  <IconUsersGroup {...iconDefaultProps} />
                </Tooltip>
                <Text></Text>
              </Group>
            </Paper>
          </Stack>
        </Box>
        <Box className="lg:col-span-2">
          <Stack>
            <Flex className=" w-full items-center justify-center">
              <SegmentedControl
                data={[
                  {
                    value: "profile",
                    label: (
                      <Center className="gap-1 w-[132px]">
                        <IconUserEdit {...iconDefaultProps} />
                        <span>Profile</span>
                      </Center>
                    ),
                  },
                  {
                    value: "password",
                    label: (
                      <Center className="gap-1 w-[132px]">
                        <IconPasswordUser {...iconDefaultProps} />
                        <span>Update Password</span>
                      </Center>
                    ),
                  },
                ]}
                transitionDuration={500}
                transitionTimingFunction="linear"
                onChange={setDisplay}
              />
            </Flex>
            <Paper
              {...PAPER_PROPS}
              className=" rounded-lg py-4 sm:px-8 px-4 relative min-h-[400px]"
            >
              <LoadingOverlay
                visible={
                  getUserReq.isLoading ||
                  getUserReq.isFetching ||
                  updateUserReq.isPending
                }
              />
              {display === "profile" && !!user && (
                <ProfileUpdate
                  defaultValues={user}
                  onSubmit={(values) =>
                    updateUserReq.mutate({
                      ...user,
                      ...values,
                    })
                  }
                />
              )}
              {display === "password" && !!user && (
                <PasswordUpdate
                  defaultValues={{
                    oldPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                  }}
                  onSubmit={(values) =>
                    passwordUpdateReq.mutate({
                      ...values,
                      userId:userId
                    })
                  }
                />
              )}
            </Paper>
          </Stack>
        </Box>
      </Box>
    </div>
  );
};

export default App;
