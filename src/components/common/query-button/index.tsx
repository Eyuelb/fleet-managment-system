import useMutationRequest from "@hooks/useMutationRequest";
import { MethodType } from "@models/request";
import React, { useEffect, useTransition } from "react";


type AsProp<C extends React.ElementType> = {
  as?: C;
};

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

// This is the first reusable type utility we built
type PolymorphicComponentProp<
  C extends React.ElementType,
  Props = {}
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

// This is a new type utitlity with ref!
type PolymorphicComponentPropWithRef<
  C extends React.ElementType,
  Props = {}
> = PolymorphicComponentProp<C, Props> & { ref?: PolymorphicRef<C> };

// This is the type for the "ref" only
type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>["ref"];

/**
 * This is the updated component props using PolymorphicComponentPropWithRef
 */
type ComponentProps<C extends React.ElementType> =
  PolymorphicComponentPropWithRef<
    C,
    {
      method?: MethodType;
      url?: string;
      body?: any;
      queryKey?: string[];
      hidden?: boolean;
      massage?: {
        success?: string;
        error?: string;
      };
      enabled?: boolean;
      onClick?: () => void;
      onSuccess?:
        | ((data: unknown, variables: unknown, context: unknown) => unknown)
        | undefined;
      onError?:
        | ((error: any, variables: unknown, context: unknown) => unknown)
        | undefined;
      disabled?: boolean;
    }
  >;

/**
 * This is the type used in the type annotation for the component
 */
type ComponentType = <C extends React.ElementType = "button">(
  props: ComponentProps<C>
) => React.ReactNode | null;

const QueryButton: ComponentType = React.forwardRef(
  <C extends React.ElementType = "button">(
    {
      as,
      children,
      method = "POST",
      queryKey,
      url = "/",
      body,
      massage = {
        success: "Success",
        error: "Error",
      },
      hidden,
      enabled,
      onClick,
      onError,
      onSuccess,
      ...props
    }: ComponentProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const [isPending, startTransition] = useTransition();
    const { mutate } = useMutationRequest({
      url,
      queryKey,
      method,
      massage,
      enabled,
      onSuccess,
      onError,
    });
    const Component = as || "button";
    const handleOnclick = () => {
      startTransition(() => {
        mutate(body);
        onClick && onClick();
      });
    };
    return (
      <Component hidden={hidden} {...props} onClick={handleOnclick} ref={ref}>
        {children}
      </Component>
    );
  }
);

//@ts-ignore
QueryButton.displayName = "queryButton";

export default QueryButton;
