// ActionButtons.tsx
import React, { memo } from "react";
import useEntity from "../../../../hooks/useEntity";
import { useActions } from "../../../../hooks/useActions";
import { Button} from "@mantine/core";
import Link from "next/link";
import { IconArrowBack, IconPlus } from "@tabler/icons-react";

export const NavToCreate: React.FC = memo(() => {
  const { operation, feat } = useEntity();
  const actions = useActions();
  const hidden =
    operation === "create" || actions?.isCreate === false || !actions?.isCreate;
  if (hidden) {
    return <span/>;
  }
  return (
    <Button
      component={Link}
      href={`${feat}/create`}
      leftSection={<IconPlus size={18} />}
      size="xs"
      fz={13}
      pl={0}
    >
      Create
    </Button>
  );
});
NavToCreate.displayName = "NavToCreate"

export const NavBack: React.FC = () => {
  const { operation, feat } = useEntity();
  const actions = useActions();
  const hidden =
    operation === "list" || actions?.isList === false || !actions?.isList;
  if (hidden) {
    return null;
  }
  return (
    <Button
      component={Link}
      href={`${feat}/list`}
      leftSection={<IconArrowBack size={18} />}
      variant="secondary"
      size="xs"
      pl={0}
    >
      Back
    </Button>
  );
};
