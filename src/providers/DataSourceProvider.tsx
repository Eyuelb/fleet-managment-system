"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { MethodType } from "../models/request";
import * as schema from "@db/schema";

export const DataSources = [
  {
    key: "roles",
    url: "/api/v1/roles",
    method: "GET",
    accessors: { valueKey: "id", labelKey: "name" },
  },
] as const;

type DataSourcesType = typeof DataSources;
type GlobalDataSourceKeyType = DataSourcesType[number]["key"];

export type DataSourcesKeys = GlobalDataSourceKeyType;
export type DataSourceType = {
  url?: string;
  method?: MethodType;
  key?: DataSourcesKeys;
  valueKey?: string;
  labelKey?: string;
};

// Create the context with a default value
const DataSourceContext = createContext<DataSourceType[] | undefined>(
  undefined
);

// Create the provider component
const DataSourceProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const DataSourceValue = JSON.parse(
    JSON.stringify(DataSources)
  ) as DataSourceType[];
  return (
    <DataSourceContext.Provider value={DataSourceValue}>
      {children}
    </DataSourceContext.Provider>
  );
};

// Custom hook for using the context
const useDataSource = () => {
  const context = useContext(DataSourceContext);
  if (!context) {
    throw new Error("useDataSource must be used within a DataSourceProvider");
  }
  return context;
};
const useGetDataSourceByKey = (key?: DataSourcesKeys) => {
  const context = useContext(DataSourceContext);
  if (!context) {
    throw new Error("Must be used within a EntityProvider");
  }
  if (!key) return null;
  const dataSourceItem = context.find((item) => item.key === key);

  return dataSourceItem;
};
export { DataSourceProvider, useDataSource, useGetDataSourceByKey };
