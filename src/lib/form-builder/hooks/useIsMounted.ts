'use client';

import { useEffect, useState } from 'react';

export function useIsMounted() {
  const [isMounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return isMounted;
}
