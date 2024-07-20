import { MarkerF, MarkerProps, Polyline } from "@react-google-maps/api";
import React from "react";
import { LatLng } from "../model";
type MapPolylineProps = {
  path: LatLng[];
  color?:string;
  polylineColor?: string;
  polylineWeight?: number;
};
const MapPolyline = (props: MapPolylineProps) => {
  const { path,color="transparent" } = props;

  return (
    <Polyline
      path={path}
      options={{
        strokeColor:color ,
        strokeWeight: 6,
        strokeOpacity: 0.6,
        visible:true
      }}
    />
  );
};

export default MapPolyline;
