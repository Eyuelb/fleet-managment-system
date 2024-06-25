import React, { useMemo, useState } from "react";
import type { LanguageCode, Mode } from "../utils/locals/types";
import { EthiopianCalender } from "./EthiopianCalendar";
import { SelectedDate } from "../model";
import { GregorianCalendar } from "./GregorianCalender";

type Props = {
  /**
   * set to 'EC' or 'GC' to switch between Gregorian calendar & Ethiopian calendar.
   * the default value is EC
   * @type {Mode}
   */
  mode?: Mode;
  /**
   * to change the language of days names and months names.
   * the default 'ENG' for Gregorian calendar & 'AMH' for Ethiopian calendar.
   * @type {LanguageCode}
   */
  locale?: LanguageCode;
  /**
   * to hide switch mode & change language dropdowns.
   *
   * @type {boolean}
   */
  hideHeaderButtons?: boolean;
  /**
   * a callback gets executed when date press event is fired.
   *
   */
  onChange: (date: SelectedDate) => void;
  /**
   * a callback invoked on mode change.
   *
   */
  onModeChange?: (mode: Mode) => void;
  /**
   * a callback invoked on language change.
   *
   */
  onLanguageChange?: (language: LanguageCode) => void;
  /**
   * if this prop is not set, the calendar will start from current month.
   * ONLY GREGORIAN DATE
   * @type {Date}
   */
  initialDate?: Date;

  value?: SelectedDate | null;
};

export const Calendar: React.FC<Props> = React.memo((props) => {
  const {
    mode = "EC",
    locale = "AMH",
    onChange,
    onModeChange,
    onLanguageChange,
    hideHeaderButtons,
    initialDate,
    value,
  } = props;

  const [selectedDate, setSelectedDate] = useState<SelectedDate | null>(
    value ?? null
  );

  const memoValue = useMemo(() => selectedDate, [selectedDate,initialDate]);

  if (mode === "EC")
    return (
      <EthiopianCalender
        date={
          initialDate && {
            year: initialDate.getFullYear(),
            month: initialDate.getMonth() + 1,
            day: initialDate.getDate(),
          }
        }
        locale={locale}
        onChange={onChange}
        onModeChange={onModeChange}
        onLanguageChange={onLanguageChange}
        hideHeaderButtons={hideHeaderButtons}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    );
  return (
    <GregorianCalendar
      date={
        initialDate && {
          year: initialDate.getFullYear(),
          month: initialDate.getMonth() + 1,
          day: initialDate.getDate(),
        }
      }
      onChange={onChange}
      onModeChange={onModeChange}
      hideHeaderButtons={hideHeaderButtons}
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
    />
  );
});

Calendar.displayName = "Calendar";
