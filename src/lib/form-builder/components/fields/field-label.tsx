import React, { memo, forwardRef } from "react";
import { useField } from "../../hooks/useField";
import { cn } from "../../utils";
import { useFieldConfiguration } from "../../hooks/useFieldConfiguration";

const FieldLabel = memo(
  forwardRef<HTMLLabelElement, React.HTMLAttributes<HTMLLabelElement>>(
    ({ className, children, ...props }, ref) => {
      const { error, formItemId } = useField();
      const { label } = useFieldConfiguration();
      const body = label ? String(label) : children;

      return (
        <label
          ref={ref}
          style={{
            fontSize: "var(--input-label-font-size)",
          }}
          className={cn(error && "text-destructive", className)}
          htmlFor={formItemId}
          {...props}
        >
          {body}
        </label>
      );
    }
  )
);
FieldLabel.displayName = "FieldLabel";

export { FieldLabel };
