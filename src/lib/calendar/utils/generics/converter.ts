import dayjs, { ConfigType } from "dayjs";
import { SelectedDate } from "../../model";
import { Mode } from "../locals/types";

export function convertDate(
  selectedDate: SelectedDate | null,
  mode: Mode,
): Date | null {
  if (!selectedDate) return null;
  const type = mode === "EC" ? "ethiopian" : "gregorian";
  const { date, month, year } = selectedDate[type];
  const formattedDate = `${year}-${month}-${date}`;
  const convertedDate = dayjs(formattedDate);

  // If you need to convert to a specific timezone
  // const convertedDate = dayjs.utc(formattedDate).local();

  return convertedDate.toDate();
}
