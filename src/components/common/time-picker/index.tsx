"use client"
import React, { useRef } from 'react';
import { DatesProvider, TimeInput } from '@mantine/dates';
import { ActionIcon } from '@mantine/core';
import { IconClock } from '@tabler/icons-react';

interface Props {
  classes?: {
    root: string;
    select: string;
  };
  value?: string;
  onChange: (value: string) => void;
  label?: React.ReactNode;
  placeholder?: string;
  error?: boolean | undefined;
  helperText?: React.ReactNode;
  disabled?: boolean | undefined;
}

export const TimePicker = ({
  classes,
  helperText,
  error,
  value,
  ...otherProps
}:Props) => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <DatesProvider settings={{
      timezone:'UTC',
    }}>

    <TimeInput
    label={otherProps.label}
    value={value ?? ''}
    onChange={e =>
      otherProps?.onChange &&
      otherProps?.onChange(e.currentTarget.value ?? '')
    }
    disabled={otherProps.disabled}
    error={error && <span>{helperText}</span>}
    rightSection={
      <ActionIcon
        variant="subtle"
        color="gray"
        onClick={() => ref.current?.showPicker()}
      >
        <IconClock size={18}/>
      </ActionIcon>
    }
    ref={ref}
    
  />
      </DatesProvider>

  );
};
