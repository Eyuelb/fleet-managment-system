import {
  useCallback,
  useMemo,
  useEffect,
  useRef,
  useLayoutEffect,
  cache,
} from 'react';
import { useSyncExternalStore } from 'react';
import { authEndpoints, BaseUrl } from './auth.consts';
import logger from '@/utils/logger';

const isBrowser = typeof window !== 'undefined';

export const useIsomorphicLayoutEffect = !isBrowser
  ? useEffect
  : useLayoutEffect;

export type StateData<Data = any, Error = any> = {
  data?: Data;
  error?: Error;
  isFetched?: boolean;
  isLoading?: boolean;
};

export type State<Data = any, Error = any> = {
  [key: string]: StateData<Data, Error>;
};
type Store<Data> = {
  state: State<Data>;
  setState: (key: string, newState: Partial<StateData<Data>>) => void;
  subscribe: (listener: () => void) => () => void;
  getSnapshot: () => State<Data>;
};

const createStore = <Data,>(initialState: State<Data>): Store<Data> => {
  let state = initialState;
  const listeners = new Set<() => void>();

  const setState = (key: string, newState: Partial<StateData<Data>>) => {
    state = {
      ...state,
      [key]: { ...state[key], ...newState },
    };
    listeners.forEach((listener) => listener());
  };

  const subscribe = (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  const getSnapshot = () => state;

  return { state, setState, subscribe, getSnapshot };
};

const initialState: State = {};

export const authStore = createStore;
const { setState, subscribe, getSnapshot } = authStore(
  initialState
) as Store<any>;

type MutateParams<P> = {
  payload: P;
};
type RequestKey = (typeof authEndpoints)[number]['key'];
export const useAuthRequester = <Data, P = any, E = Error>({
  key,
  type,
  onSuccess,
  initialValue,
  onError,
}: {
  key: RequestKey;
  type?: 'query' | 'mutation';
  onSuccess?: (data: Data) => void;
  onError?: (data: E) => void;
  initialValue?: Data;
}) => {
  const syncStoreState = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getSnapshot
  );
  const storeState = useMemo(
    () => syncStoreState[key] || {},
    [syncStoreState, key]
  );
  const initialMountedRef = useRef(false);
  const unmountedRef = useRef(false);

  const config = useMemo(
    () => authEndpoints.find((entry) => entry.key === key) as any,
    [key]
  );

  if (!config) {
    throw new Error(`No configuration found for key: ${key}`);
  }
  const callbacks = useMemo(
    () => ({
      onStart: () => {
        if (!unmountedRef.current) {
          // logger.log('Fetching started');
          setState(key, { isLoading: true, error: null });
        }
      },
      onEnd: () => {
        if (!unmountedRef.current) {
          // logger.log('Fetching ended');
          setState(key, { isLoading: false });
        }
      },
      onSuccess: (data: Data) => {
        if (!unmountedRef.current) {
          // logger.log('Fetch successful', data);
          setState(key, {
            data: data,
            isFetched: true,
          });
          onSuccess && onSuccess(data);
        }
      },
      onError: (error: any) => {
        if (!unmountedRef.current) {
          logger.error('Fetch error', error);
          setState(key, { error: error as Error });
          onError && onError(error);
        }
      },
    }),
    [key, onSuccess, onError]
  );
  const fetchE = useCallback(
    async (params?: MutateParams<P>) => {
      //    if (storeState.isFetched) return;

      const body = params?.payload;
      const { endpoint, method } = config;
      const url = `${BaseUrl}${endpoint}`;
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      const fetchConfig: RequestInit = {
        method,
        headers,
      };

      if (method === 'POST') {
        fetchConfig.body = JSON.stringify(body);
      }
      let responseData;
      try {
        callbacks.onStart();

        const response = await fetch(url, fetchConfig);
        responseData = await response.json();

        if (!response.ok) {
          throw Promise.reject(responseData);
        }
        callbacks.onSuccess(responseData);
      } catch (err) {
        callbacks.onError(err);
        responseData = err;
      } finally {
        callbacks.onEnd();
      }
      return responseData;
    },
    [config, callbacks]
  );

  useIsomorphicLayoutEffect(() => {
    if (!initialMountedRef.current) {
      initialMountedRef.current = true;
      if (type === 'query') {
        fetchE();
      }
    }

    return () => {
      //  unmountedRef.current = true;
    };
  }, [type, fetchE, storeState.isFetched]);
  const mutate = useCallback(
    async (params?: MutateParams<P>) => await fetchE(params),
    [fetchE]
  );

  const refetch = useCallback(() => {
    fetchE();
  }, [fetchE]);
  const mData = useMemo(
    () => (storeState?.data as any) ?? initialValue,
    [storeState.data, initialValue]
  );
  const mIsLoading = useMemo(
    () => storeState.isLoading as boolean,
    [storeState.isLoading]
  );
  const mError = useMemo(() => storeState.error, [storeState.error]);
  return {
    isLoading: mIsLoading,
    error: mError,
    data: mData,
    mutate,
    refetch,
  };
};
