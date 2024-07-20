'use client';

import { Anchor, Box, Card } from '@mantine/core';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeTab, setActiveTab] = useState('login');
  const handleTabChange = (tab: string) => setActiveTab(tab);
  const [currentPath, setCurrentPath] = useState('');
  useEffect(() => {
    setCurrentPath(window.location.pathname);
    if (currentPath === '/auth/login') {
      setActiveTab('login');
    }
    if (currentPath === '/auth/signup') {
      setActiveTab('signup');
    }
  }, []);

  return (
    <Box className="container mx-auto h-full max-w-[550px] pt-20">
      <Card className="container mx-auto p-7" shadow="sm">
        {currentPath === '/auth/login' || currentPath === '/auth/signup' ? (
          <div className="mb-5 mt-4 text-center">
            <Link href="/auth/login">
              <Anchor
                className={`fullWidth ${activeTab === 'login' ? 'bg-primary-9 text-white' : 'bg-primary-1 text-black'} ml-auto rounded-l-md border-0 p-2 px-12`}
                onClick={() => {
                  handleTabChange('login');
                }}
                style={{ textDecoration: 'none' }}
              >
                Login
              </Anchor>
            </Link>
            <Link href="/auth/signup">
              <Anchor
                className={`fullWidth ${activeTab === 'signup' ? 'bg-primary-9 text-white' : 'bg-primary-1 text-black'} ml-auto rounded-r-md border-0 p-2 px-12`}
                onClick={() => handleTabChange('signup')}
                style={{ textDecoration: 'none' }}
              >
                Signup
              </Anchor>
            </Link>
          </div>
        ) : null}
        {children}
      </Card>
    </Box>
  );
}