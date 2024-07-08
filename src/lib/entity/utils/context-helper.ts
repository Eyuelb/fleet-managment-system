import { createContext } from 'react';

export function combineContext<T extends { [key: string]: any }>(contexts: {
  [K in keyof T]: React.Context<T[K]>;
}) {
  const combined: Partial<T> = {};

  const combinedValue = () => {
    Object.keys(contexts).map(context => {
      const value = {
        [context]: contexts[context].Consumer['_currentValue' as T[string]],
      };
      Object.assign(combined, value);
    });
    return combined as T;
  };
  return createContext<Partial<T> | undefined>(combinedValue());
}
