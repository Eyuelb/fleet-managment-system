import { useContext } from "react";
import { EntityContext } from "../contexts";
import { useDeepMemo } from "./useDeepMemo";

export const useCustomPage = () => {
  const context = useContext(EntityContext);
  if (!context) {
    throw new Error("Must be used within a EntityProvider");
  }

  return useDeepMemo(() => context?.customPages ?? {}, [context.customPages]);
};
