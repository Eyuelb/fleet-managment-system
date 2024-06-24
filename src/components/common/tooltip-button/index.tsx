import {
  ActionIcon,
  ButtonProps,
  ThemeIcon,
  ThemeIconProps,
  Tooltip,
  UnstyledButton,
} from '@mantine/core';
import React, { memo, useState } from 'react';

interface TooltipButtonProps extends ThemeIconProps {
  tooltip?: string;
  disabled?: boolean;
}

const TooltipButton: React.FC<TooltipButtonProps> = memo(
  ({ tooltip, ...props }) => {
    return (
      <Tooltip label={tooltip} fz={12} arrowSize={6} offset={5} withArrow>
        <ThemeIcon
          component={ActionIcon}
          {...props}
          aria-disabled={props.disabled}
        />
      </Tooltip>
    );
  },
);
TooltipButton.displayName = 'TooltipButton';
export default TooltipButton;
