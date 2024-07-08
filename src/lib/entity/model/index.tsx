import { FieldType } from "@lib/form-builder/model";
import { MethodType } from "@models/request";
import { UseMutationOptions } from "@tanstack/react-query";
import { MRT_RowData, MRT_TableOptions } from "mantine-react-table";

export enum EntityOperations {
  Create = "create",
  Update = "update",
  View = "view",
  List = "list",
}

export type RequestQueryProps<T> = {
  url: (data?: any) => string;
  method?: "GET" | "POST";
  dataType?: "paginated" | "un-paginated" | undefined;
  params?: {
    [key: string]: any;
  };
  placeholder?: T;
  enabled?: boolean;
};

export interface MutationRequestProps<T, Args = any>
  extends UseMutationOptions<T, any, Args> {
  url: (data?: any) => string;
  method?: MethodType;
  params?: {
    [key: string]: any;
  };
  dataType?: "paginated" | "un-paginated" | undefined;
  placeholder?: T;
  enabled?: boolean;
  massage?: {
    success?: string;
    error?: string;
  };
  queryKey?: string;
}

//context

export interface Actions {
  isCreate?: boolean;
  isUpdate?: boolean;
  isList?: boolean;
  isView?: boolean;
  isDelete?: boolean;
}
export interface EntityState {
  resource: string;
}
export interface DataProviders<T> {
  list?: RequestQueryProps<T>;
  create?: RequestQueryProps<T> | MutationRequestProps<T>;
  update?: RequestQueryProps<T> | MutationRequestProps<T>;
  delete?: RequestQueryProps<T> | MutationRequestProps<T>;
  view?: RequestQueryProps<T>;
  global?: RequestQueryProps<T>[];
}
export interface Table<TData extends MRT_RowData> extends Partial<MRT_TableOptions<TData>> {
  accessorKey?: string;
  configs?: {
    enableRowSelection?: boolean;
    enableSelectAll?: boolean;
  };
  renderActions?: (data: any) => React.ReactNode;
}
export interface Form<T extends Record<string, any>> {
  fields?: FieldType<T>[];
  defaultValues: T; // Infer the type of defaultValues from the passed data
  isLoading?: boolean;
  submitBtnLabel?: string;
  className?: string;
  clearButtonLabel?: string;
  readonly?: string[];
  fWrapperClassName?: string;
  title?: {
    create?: string;
    update?: string;
  };
}

export type CustomPagesContextType = {
  view?: {
    render?: () => React.ReactNode;
  };
  create?: {
    render?: () => React.ReactNode;
  };
  update?: {
    render?: () => React.ReactNode;
  };
  list?: {
    render?: () => React.ReactNode;
  };
};

export type MemoizedState<T> = {
  state: T;
  setState: React.Dispatch<React.SetStateAction<T>>;
  resetState: () => void;
  updateState: (callback: (prevState: T) => T) => void;
};

// Define the context type
export type MemoizedStateContextType<T> = MemoizedState<T>;
