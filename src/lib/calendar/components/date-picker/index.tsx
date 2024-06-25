"use client";
import React, { useEffect, useState } from "react";
import {
  ActionIcon,
  Button,
  CloseButton,
  Combobox,
  Input,
  InputBase,
  InputBaseProps,
  TextInput,
  useCombobox,
} from "@mantine/core";
import { useClickOutside } from "@mantine/hooks";
import { TabSwitcher } from "../segmented-control";
import { Calendar } from "../calender";
import { convertDate } from "../../utils/generics/converter";
import { Mode } from "../../utils/locals/types";
import { SelectedDate } from "../../model";
import dayjs from "dayjs";
import { IconCalendar, IconX } from "@tabler/icons-react";
interface DatePickerProps extends Partial<InputBaseProps> {
  dataMode?: Mode;
  onChange: (value: Date | string | null) => void;
  value?: Date | string | null;
  label?: string;
  placeholder?: string;
  valueFormat?: string;
}

const DatePicker = ({
  onChange,
  value = "",
  label,
  placeholder,
  dataMode = "GC",
  valueFormat,
  ...props
}: DatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<SelectedDate | null>(null);

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const handleDateChange = (date: SelectedDate | null) => {
    console.log("handleDate", date);
    setSelectedDate(date);
    const cDate = valueFormat
      ? dayjs(convertDate(date, dataMode)).format(valueFormat)
      : convertDate(date, dataMode);
    onChange(cDate as Date);
    combobox.closeDropdown();
  };
  const handleDateClear = () => {
    setSelectedDate(null);
    onChange("");
  };

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      shadow="md"
      width={200}
      transitionProps={{ transition: "pop", duration: 200 }}
    >
      <Combobox.Target>
        <TextInput
          label={label}
          placeholder={placeholder}
          onFocus={(e) => {
            combobox.openDropdown();
          }}
          pointer
          readOnly
          value={value ? String(value) : ""}
          leftSection={
            <IconCalendar size={18} stroke={1.5} onClick={handleDateClear} />
          }
          rightSectionProps={{
            className: "cursor-pointer",
          }}
          rightSection={
            selectedDate && (
              <CloseButton
                size="sm"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => handleDateClear()}
                aria-label="Clear value"
              />
            )
          }
          size={props.size}
          className={props.className}
          styles={props.styles}
        />
      </Combobox.Target>
      <Combobox.Dropdown w={250}>
        <TabSwitcher
          key={String(combobox.dropdownOpened)}
          data={[
            {
              label: "Eng",
              value: "Eng",
              component: () => (
                <Calendar
                  key={String(value)}
                  mode={"GC"}
                  value={selectedDate}
                  onChange={handleDateChange}
                  hideHeaderButtons
                  initialDate={value ? dayjs(value).toDate() : undefined}
                />
              ),
            },
            {
              label: "Amh",
              value: "Amh",
              component: () => (
                <Calendar
                  key={String(value)}
                  mode={"EC"}
                  value={selectedDate}
                  onChange={handleDateChange}
                  locale={"AMH"}
                  initialDate={value ? dayjs(value).toDate() : undefined}
                  hideHeaderButtons
                />
              ),
            },
          ]}
        />
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default DatePicker;
