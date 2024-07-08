"use client"
import React, { useState as useStateBase } from 'react';
import { useDeepMemo } from './useDeepMemo';
import { MemoizedState } from '../model';

export const useMemoizedState = <T>(initialState: T):MemoizedState<T> => {
    const [$state, setState] = useStateBase<T>(initialState);
    //@ts-ignore
    const state = useDeepMemo(() => $state as T, [$state]);
  
    // Reset state to its initial value
    const resetState = () => setState(initialState);
  
    // Update state based on previous state using a callback function
    const updateState = (callback: (prevState: T) => T) =>
      setState(prevState => callback(prevState));
  
    return { state, setState, resetState, updateState };
  };