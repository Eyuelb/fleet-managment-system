"use client";
import React, { useCallback, useEffect, useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { LatLng, LocationData } from "../model"; // Assuming LatLng is defined here
import { useMapsLibrary } from "../hooks/useMapsLibrary";

type MapLocationMarkersProps = {
  locations: LocationData[];
  highlightId?: string; // Optional id to highlight a specific marker
};

const MapLocationMarkers: React.FC<MapLocationMarkersProps> = ({
  locations,
  highlightId,
}) => {
  const { isLoaded } = useMapsLibrary("marker");
  const [center, setCenter] = useState<LatLng | null>(null);

  useEffect(() => {
    if (locations.length > 0) {
      const location = locations.find((l) => l.id === highlightId);
      if (location) setCenter(location.point);
    }
  }, [locations, highlightId]);

  if (!isLoaded) {
    return <p>Loading...</p>;
  }
  return (
    <GoogleMap
      zoom={12}
      center={center || { lat: 0, lng: 0 }} // Center map on the first location, or default to { lat: 0, lng: 0 }
      mapContainerStyle={{ width: "100%", height: "400px" }}
    >
      {locations.map((location, index) => (
        <Marker
          key={location.id || index}
          position={location.point}
          title={location.name}
          label={location.id}
        />
      ))}
    </GoogleMap>
  );
};

export default MapLocationMarkers;
