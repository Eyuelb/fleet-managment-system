import { useDeepMemo } from "./useDeepMemo";
import { useFieldConfiguration } from './useFieldConfiguration';
import formatData from "@utils/data-converter";
import { useGetDataSourceByKey } from "../../../providers/DataSourceProvider";
import useQueryRequest from "../../../hooks/useQueryRequest";

export const useSelect = () => {
  const field = useFieldConfiguration();

  const { data: manualData, name, dataSource } = field;

  const dataQuery = useGetDataSourceByKey(dataSource?.key);

  const { data: fetchedData, isLoading } = useQueryRequest({
    url: dataQuery?.url ?? "",
    queryKey: [dataQuery?.key, name],
    ...dataQuery,
    enabled: !!dataQuery,
  });
  const memoData = useDeepMemo(
    () => ({
      data: formatData({
        data: fetchedData,
        type: "options",
        valueKey: dataSource?.valueKey,
        labelKey: dataSource?.labelKey,
        placeHolderData: [],
      }),
      isLoading,
    }),
    [fetchedData, isLoading]
  );

  if (!dataQuery)
  return {
    data: manualData ?? [],
    isLoading: false,
  };

  return memoData;
};
