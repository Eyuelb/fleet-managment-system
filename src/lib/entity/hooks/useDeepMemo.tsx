import React, { useMemo } from 'react';
import { useMemoized } from './useMemoized';

/**
 * Hook that memoizes the given dependency array and checks the consecutive calls with deep equality and returns the same value as the first call if dependencies are not changed.
 * @internal
 */
export const useDeepMemo = <T,>(
  fn: () => Exclude<T, void>,
  dependencies: React.DependencyList,
): T => {
  const memoizedDependencies = useMemoized(dependencies);

  const value = useMemo(fn, memoizedDependencies);

  return value;
};
