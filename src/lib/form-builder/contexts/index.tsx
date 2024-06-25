"use client"
import React, { createContext, PropsWithChildren } from 'react';
import { FieldsType, FieldType } from '../model';
import { useDeepMemo } from '../hooks/useDeepMemo';

export const FieldsContext = createContext<FieldsType | undefined>(undefined);

// Define a context for the field props
export const FieldContext = createContext<FieldType | undefined>(undefined);

export const FieldsProvider: React.FC<PropsWithChildren<FieldsType>> = ({
  children,
  fields,
}) => {
  const value = useDeepMemo(() => fields, [fields]);

  return (
    <FieldsContext.Provider
      value={{
        fields: value,
      }}
    >
      {children}
    </FieldsContext.Provider>
  );
};
export const FieldPropsProvider: React.FC<PropsWithChildren<FieldType>> = ({
  children,
  ...props
}) => {
  const value = useDeepMemo(() => props, [props]);
  return (
    <FieldContext.Provider value={value}>{children}</FieldContext.Provider>
  );
};
