import { useCallback, useMemo, useState } from "react";
import { MapContext } from "../context/map-context";
import { useLoadScript } from "../hooks/useLoadScript";

export const MapProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const { isLoaded } = useLoadScript();
  const value = {
    map,
    setMap: useCallback(
      (mapInstance: google.maps.Map | null) => setMap(mapInstance),
      []
    ),
    isLoaded,
  };
  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
};
