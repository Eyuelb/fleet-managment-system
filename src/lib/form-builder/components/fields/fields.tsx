import React, { memo } from 'react';
import { FieldsType } from '../../model';
import { FieldPropsProvider, FieldsProvider } from '../../contexts';
import { FieldWrapper } from './field-wrapper';

export const Fields = memo(({ fields }: FieldsType) => {
  return (
    <FieldsProvider fields={fields}>
      {fields.map((field, index) => (
        <FieldPropsProvider key={field.name + index} {...field}>
          <FieldWrapper />
        </FieldPropsProvider>
      ))}
    </FieldsProvider>
  );
});

Fields.displayName = 'Fields';