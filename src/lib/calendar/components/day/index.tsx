import { UnstyledButton } from "@mantine/core";
import React from "react";

type DayProps = {
  dayNumber: number;
  today?: boolean;
  extraDays?: boolean;
  selected?: boolean;
  onClick?: () => void;
};

export const Day: React.FC<DayProps> = React.memo((props) => {
  const { dayNumber, today, extraDays, onClick, selected } = props;
  return (
    <UnstyledButton
      className={`mantine-focus-auto m_396ce5cb mantine-DatePicker-day m_87cf2631 mantine-UnstyledButton-root 
       ${today ? " border" : ""}
      `}
      style={{
      boxShadow:today ? "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px" : "",
      backgroundColor:today ? selected?"":"#f4f4f5" : ""

      }}
      disabled={extraDays}
      onClick={onClick}
      {...(selected ? { "data-selected": "true" } : {})}
      c={selected ? today?"white":"white" : "inherit"}
    >
      {dayNumber}
    </UnstyledButton>
  );
});
Day.displayName = "Day";
