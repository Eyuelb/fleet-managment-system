import { useMemo, useRef, useState } from "react";
import {
  useDebouncedCallback,
  useEventListener,
  useMergedRef,
} from "@mantine/hooks";
import { useMapsLibrary } from "./useMapsLibrary";

export const useAutocomplete = () => {
  const [isLoading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [suggestions, setSuggestions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);
  const places = useMapsLibrary("places");
  const service = places ? new places.AutocompleteService() : null;
  const handleGetSuggestion = useDebouncedCallback(async (value: string) => {
    setLoading(true);
    const res = await service?.getPlacePredictions({
      input: value,
    });
    setSuggestions(res?.predictions ?? []);
    setLoading(false);
  }, 500);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.currentTarget.value && handleGetSuggestion(event.currentTarget.value);
  };
  const listenerRef = useEventListener<any, HTMLInputElement>(
    "input",
    handleChange
  );
  const mergedRef = useMergedRef(inputRef, listenerRef);
  const ref = useMemo(() => mergedRef, [mergedRef]);
  return {
    ref,
    inputRef: inputRef,
    suggestions,
    isLoading,
  };
};
