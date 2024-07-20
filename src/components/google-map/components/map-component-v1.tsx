// "use client";
// import { GoogleMap, Marker, Polyline } from "@react-google-maps/api";
// import { useCallback, useEffect, useRef, useState } from "react";
// import { useMapsLibrary } from "../hooks/useMapsLibrary";
// import { LatLng } from "../model";
// import { Button, Card } from "@mantine/core";

// type MapComponentProps = {
//   paths?: LatLng[];
//   geometry: typeof google.maps.geometry | null;
// };

// function MapComponent({ paths = [], geometry }: MapComponentProps) {
//   const [progress, setProgress] = useState<LatLng[] | null>(null);
//   const velocity = 27; // 100km per hour
//   const initialDate = useRef<Date | null>(null);
//   const interval = useRef<NodeJS.Timeout | null>(null);

//   const icon1 = {
//     url: "https://images.vexels.com/media/users/3/154573/isolated/preview/bd08e000a449288c914d851cb9dae110-hatchback-car-top-view-silhouette-by-vexels.png",
//     scaledSize: new window.google.maps.Size(40, 40),
//     anchor: new window.google.maps.Point(20, 20),
//     scale: 0.7,
//   };

//   const center = Math.floor(paths.length / 2);
//   const centerPathLat = paths[center]?.lat || 0;
//   const centerpathLng = paths[center]?.lng || 0;

//   useEffect(() => {
//     calculatePath();

//     return () => {
//       if (interval.current) {
//         clearInterval(interval.current);
//       }
//     };
//   }, [paths, geometry]);

//   const getDistance = () => {
//     if (!initialDate.current) return 0;
//     const differentInTime = (new Date().getTime() - initialDate.current.getTime()) / 1000; // pass to seconds
//     return differentInTime * velocity; // d = v*t
//   };

//   const moveObject = useCallback(() => {
//     const distance = getDistance();
//     if (!distance) return;

//     let progress = paths.filter((coordinates) => coordinates.distance < distance);

//     const nextLine = paths.find((coordinates) => coordinates.distance > distance);

//     if (!nextLine) {
//       setProgress(progress);
//       if (interval.current) clearInterval(interval.current);
//       return;
//     }

//     const lastLine = progress[progress.length - 1];

//     const lastLineLatLng = new google.maps.LatLng(lastLine.lat, lastLine.lng);
//     const nextLineLatLng = new google.maps.LatLng(nextLine.lat, nextLine.lng);

//     const totalDistance = nextLine.distance - lastLine.distance;
//     const percentage = (distance - lastLine.distance) / totalDistance;

//     const position = geometry?.spherical.interpolate(lastLineLatLng, nextLineLatLng, percentage);

//     setProgress(progress.concat(position));
//     mapUpdate();
//   }, [geometry, paths]);

//   const calculatePath = useCallback(() => {
//     paths = paths.map((coordinates, i, array) => {
//       if (i === 0) {
//         return { ...coordinates, distance: 0 }; // it begins here!
//       }
//       const { lat: lat1, lng: lng1 } = coordinates;
//       const latLong1 = new google.maps.LatLng(lat1, lng1);

//       const { lat: lat2, lng: lng2 } = array[0];
//       const latLong2 = new google.maps.LatLng(lat2, lng2);

//       const distance = geometry?.spherical.computeDistanceBetween(latLong1, latLong2) || 0;

//       return { ...coordinates, distance };
//     });
//   }, [paths, geometry]);

//   const startSimulation = useCallback(() => {
//     if (interval.current) {
//       clearInterval(interval.current);
//     }
//     setProgress(null);
//     initialDate.current = new Date();
//     interval.current = setInterval(moveObject, 1000);
//   }, [moveObject]);

//   const mapUpdate = useCallback(() => {
//     const distance = getDistance();
//     if (!distance) return;

//     let progress = paths.filter((coordinates) => coordinates.distance < distance);

//     const nextLine = paths.find((coordinates) => coordinates.distance > distance);

//     let point1, point2;

//     if (nextLine) {
//       point1 = progress[progress.length - 1];
//       point2 = nextLine;
//     } else {
//       point1 = progress[progress.length - 2];
//       point2 = progress[progress.length - 1];
//     }

//     const point1LatLng = new google.maps.LatLng(point1.lat, point1.lng);
//     const point2LatLng = new google.maps.LatLng(point2.lat, point2.lng);

//     const angle = google.maps.geometry.spherical.computeHeading(point1LatLng, point2LatLng);
//     const actualAngle = angle - 90;

//     const marker = document.querySelector(`[src="${icon1.url}"]`);

//     if (marker) {
//       marker.style.transform = `rotate(${actualAngle}deg)`;
//     }
//   }, [paths, geometry]);

//   return (
//     <Card>
//       <div className="btnCont">
//         <Button variant="contained" onClick={startSimulation}>Start Simulation</Button>
//       </div>

//       <div className="gMapCont">
//         <GoogleMap
//           zoom={17}
//           center={{ lat: centerPathLat, lng: centerpathLng }}
//           mapContainerStyle={{ width: "800px", height: "800px" }}
//         >
//           <Polyline
//             path={paths}
//             options={{
//               strokeColor: "#0088FF",
//               strokeWeight: 6,
//               strokeOpacity: 0.6,
//               visible: true,
//             }}
//           />

//           {progress && (
//             <>
//               <Polyline
//                 path={progress}
//                 options={{ strokeColor: "orange" }}
//               />
//               <Marker
//                 icon={icon1}
//                 position={progress[progress.length - 1]}
//               />
//             </>
//           )}
//         </GoogleMap>
//       </div>
//     </Card>
//   );
// }

// export default function MapComponentMain({ paths = [] }: MapComponentProps) {
//   const { lib: geometry, isLoaded } = useMapsLibrary("geometry");

//   if (!isLoaded) {
//     return <p>Loading...</p>;
//   }

//   return <MapComponent paths={paths} geometry={geometry} />;
// }
