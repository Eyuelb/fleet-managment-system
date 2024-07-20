// "use client";
// import { GoogleMap } from "@react-google-maps/api";
// import { useCallback, useMemo, useRef, useState } from "react";
// import { useMapsLibrary } from "../hooks/useMapsLibrary";
// import MapMarker from "./map-marker";
// import MapCircle from "./map-circle";
// import MapDirection from "./map-direction";
// import { LatLng } from "../model";
// import MapPolyline from "./map-polyline";
// import { calculatePath, moveObject } from "../utils/helper";
// import { Button } from "@mantine/core";

// type MapComponentProps = {
//   paths?: LatLng[];
//   stops?: LatLng[];
// };

// const velocity = 30; // 100km per hour

// export default function MapComponent({ paths = [], stops = [] }: MapComponentProps) {
//   const [progress, setProgress] = useState<LatLng[] | null>(null);
//   const { lib: geometry, isLoaded } = useMapsLibrary("geometry");
//   const interval = useRef<NodeJS.Timeout | null>(null);
//   const initialDate = useRef<Date | null>(null);

//   const icon1 = {
//     url: "https://images.vexels.com/media/users/3/154573/isolated/preview/bd08e000a449288c914d851cb9dae110-hatchback-car-top-view-silhouette-by-vexels.png",
//     scale: 0.7,
//   };

//   const mapPaths = useMemo(() => {
//     if (interval.current) {
//       clearInterval(interval.current);
//     }
//     return isLoaded ? calculatePath(paths, geometry) : [];
//   }, [paths, isLoaded, geometry]);

//   const center = useMemo(() => {
//     if (paths.length > 0) {
//       return { lat: paths[0].lat, lng: paths[0].lng };
//     }
//     return { lat: 0, lng: 0 };
//   }, [paths]);

//   const startSimulation = useCallback(() => {
//     if (interval.current) clearInterval(interval.current);
//     setProgress(null);
//     initialDate.current = new Date();
//     interval.current = setInterval(() => {
//       moveObject({
//         geometry,
//         initialDate: initialDate.current,
//         velocity,
//         paths: mapPaths,
//         interval,
//         onUpdateProgress: (updatedPaths, angle) => {
//           setProgress(updatedPaths);
//           const marker = document.querySelector(`[src="${icon1.url}"]`);
//           if (marker) {
//             marker.style.transform = `rotate(${angle}deg)`;
//           }
//         },
//       });
//     }, 1000);
//   }, [mapPaths, geometry, icon1.url]);

//   if (!isLoaded) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <section className="w-full h-full">
//       <GoogleMap
//         options={{
//           disableDefaultUI: false,
//           clickableIcons: true,
//           scrollwheel: false,
//         }}
//         zoom={17}
//         center={center}
//         mapTypeId={google.maps.MapTypeId.ROADMAP}
//         mapContainerClassName="w-3/4"
//         mapContainerStyle={{ width: "800px", height: "800px" }}
//         onLoad={() => console.log("Map component loaded")}
//       >
//         <MapPolyline paths={mapPaths} />
//         {stops.map((stop, index) => (
//           <MapMarker key={index} {...stop} />
//         ))}
//         {progress && (
//           <>
//             <MapPolyline paths={progress} color="red" />
//             <MapMarker {...progress[progress.length - 1]} type="car" />
//           </>
//         )}
//       </GoogleMap>
//       <Button onClick={startSimulation}>Start Simulation</Button>
//     </section>
//   );
// }
