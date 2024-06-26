import {
  MRT_GlobalFilterTextInput,
  MRT_ShowHideColumnsButton,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFiltersButton,
  MRT_ToggleFullScreenButton,
  MRT_ToggleGlobalFilterButton,
  type MRT_RowData,
  type MRT_TableOptions,
} from "mantine-react-table";
import { mkConfig, generateCsv, download } from "export-to-csv"; //or use your library of choice here
import {
  IconBaselineDensityLarge,
  IconBaselineDensityMedium,
  IconBaselineDensitySmall,
  IconColumns,
  IconDownload,
  IconFilter,
  IconFilterOff,
  IconMaximize,
  IconMinimize,
  IconPrinter,
  IconSearch,
  IconSearchOff,
} from "@tabler/icons-react";
import { ActionIcon, Box, Button, Center, Flex, Text, Tooltip } from "@mantine/core";
import { MRT_ToggleDownloadButton } from "../components/MRT_ToggleDownloadButton";
import { IconEmptyData } from "../icons";

//define re-useable default table options for all tables in your app
export const iconProps = {
  size: 18,
};
export const actionIconStyles = {
  "--ai-size": "var(--ai-size-lg)",
  "--ai-hover": "var(--mantine-color-gray-light-hover)",
  "--ai-color": "var(--mantine-color-gray-light-color)",
  "--ai-bd": "calc(0.0625rem * var(--mantine-scale)) solid transparent",
};
const icons = {
  IconSearch: (props: any) => <IconSearch {...iconProps} />,
  IconSearchOff: (props: any) => <IconSearchOff {...iconProps} />,
  IconFilter: (props: any) => <IconFilter {...iconProps} />,
  IconFilterOff: (props: any) => <IconFilterOff {...iconProps} />,
  IconColumns: (props: any) => <IconColumns {...iconProps} />,
  IconBaselineDensityLarge: (props: any) => (
    <IconBaselineDensityLarge {...iconProps} />
  ),
  IconBaselineDensityMedium: (props: any) => (
    <IconBaselineDensityMedium {...iconProps} />
  ),
  IconBaselineDensitySmall: (props: any) => (
    <IconBaselineDensitySmall {...iconProps} />
  ),
  IconMaximize: (props: any) => <IconMaximize {...iconProps} />,
  IconMinimize: (props: any) => <IconMinimize {...iconProps} />,
};
export const getDefaultMRTOptions = <TData extends MRT_RowData>(): Partial<
  MRT_TableOptions<TData>
> => ({
  //list all of your default table options here
  enableColumnPinning: true,
  enablePagination: false,
  initialState: {
    density: "xs",
    columnPinning: {
      right: ["action"], //pin built-in row actions display column to right by default
    },
  },
  icons,
  mantinePaperProps: {
    style: { "--mrt-base-background-color": "var(--card)" },
  },
  positionToolbarAlertBanner:"none",
  renderEmptyRowsFallback: () => (
    <div className="w-full h-[260px] flex items-center justify-center">
      <Flex className="flex items-center justify-center flex-col gap-2" color="dimmed">
        <IconEmptyData />
        <Text color="dimmed">No Data Found</Text>    
      </Flex>
    </div>
  ),
  renderToolbarInternalActions: ({ table }) => (
    <Flex align="center">
      <MRT_ToggleGlobalFilterButton table={table} />
      <MRT_ToggleDownloadButton table={table} />
      <MRT_ShowHideColumnsButton table={table} />
      <MRT_ToggleDensePaddingButton table={table} />
      <MRT_ToggleFullScreenButton table={table} />
    </Flex>
  ),
});
