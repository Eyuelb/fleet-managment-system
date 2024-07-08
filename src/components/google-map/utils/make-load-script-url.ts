import { LoadScriptUrlOptions } from "../model";
import { invariant } from "./invariant";



export function makeLoadScriptUrl({
  googleMapsApiKey,
  googleMapsClientId,
  version = "weekly",
  language,
  region,
  channel,
  mapIds,
  authReferrerPolicy,
}: LoadScriptUrlOptions): string {
  const params = [];
  invariant(
    !googleMapsApiKey,
    "You need to provide a google maps API key to connect to GoogleMaps env:GOOGLE_MAPS_API_KEY"
  );
  console.log(!googleMapsApiKey)
  if (googleMapsApiKey) {
    params.push(`key=${googleMapsApiKey}`);
  } else if (googleMapsClientId) {
    params.push(`client=${googleMapsClientId}`);
  }

  if (version) {
    params.push(`v=${version}`);
  }

  if (language) {
    params.push(`language=${language}`);
  }

  if (region) {
    params.push(`region=${region}`);
  }

  if (channel) {
    params.push(`channel=${channel}`);
  }

  if (mapIds && mapIds.length) {
    params.push(`map_ids=${mapIds.join(",")}`);
  }

  if (authReferrerPolicy) {
    params.push(`auth_referrer_policy=${authReferrerPolicy}`);
  }

  params.push("loading=async");
  params.push("callback=initMap");

  return `https://maps.googleapis.com/maps/api/js?${params.join("&")}`;
}
