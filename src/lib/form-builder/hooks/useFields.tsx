import { useContext } from 'react';
import { FieldsContext } from '../contexts';
import { FieldType } from '../model';

export const useFields = () => {
  const context = useContext(FieldsContext);
  if (!context) {
    throw new Error(`useFields must be used within a FieldsProvider`);
  }
  return context.fields ?? [];
};

export const useGetField = (names: string | string[]):FieldType[] => {
  const fields = useFields();


  if (!fields || !Array.isArray(fields)) return [];

  if (Array.isArray(names)) {
    // If names is an array, return an array of field configurations
    return names
      .map(name => fields.find(field => field.name === name))
      .filter(Boolean) as FieldType[];
  } else {
    const field = fields.find(field => field.name === names);
    // If names is a string, return the field configuration for that name
    return field ? [field] : [];
  }
};
