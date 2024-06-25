import React from "react";
import { useController, useFormContext } from "react-hook-form";
import { isEvent } from "../utils";
import { useFieldConfiguration } from "./useFieldConfiguration";
import useFieldListener from "./useFieldListener";
import { isArrayEmpty } from "../utils/index";
// this will be used to return a combination of field context,field info,field state
export const useField = () => {
  const id = React.useId();
  const { name, onWatchFields } = useFieldConfiguration();
  const { control } = useFormContext();
  const listener =
    onWatchFields?.fields && !!isArrayEmpty(onWatchFields?.fields)
      ? useFieldListener
      : () => {};
  listener();

  const { fieldState, field, formState } = useController({
    name,
    control,
  });
  // console.log(formState.errors)

  return {
    id,
    formItemId: `${id}-form-item`,
    formILableId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...field,
    ...fieldState,
    onChange: (e: any) =>
      isEvent(e)
        ? field.onChange(e)
        : field.onChange({
            target: {
              value: e,
            },
          }),
    onFocus: async () => {
      return;
    },
    error: !!fieldState.error,
    helperText: fieldState.error?.message,
  };
};
