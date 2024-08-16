import { theme as baseTheme } from '@styles/theme';
import {
  ColorSchemeScript,
  MantineProvider,
  MantineThemeOverride,
} from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';

export default function RootStyleRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme: Partial<MantineThemeOverride> = {
    ...baseTheme,
    colors: {
      primary: [
        "#eaf3ff",
        "#d5e4fb",
        "#abc6f0",
        "#7da6e7",
        "#578bdd",
        "#3f79da",
        "#3171d9",
        "#2260c1",
        "#1955ad",
        "#01499a"
      ],
    },
  };

  return (
    <MantineProvider theme={theme}>
      <ColorSchemeScript />
      <ModalsProvider>
        <Notifications />
        {children}
      </ModalsProvider>
    </MantineProvider>
  );
}
