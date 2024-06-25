import React, { useContext } from 'react';
import { FieldContext } from '../contexts';

export const useFieldConfiguration = () => {
  const context = useContext(FieldContext);
  if (!context) {
    throw new Error(`useFieldConfiguration must be used within a FieldPropsProvider`);
  }
  return context;
};
