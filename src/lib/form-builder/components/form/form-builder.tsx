"use client";
import React, { memo } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { FormWrapper } from "./form-wrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { contractDefaultValue } from "../../utils";
import { constructSchema } from "../../schema";
import { FormBuilderProps } from "../../model";
import { Fields } from "../fields";
import { useDeepMemo } from "../../hooks/useDeepMemo";
import Button from "../button";
import { LoadingOverlay } from "@mantine/core";

export const FormBuilder: React.FC<FormBuilderProps<FieldValues>> = memo(
  ({
    fields,
    onSubmit,
    defaultValues,
    className,
    isLoading,
    buttonProps,
    buttonWrapperProps,
    renderActionButton,
    title,
    children
  }) => {
    const Schema = constructSchema(fields);
    const generatedDValue = contractDefaultValue(fields);

    const form = useForm({
      resolver: zodResolver(Schema),
      defaultValues: { ...generatedDValue, ...defaultValues },
    });
    const memoForm = useDeepMemo(() => form, [form]);
    return (
      <FormProvider {...memoForm}>
        <LoadingOverlay visible={isLoading} />

        <FormWrapper onSubmitHandler={onSubmit} className={className}>
          <div className="w-full">{title}</div>
          <Fields fields={fields} />
          {children}
          {renderActionButton ? (
            renderActionButton
          ) : (
            <div {...buttonWrapperProps}>
              <Button type="submit" {...buttonProps} />
            </div>
          )}
        </FormWrapper>
      </FormProvider>
    );
  }
);

FormBuilder.displayName = "FormBuilder";
