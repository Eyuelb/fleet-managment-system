"use client";
import { createContext } from "react";
import { combineContext } from "../utils/context-helper";
import {
  Actions,
  DataProviders,
  EntityState,
  Form,
  MemoizedStateContextType,
  Table,
  CustomPagesContextType,
} from "../model";

const ActionsContext = createContext<Actions | undefined>(undefined);
const EntityStateContext = createContext<EntityState | undefined>(undefined);
const DataProvidersContext = createContext<DataProviders<any> | undefined>(
  undefined
);
const TableContext = createContext<Table<any> | undefined>(undefined);
const FormContext = createContext<Form<any> | undefined>(undefined);
const FilterContext = createContext<Form<any> | undefined>(undefined);

const CustomPagesContext = createContext<CustomPagesContextType | undefined>(undefined);

export const MemoizedStateContext = createContext<
  MemoizedStateContextType<any> | undefined
>(undefined);

const EntityContext = combineContext({
  actions: ActionsContext,
  state: EntityStateContext,
  dataProviders: DataProvidersContext,
  table: TableContext,
  form: FormContext,
  filter: FilterContext,
  customPages: CustomPagesContext
});

export { EntityContext, ActionsContext, EntityStateContext };
