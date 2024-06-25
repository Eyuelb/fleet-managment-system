import React, { memo, forwardRef } from 'react';
import { useField } from "../../hooks/useField";
import { cn } from "../../utils";

const FieldMessage = memo(forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId,helperText } = useField();
  const body = error ? String(helperText) : children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn(
        'text-[0.8rem] font-medium text-destructive',
        `${error ? 'text-red-600' : ''}`,
        className,
      )}
      {...props}
    >
      {body}
    </p>
  );
}));
FieldMessage.displayName = 'FieldMessage';

export {FieldMessage};