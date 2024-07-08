import { ForwardRefExoticComponent, RefAttributes } from "react";

import { NumberInput, PasswordInput, Select, TextInput } from "@mantine/core";
import { Checkbox, MultiSelect, Textarea } from "@mantine/core";
import DatePicker from "../../../calendar/components/date-picker";
import { TimePicker } from "@components/common/time-picker";
import { MapAutocompleteInput } from "@components/google-map/components/autocomleteInput";

export type ReactProps = Record<string, any>;
export type ReactComponentWithRequiredProps<Props extends ReactProps> =
  | ((props: Props) => JSX.Element)
  | (ForwardRefExoticComponent<Props> & RefAttributes<unknown>);
export type MappingItem<PropType extends ReactProps> = readonly [
  ReactComponentWithRequiredProps<PropType>,
  PropType
];

type FieldsTypes =
  | "number"
  | "select"
  | "textarea"
  | "time"
  | "text"
  | "email"
  | "password"
  | "multi-select"
  | "checkbox"
  | "file"
  | "date"
  | "map-autocomplete-select";

type BaseFieldsTypes = {
  [key in FieldsTypes]: MappingItem<any>;
};
export const BaseFields: BaseFieldsTypes = {
  text: [TextInput, {}],
  email: [TextInput, {}],
  textarea: [Textarea, {}],
  password: [PasswordInput, {}],
  select: [Select, { placeholder: "Select" }],
  "multi-select": [MultiSelect, { placeholder: "Select" }],
  number: [NumberInput, { min: 1, allowNegative: false }],
  checkbox: [Checkbox, {}],
  file: [TextInput, {}],
  date: [DatePicker, { valueFormat: "YYYY-MM-DD" }],
  time: [TimePicker, {}],
  "map-autocomplete-select": [MapAutocompleteInput, {}],
};
