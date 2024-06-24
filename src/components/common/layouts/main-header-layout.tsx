import { Box, Burger, Container, Flex, Group } from '@mantine/core';
import React, { useContext } from 'react';
import { ThemeToggleButton } from '../theme-toggle-button';
import { AppLayoutContext } from './main-layout';

const MainHeaderLayout = () => {
  const { sideBarOpened, toggleSidebar } = useContext(AppLayoutContext);

  return (
    <Box
      size="xl"
      px="md"
      className="w-full flex items-center justify-between h-full"
    >
      <Group gap={2}>
      </Group>

      <Group gap={2}>
        <ThemeToggleButton />
        <Burger
          opened={sideBarOpened}
          onClick={toggleSidebar}
          hiddenFrom="sm"
          size="sm"
        />
      </Group>
    </Box>
  );
};

export { MainHeaderLayout };
