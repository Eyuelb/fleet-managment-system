import { PAPER_PROPS } from "@/config/ui";
import {
  Avatar,
  Button,
  LoadingOverlay,
  Paper,
  PaperProps,
  Stack,
  Text,
} from "@mantine/core";
type UserInfoActionProps = {
  data: {
    avatar?: string;
    name?: string;
    email: string;
    gender?: "male" | "female";
  };
  isLoading?: boolean;
};

const UserProfileCard = ({
  data: { avatar, name, email },
  isLoading,
}: UserInfoActionProps) => {
  return (
    <Paper {...PAPER_PROPS} className="relative">
      <LoadingOverlay visible={isLoading} />
      <Stack gap={4} align="center">
        <Text size="lg" fw={600} mb="md">
          Profile details
        </Text>
        <Avatar src={avatar} size={120} radius={120} mx="auto" mb="md" />
        <Text fz="md" fw={500} mt="md" mx="auto">
          {name}
        </Text>
        <Text c="dimmed" fz="xs" component="a" href={`mailto:${email}`}>
          {email}
        </Text>
      </Stack>
    </Paper>
  );
};

export default UserProfileCard;
