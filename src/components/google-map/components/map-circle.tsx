import { CircleF, CircleProps } from "@react-google-maps/api";
import React from "react";

interface MapCircleProps {
  radios: number[];
  lat: number;
  lng: number;
}
const MapCircle = (props: MapCircleProps) => {
  const { radios, lat, lng } = props;
  const circles = radios.map((r, idx) => (
    <CircleF
      key={idx}
      center={{
        lat,
        lng,
      }}
      radius={r}
      onLoad={() => console.log("Circle Load...")}
      options={{
        fillColor: r > 1000 ? "red" : "green",
        strokeColor: r > 1000 ? "red" : "green",
        strokeOpacity: 0.8,
      }}
    />
  ));

  return <>{circles}</>;
};

export default MapCircle;
