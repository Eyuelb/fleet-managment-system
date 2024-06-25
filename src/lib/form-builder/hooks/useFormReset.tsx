import React from "react";
import { useFormContext } from "react-hook-form";
import { useField } from './useField';
// this will be used to return a combination of field context,field info,field state
export const useFormReset = () => {
    const fieldContext = useField();
    const { getFieldState, formState,reset } = useFormContext();
    const fieldState = getFieldState(fieldContext?.name ?? '', formState);
    const id = React.useId();

    
    return reset
  };