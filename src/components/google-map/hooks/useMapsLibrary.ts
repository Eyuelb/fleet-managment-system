import { useEffect, useReducer } from "react";
import { LoadedLibraries, MapApiLibraries } from "../model";
import { useLoadScript } from "@react-google-maps/api";

export function useMapsLibrary<
  K extends keyof MapApiLibraries,
  V extends MapApiLibraries[K]
>(name: K): V | null;

export function useMapsLibrary(name: string) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });
  const [loadedLibraries, addLoadedLibrary] = useReducer(
    (
      loadedLibraries: LoadedLibraries,
      action: { name: keyof LoadedLibraries; value: LoadedLibraries[string] }
    ) => {
      return { ...loadedLibraries, [action.name]: action.value };
    },
    {}
  );

  useEffect(() => {
    if (!isLoaded || !name) return;
    // Trigger loading the libraries via our proxy-method.
    // The returned promise is ignored, since importLibrary will update loadedLibraries
    // list in the context, triggering a re-render.
    const importLibrary = async (name: string) => {
      if (loadedLibraries[name]) {
        return loadedLibraries[name];
      }

      if (!google?.maps?.importLibrary) {
        throw new Error(
          "[api-provider-internal] importLibrary was called before " +
            "google.maps.importLibrary was defined."
        );
      }

      const res = await google.maps.importLibrary(name);
      addLoadedLibrary({ name, value: res });

      return res;
    };
    void importLibrary(name);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, name]);

  return loadedLibraries[name] || null;
}
