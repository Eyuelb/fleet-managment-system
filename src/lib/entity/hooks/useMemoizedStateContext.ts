import { useContext } from "react";
import { MemoizedStateContext } from "../contexts";
import { MemoizedStateContextType } from "../model";

export const useMemoizedStateContext = <T>(): MemoizedStateContextType<T> => {
    const context = useContext(MemoizedStateContext);
    if (!context) {
      throw new Error('useMemoizedStateContext must be used within a MemoizedStateProvider');
    }
    return context as MemoizedStateContextType<T>;
  };