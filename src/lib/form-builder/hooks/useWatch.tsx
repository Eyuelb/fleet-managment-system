import { useFormContext, useWatch } from "react-hook-form";
import { useDeepMemo } from "./useDeepMemo";

const useWatchFields = (names: string[]) => {
  const { control } = useFormContext();
  const values = useWatch({
    control,
    name: names,
  });
  return useDeepMemo(
    () =>
      values.map((value, i) => ({
        name: names[i],
        value,
      })),
    [values]
  );
};

export default useWatchFields;
