import { MarkerF, MarkerProps } from "@react-google-maps/api";
import React from "react";
import { LatLng } from "../model";
interface MapMarkerProps {
  position:LatLng
  type?: "car" | "default";
}
const MapMarker = (props: MapMarkerProps) => {
  const { position, type = "default" } = props;

  return (
    <MarkerF
      position={position}
      {...(type === "car"
        ? {
            icon: {
              url: "https://images.vexels.com/media/users/3/154573/isolated/preview/bd08e000a449288c914d851cb9dae110-hatchback-car-top-view-silhouette-by-vexels.png",
              scaledSize: new window.google.maps.Size(40, 40),
              anchor: new window.google.maps.Point(20, 20),
              scale: 0.7,
            },
          }
        : {})}
      onLoad={() => console.log("Marker loaded")}
      //    you can also change the icon of the marker
      //   icon="https://picsum.photos/64"
    />
  );
};

export default MapMarker;
