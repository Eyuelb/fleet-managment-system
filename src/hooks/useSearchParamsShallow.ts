"use client";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useReducer,
  useRef,
} from "react";
import { useIsMounted } from "./useIsMounted";

/**
 * Stores state in search params while bypassing Next Router.
 *
 * The purpose of this is to use search params while maintaining SSG ability,
 * because Next.js's `useSearchParams` forces at least the children to be
 * client-side rendered on static routes.
 *
 * See https://nextjs.org/docs/app/api-reference/functions/use-search-params
 */
const useSearchParamsShallow = () => {
  const EVENT_NAME = "useSearchParamsShallow";
  const id = useId();
  const timeoutHandle = useRef<ReturnType<typeof setTimeout>>();
  const isLoaded = useIsMounted();
  const reducer = useCallback(
    (
      _: URLSearchParams,
      action: { target: "int" | "ext"; newParams: URLSearchParams }
    ) => {
      clearTimeout(timeoutHandle.current);
      if (action.target === "ext") {
        /**
         * Doing this in the next tick makes sure that the originating
         * component finishes rendering before it triggers updates to other
         * components.
         */
        timeoutHandle.current = setTimeout(() => {
          document.dispatchEvent(
            new CustomEvent(EVENT_NAME, { detail: { id } })
          );
        });
      }
      return action.newParams;
    },
    [id]
  );

  useEffect(() => () => clearTimeout(timeoutHandle.current), []);

  const [localParams, setLocalParams] = useReducer(
    reducer,
    undefined,
    () => new URLSearchParams()
  );

  useEffect(() => {
    const handler = (event: CustomEvent<{ id: string }>) => {
      if (event.detail.id !== id) {
        const globalParams = new URLSearchParams(window.location.search);
        setLocalParams({ target: "int", newParams: globalParams });
      }
    };

    document.addEventListener(EVENT_NAME, handler as EventListener);
    return () =>
      document.removeEventListener(EVENT_NAME, handler as EventListener);
  }, [id]);

  useEffect(() => {
    const globalParams = new URLSearchParams(window.location.search);
    setLocalParams({ target: "int", newParams: globalParams });
  }, []);

  const has = useCallback((key: string) => localParams.has(key), [localParams]);

  const get = useCallback((key: string) => localParams.get(key), [localParams]);

  const getAll = useCallback(
    (key: string) => localParams.getAll(key),
    [localParams]
  );

  const set = useCallback((key: string, value: any) => {
    if (typeof window === "undefined") return;

    if (value === null) _delete(key);
    else {
      const url = new URL(window.location.href);
      url.searchParams.set(key, value);
      window.history.replaceState(null, "", url);
      setLocalParams({ target: "ext", newParams: url.searchParams });
    }
  }, []);

  const append = useCallback((key: string, value: any) => {
    if (typeof window === "undefined") return;

    const url = new URL(window.location.href);
    url.searchParams.append(key, value);
    window.history.replaceState(null, "", url);
    setLocalParams({ target: "ext", newParams: url.searchParams });
  }, []);

  const _delete = useCallback((key: string) => {
    if (typeof window === "undefined") return;

    const url = new URL(window.location.href);
    url.searchParams.delete(key);
    window.history.replaceState(null, "", url);
    setLocalParams({ target: "ext", newParams: url.searchParams });
  }, []);
  const register = useCallback(
    (key: string) => ({
      value: get(key),
      onChange: (value: any) => set(key, value),
    }),
    [localParams]
  );
  const reset = useCallback(() => {
    if (typeof window === "undefined") return;
  
    const url = new URL(window.location.href);
    url.search = "";  // This clears the search params in the URL
    window.history.replaceState(null, "", url);
    setLocalParams({ target: "ext", newParams: new URLSearchParams() });
  }, [setLocalParams]);

  const isEmpty = useMemo(() => localParams.size <= 0, [localParams.size]);

  const api = useMemo(
    () => ({
      has,
      get,
      getAll,
      append,
      set,
      delete: _delete,
      register,
      isLoaded,
      isEmpty,
      reset
    }),
    [has, get, getAll, append, set, _delete, register, isLoaded, isEmpty,reset]
  );

  return api;
};

export { useSearchParamsShallow };
