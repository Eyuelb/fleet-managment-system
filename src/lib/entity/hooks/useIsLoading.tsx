import { useContext } from 'react';
import { EntityContext } from '../contexts';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';

export const useIsLoading = () => {
  const context = useContext(EntityContext);
  if (!context) {
    throw new Error('Must be used within a EntityProvider');
  }
  const isMutating = useIsMutating();
  return isMutating === 1;
};
