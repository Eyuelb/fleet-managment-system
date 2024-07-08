import { useContext } from 'react';
import { EntityContext } from '../contexts';

export const useList = () => {
  const context = useContext(EntityContext);
  if (!context) {
    throw new Error('Must be used within a EntityProvider');
  }
  return context.dataProviders?.list;
};
export const useCreate = () => {
  const context = useContext(EntityContext);
  if (!context) {
    throw new Error('Must be used within a EntityProvider');
  }
  return context.dataProviders?.create;
};
export const useUpdate = () => {
  const context = useContext(EntityContext);
  if (!context) {
    throw new Error('Must be used within a EntityProvider');
  }
  return context.dataProviders?.update;
};
export const useDelete = () => {
  const context = useContext(EntityContext);
  if (!context) {
    throw new Error('Must be used within a EntityProvider');
  }
  return context.dataProviders?.delete;
};
export const useView = () => {
  const context = useContext(EntityContext);
  if (!context) {
    throw new Error('Must be used within a EntityProvider');
  }
  return context.dataProviders?.view;
};

