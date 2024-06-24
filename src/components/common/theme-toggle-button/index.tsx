'use client';
import {
  ThemeIconProps,
  ThemeIcon,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';
import React, { memo, useMemo } from 'react';
import { useIsMounted } from '@hooks';

type Props = ThemeIconProps;

export const ThemeToggleButton = memo((props: Props) => {
  const isMounted = useIsMounted();
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', {
    getInitialValueInEffect: true,
  });
  const color = useMemo(() => computedColorScheme, [computedColorScheme]);
  const icon =
    isMounted && color === 'dark' ? (
      <IconSun size={20} color="yellow" stroke={1.6} />
    ) : (
      <IconMoon size={20} color="gray" stroke={1.6} />
    );
  return (
    <ThemeIcon
      className=" cursor-pointer"
      onClick={() => setColorScheme(color === 'light' ? 'dark' : 'light')}
      variant="light"
      {...props}
      autoContrast
    >
      {icon}
    </ThemeIcon>
  );
});
ThemeToggleButton.displayName = 'ThemeToggleButton';

