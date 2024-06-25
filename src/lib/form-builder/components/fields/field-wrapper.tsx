import React, { memo, useEffect } from "react";

import { useField } from "../../hooks/useField";
import { useSelect } from "../../hooks/useSelect";
import { BaseFields } from "../custom-fields";
import { FieldLabel } from "./field-label";
import { FieldDescription } from "./field-description";
import { FieldMessage } from "./field-message";
import { useDeepMemo } from "../../hooks/useDeepMemo";
import { useFieldConfiguration } from "../../hooks/useFieldConfiguration";
import ReactNode from "react";

const FieldWrapper: React.FC = memo(() => {
  const field = useField();
  const {
    type,
    defaultValue,
    label,
    description,
    hidden,
    disabled,
    componentProps,
    placeholder,
  } = useFieldConfiguration();

  const { data, isLoading } = useSelect();
  const memoData = useDeepMemo(() => ({ ...(data ? { data } : {}) }), [data]);

  const {
    formItemId,
    onBlur,
    onChange,
    onFocus,
    value,
    helperText,
    error,
    isDirty,
  } = useDeepMemo(() => field, [field]);

  const Component = BaseFields[type] ? (BaseFields[type][0] as any) : "input";
  const inProps = BaseFields[type][1];

  const props = {
    id: formItemId,
    defaultValue,
    hidden,
    disabled,
    placeholder,
    ...inProps,
    ...componentProps,
    ...memoData,
    onBlur,
    onChange,
    onFocus,
    value: value === null ? undefined : value,
    error,
  };
  const memoProps = useDeepMemo(() => props, [props]);

  // useEffect(() => {
  //   console.log({ label, memoProps });
  //   return () => {};
  // }, [memoProps]);

  return (
    <div className="form-field" hidden={hidden}>
      <FieldLabel>{label}</FieldLabel>
      <FieldDescription>{description}</FieldDescription>
      <Component {...memoProps} />
      <FieldMessage />
    </div>
  );
});
FieldWrapper.displayName = "FieldWrapper";
export { FieldWrapper };
