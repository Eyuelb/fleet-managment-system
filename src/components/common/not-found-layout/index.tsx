import { Button, Container, Text } from "@mantine/core";
import { IconError404 } from "@tabler/icons-react";
import Link from "next/link";

export default function NotFoundLayout() {
  return (
    <Container fluid className="flex h-full flex-col w-full items-center justify-center gap-6 my-20">
      <IconError404 size={100} color="var(--mantine-color-primary-light-color)" />
      <Text fw={600} fz={20}>Page Not-Found</Text>
      <Button component={Link}  href="/">
        Return To Home
      </Button>

    </Container>
  );
}
