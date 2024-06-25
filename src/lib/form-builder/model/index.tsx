import React, { PropsWithChildren } from "react";
import { FieldPath, FieldValues, SubmitHandler } from "react-hook-form";
import { BaseFields } from "../components/custom-fields";
import { ConditionType } from "../schema";
import { ButtonProps } from "../components/button/type";
import { DataSourceType } from "../../../providers/DataSourceProvider";

export interface FieldOption {
  label: string;
  value: any;
}
export type FieldComponentTypes = keyof typeof BaseFields;
export type FormatterValuesProps = FieldType&{
  value:any
}
export type FieldType<T = any> = {
  name: string;
  label?: string;
  type: FieldComponentTypes; // Define the allowed field types
  description?: string;
  placeholder?: string;
  defaultValue?: T;
  disabled?: boolean;
  hidden?: boolean;
  condition?: [ConditionType] | ConditionType[];
  onWatchFields?: {
    fields: string[];
    formatter?: (
      values: FormatterValuesProps[],
      fn: {
        getSelectedValue: (
          data: any,
          value: any,
          by?: "label" | "value"
        ) => string;
      }
    ) => string | number;
  };

  //array fields
  data?: FieldOption[];
  dataSource?: DataSourceType;
  componentProps?: any;
};
export type FormBuilderProps<T extends FieldValues> = {
  fields: FieldType[];
  onSubmit: (data: T) => void;
  defaultValues?: T;
  className?: string;
  isLoading?: boolean;
  buttonProps?: ButtonProps;
  buttonWrapperProps?: React.HTMLAttributes<HTMLDivElement>;
  renderActionButton?: React.ReactNode;
  title?: string | React.ReactNode;
};

export type onChangeAdapterProps = {
  event: React.ChangeEvent<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >;
  type: FieldType["type"];
};

export interface FormComponent<TFormValues extends FieldValues = {}>
  extends PropsWithChildren {
  className?: string;
  onSubmitHandler?: SubmitHandler<TFormValues>;
  validOn?: FieldPath<TFormValues> | FieldPath<TFormValues>[];
  id?: string;
}

export type FieldsType<T = any> = {
  fields: FieldType<any>[];
};
