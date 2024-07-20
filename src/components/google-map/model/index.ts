export interface MapApiLibraries {
  core: google.maps.CoreLibrary;
  maps: google.maps.MapsLibrary;
  places: google.maps.PlacesLibrary;
  geocoding: google.maps.GeocodingLibrary;
  routes: google.maps.RoutesLibrary;
  marker: google.maps.MarkerLibrary;
  geometry: google.maps.GeometryLibrary;
  elevation: google.maps.ElevationLibrary;
  streetView: google.maps.StreetViewLibrary;
  journeySharing: google.maps.JourneySharingLibrary;
  drawing: google.maps.DrawingLibrary;
  visualization: google.maps.VisualizationLibrary;
  direction: google.maps.DirectionsResult;
}
export interface LoadScriptUrlOptions {
  id?: string;
  googleMapsApiKey?: string | "";
  googleMapsClientId?: string | undefined;
  version?: string | undefined;
  language?: string | undefined;
  region?: string | undefined;
  channel?: string | undefined;
  mapIds?: string[] | undefined;
  authReferrerPolicy?: "origin" | undefined;
}
export type ImportLibraryFunction = typeof google.maps.importLibrary;
export type GoogleMapsLibrary = Awaited<ReturnType<ImportLibraryFunction>>;
export type LoadedLibraries = { [name: string]: GoogleMapsLibrary };
export type Location = {
  description: string;
  placeId: string;
  bounds: google.maps.LatLngLiteral;
};
export interface MapContextType {
  map: google.maps.Map | null;
  setMap: (map: google.maps.Map | null) => void;
  isLoaded: boolean;
}

export type LatLng = {
  lat: number;
  lng: number;
  distance?: number;
};

export type LocationData = {
  point: LatLng;
  id?: string;
  name?: string;
  description?: string;
};
export type PathsData = {
  id?: string;
  source: LatLng;
  destination: LatLng;
};
