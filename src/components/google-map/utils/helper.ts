import { MutableRefObject } from "react";
import { LatLng } from "../model";

export const isBrowser: boolean = typeof document !== "undefined";

export function isArrayEmpty(array: any): boolean {
  return Array.isArray(array) && array.length > 0;
}

export function getDirections(
  origin: google.maps.LatLng,
  destination: google.maps.LatLng,
  mode: "DRIVING" | "BICYCLING" | "WALKING" | "TRANSIT"
) {
  let directions;
  var directionsService = new google.maps.DirectionsService();
  var directionsRenderer = new google.maps.DirectionsRenderer();
  const results = directionsService.route(
    {
      origin,
      destination,
      travelMode: mode as google.maps.TravelMode,
    },
    function (result, status) {
      if (status == "OK") {
        directionsRenderer.setDirections(result);
      }
    }
  );
  return directionsRenderer;
}

export const calculatePath = (
  paths: LatLng[],
  geometry: typeof google.maps.geometry | null,
  callBack: (path: LatLng[]) => void
) =>
  callBack(
    paths.map((coordinates, i, array) => {
      if (i === 0) {
        return { ...coordinates, distance: 0 }; // it begins here!
      }
      const { lat: lat1, lng: lng1 } = coordinates;
      const latLong1 = new google.maps.LatLng(lat1, lng1);

      const { lat: lat2, lng: lng2 } = array[0];
      const latLong2 = new google.maps.LatLng(lat2, lng2);

      // in meters:
      const distance = geometry?.spherical.computeDistanceBetween(
        latLong1,
        latLong2
      );

      return { ...coordinates, distance };
    })
  );

export const getDistance = (initialDate: Date, velocity: number) => {
  const currentDate = new Date();

  const differentInTime =
    (currentDate.getTime() - initialDate.getTime()) / 1000; // pass to seconds
  return differentInTime * velocity; // d = v*t -- thanks Newton!
};

export const moveObject = ({
  initialDate,
  velocity,
  paths,
  geometry,
  interval,
  onUpdateProgress,
}: {
  initialDate: Date | null;
  velocity: number;
  paths: LatLng[];
  geometry: typeof google.maps.geometry | null;
  interval: MutableRefObject<NodeJS.Timeout | null>;
  onUpdateProgress?: (paths: LatLng[], angle: number) => void;
}) => {
  const distance = initialDate && getDistance(initialDate, velocity);
  if (!distance) return;

  let progress = paths.filter(
    (coordinates) => coordinates.distance! < distance
  );
  const nextLine = paths.find(
    (coordinates) => coordinates.distance! > distance
  );

  let point1, point2;

  if (nextLine) {
    point1 = progress[progress.length - 1];
    point2 = nextLine;
  } else {
    // it's the end, so use the latest 2
    point1 = progress[progress.length - 2];
    point2 = progress[progress.length - 1];
  }
  const point1LatLng = new google.maps.LatLng(point1.lat, point1.lng);
  const point2LatLng = new google.maps.LatLng(point2.lat, point2.lng);
  const angle = window.google.maps.geometry.spherical.computeHeading(
    point1LatLng,
    point2LatLng
  );
  const actualAngle = angle - 90;

  if (!nextLine) {
    onUpdateProgress && onUpdateProgress(progress, actualAngle);
    if (interval.current) clearInterval(interval.current);
    console.log("Trip Completed!! Thank You !!");
    return;
  }
  const lastLine = progress[progress.length - 1];
  const lastLineLatLng = new google.maps.LatLng(lastLine.lat, lastLine.lng);
  const nextLineLatLng = new google.maps.LatLng(nextLine.lat, nextLine.lng);
  const totalDistance = nextLine.distance! - lastLine.distance!;
  const percentage = (distance - lastLine.distance!) / totalDistance;
  const position = window.google.maps.geometry.spherical.interpolate(
    lastLineLatLng,
    nextLineLatLng,
    percentage
  );
  onUpdateProgress &&
    onUpdateProgress(
      progress.concat({ lat: position.lat(), lng: position.lng(), distance }),
      actualAngle
    );
};
