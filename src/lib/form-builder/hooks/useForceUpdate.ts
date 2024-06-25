import { useReducer } from "react";
import { randomId } from "../utils";
import { useDeepMemo } from "./useDeepMemo";

const reducer = (value: number) => (value + 1) % 1000000;

export function useForceUpdate() {
  const [d, update] = useReducer(reducer, 0);
  const key = useDeepMemo(() => randomId(), [d]);
  return [key, update] as const;
}
