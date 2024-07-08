// ActionButtons.tsx
import {
  ActionIcon,
  Box,
  Button,
  Center,
  Flex,
  Group,
  Text,
  ThemeIcon,
} from "@mantine/core";
import {
  IconAlertCircle,
  IconEye,
  IconPencil,
  IconTrash,
} from "@tabler/icons-react";
import Link from "next/link";
import React from "react";
import { useActions } from "../../hooks/useActions";
import { modals } from "@mantine/modals";
import { MethodType } from "@models/request";
import QueryButton from "@components/common/query-button";

export const CreateButton: React.FC<{ path: string }> = ({ path }) => {
  return (
    <QueryButton as={Link} href={`/${path}/create`}>
      Create
    </QueryButton>
  );
};

export const UpdateButton: React.FC<{ id: number; path?: string }> = ({
  id,
  path,
}) => {
  const actions = useActions();

  return (
    <ThemeIcon
      size={24}
      variant="light"
      color="blue.6"
      hidden={!actions?.isUpdate}
      autoContrast
    >
      <Link href={`update?id=${id}`}>
        <IconPencil
          size={14}
          style={{
            color: "blue.6",
          }}
          stroke={1.4}
        />
      </Link>
    </ThemeIcon>
  );
};

export const ViewButton: React.FC<{ id: number }> = ({ id }) => {
  const actions = useActions();
  return (
    <ThemeIcon size={24} variant="light" autoContrast hidden={!actions?.isView}>
      <Link href={`view?id=${id}`}>
        <IconEye size={14} stroke={1.8} />
      </Link>
    </ThemeIcon>
  );
};

export const DeleteButton: React.FC<{
  method?: MethodType;
  url?: string;
  queryKey?: string[];
  hidden?: boolean;
}> = ({ url, method, queryKey, hidden }) => {
  const actions = useActions();
  return (
    <ThemeIcon
      className=" cursor-pointer"
      variant="light"
      color="red.6"
      size={24}
      hidden={hidden}
      autoContrast
      onClick={() =>
        modals.open({
          title: (
            <Flex className="items-center justify-center gap-2">
              <ThemeIcon
                autoContrast
                variant="light"
                color="red.6"
                size={38}
              >
                <IconAlertCircle color="red" size={30} stroke={1.6} />
              </ThemeIcon>
              Please confirm your action
            </Flex>
          ),
          size: "sm",
          radius: "md",
          centered: true,
          withCloseButton: false,
          overlayProps: {
            backgroundOpacity: 0.55,
            blur: 3,
          },
          children: (
            <Flex className="items-center justify-center flex-col">
              <Text size="sm">Are you sure you want to delete this data?</Text>
              <Group mt="xl">
              <QueryButton
                  method={method}
                  url={url}
                  queryKey={queryKey}
                >
                  <Button onClick={() => modals.closeAll()} color="red">
                    Confirm
                  </Button>
                </QueryButton>
                <Button variant="outline" onClick={() => modals.closeAll()}>
                  Cancel
                </Button>
  
              </Group>
            </Flex>
          ),
        })
      }
    >
      <IconTrash size={14} stroke={1.8} color="red" />
    </ThemeIcon>
  );
};
