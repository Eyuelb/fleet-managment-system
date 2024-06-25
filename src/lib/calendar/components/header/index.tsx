import React from "react";
import { LanguageCode, Mode } from "../../utils/locals/types";
import {
  getDaysNameOfTheWeek,
  getMonthsName,
  languageNames,
} from "../../utils/locals";
import Select from "../select";
import { UnstyledButton } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

type DayProps = {
  currentDay: number;
  today: () => void;
  prev: () => void;
  next: () => void;
  month: number;
  year: number;
  locals: LanguageCode;
  mode: Mode;
  onModeChange?: (mode: Mode) => void;
  onLanguageChange?: (language: LanguageCode) => void;
  hideHeaderButtons?: boolean;
};

export const Header: React.FC<DayProps> = React.memo((props) => {
  const {
    currentDay,
    today,
    prev,
    next,
    month,
    year,
    locals = "AMH",
    mode,
    onModeChange,
    onLanguageChange,
    hideHeaderButtons,
  } = props;
  const styles: any = {};
  const languages = languageNames.map((item, index) => ({
    value: item.code,
    label: item.name,
  }));
  return (
    <div className=" flex flex-col gap-2">
      {/* EXTRA HEADER */}
      {!hideHeaderButtons && (
        <div className=" p-2 flex justify-between">
          {/* <SwitchMode theme={theme} mode={mode} onModeChange={onModeChange} /> */}
          <div style={styles.todayButton}>
            <button className="p-2" onClick={today}>
              {/* <p style={styles.todayText}>{currentDay}</p> */}
            </button>
          </div>
          {mode === "EC" && (
            <Select
              label=""
              value={locals}
              data={languages}
              onChange={onLanguageChange}
            />
          )}
        </div>
      )}

      <div className="px-2 flex justify-between">
        {/* BACKWARD THE MONTH */}
        <UnstyledButton onClick={prev} style={styles.arrow}>
          <IconChevronLeft size={18} />
        </UnstyledButton>

        <UnstyledButton h={"var(--dch-control-size)"} fz="xs" fw={500}>
          {getMonthsName({ locals, mode })[month - 1]} {year}
        </UnstyledButton>

        {/* FORWARD THE MONTH */}
        <UnstyledButton onClick={next} style={styles.arrow}>
          <IconChevronRight size={18} />
        </UnstyledButton>
      </div>

      {/* LIST OF DAYS OF THE WEEK */}
      <div className="grid grid-cols-7 mt-2">
        {getDaysNameOfTheWeek(locals).map((item, i) => (
          <p
            key={i}
            className="m_18a3eca mantine-DatePicker-weekday flex items-center justify-center"
          >
            {item}
          </p>
        ))}
      </div>
    </div>
  );
});

Header.displayName = "Header";
