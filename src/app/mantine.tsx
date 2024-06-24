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
        "#fff8e1",
        "#ffefcc",
        "#ffdd9b",
        "#ffca64",
        "#ffba38",
        "#ffb01b",
        "#ffab09",
        "#e39500",
        "#ca8500",
        "#af7100"
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
