import { useContext } from 'react';
import { EntityContext } from '../contexts';

export const useFormFields = () => {
  const context = useContext(EntityContext);
  if (!context) {
    throw new Error('Must be used within a EntityProvider');
  }
  return context.form?.fields ?? [];
};
