import React, { ContextType, createContext, PropsWithChildren } from 'react';
import { EntityContext, MemoizedStateContext } from '../contexts';
import PageLayout from '../components/page-layout/index';
import { useMemoizedState } from '../hooks/useMemoizedState';

type ContextValue = ContextType<typeof EntityContext>;

const EntityProvider: React.FC<PropsWithChildren<ContextValue>> = ({
  children,
  ...props
}) => {
  return (
    <EntityContext.Provider value={props}>
      <PageLayout />
    </EntityContext.Provider>
  );
};
const MemoizedStateProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const state = useMemoizedState<unknown>(null); // Change {} to your initial state

  return (
    <MemoizedStateContext.Provider value={{...state}}>
      {children}
    </MemoizedStateContext.Provider>
  );
};

export { EntityProvider,MemoizedStateProvider };
