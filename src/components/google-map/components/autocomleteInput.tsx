import React, { memo, useId, useMemo, useRef } from "react";
import {
  Autocomplete,
  AutocompleteProps,
  Group,
  Highlight,
  Loader,
} from "@mantine/core";
import { IconMap, IconMapPinFilled } from "@tabler/icons-react";
import { useAutocomplete } from "../hooks/useAutocomplete";
import { isArrayEmpty } from "../utils/helper";

interface MapAutocompleteInputProps
  extends Omit<AutocompleteProps, "onChange"> {
  onChange: (data: {
    name: string | undefined;
    description: string | undefined;
    place_id: string | undefined;
    bounds:
      | {
          lat: number;
          lng: number;
        }
      | undefined;
  }) => void;
}
const handleSelect = async (
  value: google.maps.places.AutocompletePrediction | undefined
) => {
  if (value) {
    const geocoder = new google.maps.Geocoder();
    const geocode = await geocoder.geocode({ placeId: value.place_id });

    if (geocode && geocode.results && geocode.results.length > 0) {
      return {
        description: value.description,
        placeId: value.place_id,
        bounds: {
          lat: geocode.results[0].geometry.location.lat(),
          lng: geocode.results[0].geometry.location.lng(),
        },
      };
    }
  }
};
export const MapAutocompleteInput = memo(
  ({ onChange, ...props }: MapAutocompleteInputProps) => {
    const { ref, inputRef, suggestions, isLoading } = useAutocomplete();
    const handleChange = async (value: string | null) => {
      const s = suggestions.find((s) => s.description === value);
      const geo = await handleSelect(s);

      onChange &&
        onChange({
          name: s?.structured_formatting.main_text,
          description: s?.description,
          place_id: s?.place_id,
          bounds: geo?.bounds,
        });
    };
    const renderOption: AutocompleteProps["renderOption"] = ({ option }) => (
      <Group gap="sm" wrap="nowrap" onClick={() => handleChange(option.value)}>
        <IconMapPinFilled size={14} />
        <div>
          <Highlight
            size="xs"
            truncate
            highlight={inputRef.current?.value ?? ""}
            w={130}
          >
            {option.value}
          </Highlight>
        </div>
      </Group>
    );
    const suggestionsOptions = useMemo(
      () =>
        isArrayEmpty(suggestions)
          ? suggestions.map((data) => ({
              value: data.description,
              label: data.description,
            }))
          : [],
      [suggestions]
    );
    return (
      <Autocomplete
        ref={ref}
        placeholder="search location"
        rightSection={isLoading && <Loader size={18} />}
        leftSection={<IconMap size={16} />}
        {...props}
        data={suggestionsOptions}
        renderOption={renderOption}
      />
    );
  }
);

MapAutocompleteInput.displayName = "MapAutocompleteInput";
