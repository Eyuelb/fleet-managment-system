import { DataSourceType } from "@/providers/DataSourceProvider";
import useQueryRequest from "@hooks/useQueryRequest";
import { Select, SelectProps, Skeleton } from "@mantine/core";
import formatData from "@utils/data-converter";
import React, { useMemo } from "react";

type Props = {
  dataSource: DataSourceType;
} & SelectProps;

const SelectFromDataSource = (props: Props) => {
  const { dataSource,className, ...other } = props;
  const { data: fetchedData, isLoading } = useQueryRequest<{ content: [] }>({
    url: dataSource?.url ?? "",
    queryKey: [dataSource?.key],
    ...dataSource,
    enabled: !!dataSource,
  });
  const memoData = useMemo(
    () =>
      formatData({
        data: fetchedData.content ? fetchedData.content : fetchedData,
        type: "options",
        valueKey: dataSource?.valueKey,
        labelKey: dataSource?.labelKey,
        placeHolderData: [],
      }),
    [fetchedData, dataSource]
  );
  
  return (
    <Skeleton
      visible={isLoading}
      className={className}
      mah={isLoading?36:''}
    >
      <Select placeholder="select" {...other} data={memoData} searchable  />
    </Skeleton>
  );
};

export default SelectFromDataSource;
