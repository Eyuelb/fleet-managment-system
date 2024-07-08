import { useContext } from "react";
import { MapContext } from "../context/map-context";
import { MapContextType } from "../model";

export const useMapContext = (): MapContextType => {
    const context = useContext(MapContext);
    if (!context) {
      throw new Error('useMap must be used within a MapProvider');
    }
    return context;
  };
  