import { useContext } from 'react';
import { EntityContext } from '../contexts';

export const useResource = () => {
  const context = useContext(EntityContext);
  if (!context) {
    throw new Error('Must be used within a EntityProvider');
  }
  return context.state?.resource;
};
