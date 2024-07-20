import React, { useEffect, useState } from "react";
import { DirectionsRenderer } from "@react-google-maps/api";
import { useMapsLibrary } from "../hooks/useMapsLibrary";

interface MapDirectionProps {
  origin: {
    lat: number;
    lng: number;
  };
  destination: {
    lat: number;
    lng: number;
  };
}

const MapDirection: React.FC<MapDirectionProps> = ({ origin, destination }) => {
  const [directions, setDirections] = useState<
    google.maps.DirectionsResult | undefined
  >(undefined);
  const { isLoaded } = useMapsLibrary("maps");

  useEffect(() => {
    if (isLoaded) {
      const directionsService = new google.maps.DirectionsService();

      directionsService.route(
        {
          origin: new google.maps.LatLng(origin.lat, origin.lng),
          destination: new google.maps.LatLng(destination.lat, destination.lng),
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === "OK") {
            setDirections(result ?? undefined);
          } else {
            console.error(`Error fetching directions ${status}`);
          }
        }
      );
    }
  }, [isLoaded]);
  return (
    <DirectionsRenderer
      directions={directions}
      onLoad={() => console.log("Directions loaded")}
    />
  );
};

export default MapDirection;
