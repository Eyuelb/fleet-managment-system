import React, { ChangeEvent } from 'react';

interface Option<T> {
  label: any;
  value: T;
}

interface SelectProps<T> {
  label: string;
  value: T;
  onChange?: (selectedValue: T) => void;
  data: Option<T>[];
}

const SelectField = <T extends any>({
  label,
  value,
  onChange,
  data,
}: SelectProps<T>) => {
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value as unknown as T;
    onChange&&onChange(selectedValue);
  };

  return (
    <div>
      <label>{label}</label>
      <select value={value as string} onChange={handleSelectChange}>
        {data.map((option, index) => (
          <option key={index} value={option.value as string}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
