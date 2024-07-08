import { useContext } from "react";
import { EntityContext } from "../contexts";

export const useActions = () => {
    const context = useContext(EntityContext);
    if (!context) {
      throw new Error(
        'Must be used within a EntityProvider',
      );
    }
    return context.actions;
  };