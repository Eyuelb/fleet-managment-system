import React,{memo} from 'react';
import { useSubmitButton } from '../../hooks/useSubmitButton';
import { FieldErrors, FieldValues, useFormContext } from 'react-hook-form';
import { FormComponent } from '../../model';

export const FormWrapper = memo(({
  className,
  children,
  onSubmitHandler,
  validOn,
  id,
}: FormComponent<FieldValues>): React.ReactNode => {
  const submitButtonRef = useSubmitButton();
  const { getValues, watch, handleSubmit } = useFormContext();

  const handleFormSubmit = (data: FieldValues) => {
    onSubmitHandler && onSubmitHandler(data);
  };

  const onError = (errors?: FieldErrors<any> | undefined) => {
    // if (errors) {
    //   const isValid =
    //     validOn &&
    //     (Array.isArray(validOn)
    //       ? validOn.every(
    //           field => getValues(field) && errors[field] === undefined,
    //         )
    //       : getValues(validOn) && errors[validOn] === undefined);

    //   if (isValid) {
    //     if (onSubmitHandler) {
    //       Array.isArray(validOn)
    //         ? onSubmitHandler(watch())
    //         : onSubmitHandler(getValues(validOn));
    //     }
    //   } else {
    //     // console.log({ errors, isValid });
    //   }
    // }
  };
  return (
    <form
      noValidate
      onSubmit={handleSubmit(handleFormSubmit, onError)}
      className={className}
    >
      {children}
      <input type="submit" id={id} ref={submitButtonRef} hidden />
      {/* <DevTool control={methods.control} /> */}
    </form>
  );
});

FormWrapper.displayName = 'FormWrapper';