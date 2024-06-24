import React from 'react';
import { Sidebar, SidebarItem } from './common';
import { AppShell, ScrollArea } from '@mantine/core';
import { IconHome, IconSettings, IconUser } from '@tabler/icons-react';
import { iconDefaultProps } from '../../../config/icon';
const sidebarItems: SidebarItem[] = [
  {
    label: 'Home',
    link: '/',
    icon: <IconHome {...iconDefaultProps}/>,
  },
  {
    label: 'Profile',
    link: '/profile',
    icon: <IconUser {...iconDefaultProps}/>,
  },
  {
    label: 'Settings',
    icon: <IconSettings {...iconDefaultProps}/>,
    items: [
      {
        label: 'Account',
        link: '/settings/account',
      },
      {
        label: 'Security',
        link: '/settings/security',
      },
    ],
  },
];
export const SidebarLayout = () => {
  return (
    <Sidebar>
      <AppShell.Section>
        <Sidebar.Header></Sidebar.Header>
      </AppShell.Section>
      <AppShell.Section grow my="md" component={ScrollArea}>
        <Sidebar.Items items={sidebarItems} />
      </AppShell.Section>

      <AppShell.Section>
        <Sidebar.Footer></Sidebar.Footer>
      </AppShell.Section>
    </Sidebar>
  );
};
