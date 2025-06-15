import { FC, useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from "@/components/ui/input";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || '';

interface LocationInputProps {
    value: string;
    onChange: (value: string) => void;
    onLocationSelect?: (location: { lat: number; lng: number; address: string }) => void;
}

export const LocationInput: FC<LocationInputProps> = ({ value, onChange, onLocationSelect }) => {
    const [suggestions, setSuggestions] = useState<Array<{ text: string; place_name: string; center: [number, number] }>>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const suggestionsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const searchLocation = async (query: string) => {
        if (!query.trim()) {
            setSuggestions([]);
            return;
        }

        try {
            const response = await fetch(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?types=region,district,place,address&access_token=${mapboxgl.accessToken}&limit=5`
            );
            const data = await response.json();
            setSuggestions(data.features || []);
            setShowSuggestions(true);
        } catch (error) {
            console.error('Error fetching location suggestions:', error);
            setSuggestions([]);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        onChange(newValue);
        searchLocation(newValue);
    };

    const handleSuggestionClick = (suggestion: { text: string; place_name: string; center: [number, number] }) => {
        onChange(suggestion.place_name);
        setShowSuggestions(false);
        if (onLocationSelect) {
            onLocationSelect({
                lat: suggestion.center[1],
                lng: suggestion.center[0],
                address: suggestion.place_name
            });
        }
    };

    return (
        <div className="relative">
            <Input
                ref={inputRef}
                type="text"
                value={value}
                onChange={handleInputChange}
                placeholder="Enter city, address, or coordinates"
                className="w-full text-sm"
            />
            {showSuggestions && suggestions.length > 0 && (
                <div
                    ref={suggestionsRef}
                    className="absolute z-10 w-full mt-1 bg-popover text-popover-foreground rounded-md shadow-lg max-h-60 overflow-auto border border-border"
                >
                    {suggestions.map((suggestion, index) => (
                        <div
                            key={index}
                            className="px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors"
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            {suggestion.place_name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}; 