import React, { memo, forwardRef } from 'react';
import { useField } from '../../hooks/useField';
import { cn } from '../../utils';

const FieldDescription = memo(
  forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
    ({ className, ...props }, ref) => {
      const { formDescriptionId } = useField();

      return (
        <p
          ref={ref}
          id={formDescriptionId}
          className={cn(
            'text-[0.8rem] text-muted-foreground opacity-[0.6]',
            className,
          )}
          {...props}
        />
      );
    },
  ),
);
FieldDescription.displayName = 'FieldDescription';

export { FieldDescription };
