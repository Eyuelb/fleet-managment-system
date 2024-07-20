"use client";
import { GoogleMap, Marker, Polyline } from "@react-google-maps/api";
import { useCallback, useEffect, useRef, useState } from "react";
import { useMapsLibrary } from "../hooks/useMapsLibrary";
import { LatLng } from "../model";
import {
  Box,
  Button,
  Card,
  Center,
  Flex,
  Group,
  Loader,
  Slider,
  Text,
} from "@mantine/core";
import { calculatePath } from "../utils/helper";
import MapPolyline from "./map-polyline";
import MapMarker from "./map-marker";

type MapComponentProps = {
  source: LatLng;
  destination: LatLng;
  geometry: typeof google.maps.geometry | null;
  markerIcon?: string;
  markerSize?: google.maps.Size;
  polylineColor?: string;
  polylineWeight?: number;
};

function MapComponent({
  source,
  destination,
  geometry,
  markerIcon = "https://images.vexels.com/media/users/3/154573/isolated/preview/bd08e000a449288c914d851cb9dae110-hatchback-car-top-view-silhouette-by-vexels.png",
  markerSize = new google.maps.Size(20, 20),
  polylineColor = "#0088FF",
  polylineWeight = 6,
}: MapComponentProps) {
  const [paths, setPaths] = useState<LatLng[]>([]);
  const [progress, setProgress] = useState<LatLng[] | null>(null);
  const [center, setCenter] = useState<LatLng>(source);
  const [velocity, setVelocity] = useState(27); // 100km per hour
  const initialDate = useRef<Date | null>(null);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Fetch directions and set paths
    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin: source,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (
          status === google.maps.DirectionsStatus.OK &&
          result &&
          result.routes.length > 0
        ) {
          const path = result.routes[0].overview_path.map((point) => ({
            lat: point.lat(),
            lng: point.lng(),
          }));
          setPaths(path);
          calculatePath(path, geometry, setPaths);
        } else {
          console.error("Error fetching directions", result);
        }
      }
    );

    return () => {
      // Cleanup: Cancel animation frame
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [source, destination, geometry]);

  const updateCarPosition = useCallback(() => {
    const getDistance = () => {
      if (!initialDate.current) return 0;
      const differentInTime =
        (new Date().getTime() - initialDate.current.getTime()) / 1000; // pass to seconds
      return differentInTime * velocity; // d = v*t
    };

    const setMarkerRotation = (angle: number) => {
      document.getElementById;
      const marker = document.querySelector(
        `[src="${markerIcon}"]`
      ) as HTMLElement;
      if (marker) {
        marker.style.transform = `rotate(${angle}deg)`;
      }
    };
    const distance = getDistance();
    if (!distance) return;

    let progress = paths.filter(
      (coordinates) =>
        coordinates.distance !== undefined && coordinates.distance < distance
    );

    const nextLine = paths.find(
      (coordinates) =>
        coordinates.distance !== undefined && coordinates.distance > distance
    );

    if (!nextLine) {
      setProgress(progress);
      return;
    }

    const lastLine = progress[progress.length - 1];
    if (!lastLine || !geometry) return; // Guard against undefined lastLine

    const lastLineLatLng = new google.maps.LatLng(lastLine.lat, lastLine.lng);
    const nextLineLatLng = new google.maps.LatLng(nextLine.lat, nextLine.lng);

    const totalDistance = nextLine.distance! - lastLine.distance!;
    const percentage = (distance - lastLine.distance!) / totalDistance;
    const position = geometry?.spherical.interpolate(
      lastLineLatLng,
      nextLineLatLng,
      percentage
    );

    if (!position) return; // Guard against undefined position

    setProgress(
      progress.concat([
        {
          lat: position.lat(),
          lng: position.lng(),
        },
      ] as LatLng[])
    );
    setCenter({ lat: position.lat(), lng: position.lng() });

    const angle =
      geometry?.spherical.computeHeading(lastLineLatLng, nextLineLatLng) - 90;

    setMarkerRotation(angle); // Set marker rotation angle

    animationFrameId.current = requestAnimationFrame(updateCarPosition);
  }, [geometry, paths, markerIcon, velocity]);

  const startSimulation = () => {
    initialDate.current = new Date();
    animationFrameId.current = requestAnimationFrame(updateCarPosition);
  };

  return (
    <Card>
      <div className="btnCont">
        <Button variant="contained" onClick={startSimulation}>
          Start Simulation
        </Button>
        <Slider
          value={velocity}
          onChange={setVelocity}
          min={1}
          max={100}
          label="Velocity (km/h)"
          style={{ width: "200px", marginLeft: "20px" }}
        />
      </div>

      <div className="gMapCont">
        <GoogleMap
          zoom={17}
          center={center}
          mapContainerStyle={{ width: "100%", height: "80dvh" }}
          options={{ gestureHandling: "greedy" }}
          onClick={() => {}}
        >
          <MapPolyline
            path={paths}
            polylineColor={polylineColor}
            polylineWeight={polylineWeight}
          />

          {progress ? (
            <>
              <MapPolyline path={progress} />
              <MapMarker position={progress[progress.length - 1]} type="car" />
            </>
          ) : (
            <MapMarker position={source} type="car" />
          )}
        </GoogleMap>
      </div>
    </Card>
  );
}

export default function MapComponentMain({
  source,
  destination,
  markerIcon,
  markerSize,
  polylineColor,
  polylineWeight,
}: {
  source: LatLng;
  destination: LatLng;
  markerIcon?: string;
  markerSize?: google.maps.Size;
  polylineColor?: string;
  polylineWeight?: number;
}) {
  const { lib: geometry, isLoaded } = useMapsLibrary("geometry");

  if (!isLoaded)
    return (
      <Flex className="h-1/2 justify-center items-center">
        <Group>
          <Loader size="sm" />
          <Text fw={600} ta="center">
            Loading...
          </Text>
        </Group>
      </Flex>
    );

  return (
    <MapComponent
      source={source}
      destination={destination}
      geometry={geometry}
      markerIcon={markerIcon}
      markerSize={markerSize}
      polylineColor={polylineColor}
      polylineWeight={polylineWeight}
    />
  );
}
