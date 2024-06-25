import React, { useMemo, useRef } from "react";
import isEqual from "lodash/isEqual";

/**
 * Hook that memoizes the given dependency array and checks the consecutive calls with deep equality and returns the same value as the first call if dependencies are not changed.
 * @internal
 */
export const useDeepMemo = <T,>(
  fn: () => Exclude<T,void>,
  dependencies: React.DependencyList
): T => {
  const memoizedDependencies = useMemoized(dependencies);

  const value = useMemo(fn, memoizedDependencies);

  return value;
};

/**
 * Hook that memoizes the given value with deep equality.
 * @internal
 */
export const useMemoized = <T = unknown,>(value: T): T => {
  const ref = useRef(value);

  if (!isEqual(ref.current, value)) {
    ref.current = value;
  }

  return ref.current;
};
