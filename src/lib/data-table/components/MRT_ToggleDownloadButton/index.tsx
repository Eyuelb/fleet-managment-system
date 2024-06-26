import { ActionIcon, type ActionIconProps, Menu, Tooltip } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import {
  type HTMLPropsRef,
  type MRT_RowData,
  type MRT_TableInstance,
} from "mantine-react-table";
import { iconProps } from "../../config/defaultMRTOptions";
import { useDownloadData } from "../../hooks/useDownloadData";

interface Props<TData extends MRT_RowData>
  extends ActionIconProps,
    HTMLPropsRef<HTMLButtonElement> {
  table: MRT_TableInstance<TData>;
}

export const MRT_ToggleDownloadButton = <TData extends MRT_RowData>({
  table,
  title,
  ...rest
}: Props<TData>) => {
  const { downloadAsCsv, downloadAsPdf } = useDownloadData<TData>({
    columns: table.getAllColumns() as any,
  });
  const data = [
    { name: "CSV", action: () => downloadAsCsv(table.getRowModel().rows) },
    { name: "PDF", action: () => downloadAsPdf(table.getRowModel().rows) },
  ];

  const items = data.map((item) => (
    <Menu.Item onClick={item.action} key={item.name}>
      {item.name}
    </Menu.Item>
  ));
  return (
    <Menu radius="md" withinPortal>
      <Menu.Target>
        <Tooltip label={"Download"} withinPortal>
          <ActionIcon
            aria-label={"Download"}
            color="gray"
            size="lg"
            variant="subtle"
            {...rest}
          >
            <IconDownload {...iconProps} />
          </ActionIcon>
        </Tooltip>
      </Menu.Target>
      <Menu.Dropdown>{items}</Menu.Dropdown>
    </Menu>
  );
};
