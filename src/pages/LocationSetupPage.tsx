import type { FC } from 'react';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ArrowLeftIcon, ArrowRightIcon, LocateFixedIcon } from 'lucide-react';

import { Page } from '@/components/Page.tsx';
import { Content } from '@/components/Content';
import { ContentFeed } from '@/components/ContentFeed';
import { ContentNavigation } from '@/components/ContentNavigation';
import { LocationInput } from '@/components/LocationInput';
import { Select, SelectGroup, SelectContent, SelectValue, SelectTrigger, SelectLabel, SelectItem } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';

// Function to generate random offset within radius (in kilometers)
const getRandomOffset = (radiusKm: number): { lat: number; lng: number } => {
    // Convert radius from km to degrees (approximate)
    const radiusDegrees = radiusKm / 111.32;
    
    // Generate random angle
    const angle = Math.random() * 2 * Math.PI;
    
    // Generate random distance within radius
    const distance = Math.sqrt(Math.random()) * radiusDegrees;
    
    return {
        lat: distance * Math.cos(angle),
        lng: distance * Math.sin(angle)
    };
};

export const LocationSetupPage: FC = () => {
    const navigate = useNavigate();
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const marker = useRef<mapboxgl.Marker | null>(null);
    const { translations: { globalDict }, direction } = useLanguage();
    
    const [locationMode, setLocationMode] = useState<'automatic' | 'manual'>('automatic');
    const [randomizationRadius, setRandomizationRadius] = useState<number>(0);
    const [manualLocation, setManualLocation] = useState<string>('');
    const [automaticLocation, setAutomaticLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [selectedCoordinates, setSelectedCoordinates] = useState<{ lat: number; lng: number } | null>(null);

    const PrevArrowIcon = direction === 'rtl' ? ArrowRightIcon : ArrowLeftIcon;
    const NextArrowIcon = direction === 'rtl' ? ArrowLeftIcon : ArrowRightIcon;

    // initialize map
    useEffect(() => {
        if (mapContainer.current && !map.current) {
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v12',
                center: [-74.5, 40], // default center
                zoom: 9
            });

            // Add navigation controls
            map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
        }

        return () => {
            if (map.current) {
                map.current.remove();
                map.current = null;
            }
        };
    }, []);

    // Update marker when location changes
    useEffect(() => {
        if (selectedCoordinates && map.current) {
            // Remove existing marker if any
            if (marker.current) {
                marker.current.remove();
            }

            // Add new marker
            marker.current = new mapboxgl.Marker()
                .setLngLat([selectedCoordinates.lng, selectedCoordinates.lat])
                .addTo(map.current);

            // Center map on selected location
            map.current.flyTo({
                center: [selectedCoordinates.lng, selectedCoordinates.lat],
                zoom: 12,
                speed: 2.0
            });
        }
    }, [selectedCoordinates]);

    const handlePrevPageClick = () => {
        navigate('/profile');
    }

    const handleNextPageClick = () => {
        navigate('/radar');
    }

    const handleLocationSelect = (location: { lat: number; lng: number; address: string }) => {
        setSelectedCoordinates({ lat: location.lat, lng: location.lng });
    };

    const handleUpdateLocation = () => {
        if (!navigator.geolocation) {
            console.error('Geolocation is not supported by your browser');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setAutomaticLocation({ lat: latitude, lng: longitude });
            },
            (error) => {
                console.error('Error getting location:', error);
            }
        );
    };

    useEffect(() => {
        if (locationMode === 'automatic' && automaticLocation) {
            const offset = getRandomOffset(randomizationRadius);
            setSelectedCoordinates({
                lat: automaticLocation.lat + offset.lat,
                lng: automaticLocation.lng + offset.lng
            });
        }
    }, [automaticLocation, randomizationRadius, locationMode]);

    return (
        <Page back={true}>
            <Content className='text-md'>
                <ContentFeed>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="col-span-2">
                            <div className="flex flex-col justify-end w-full">
                                <span className="text-sm text-foreground px-1">{globalDict.locationMode}</span>
                                <Select value={locationMode} onValueChange={(value) => setLocationMode(value as 'automatic' | 'manual')}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Location Mode</SelectLabel>
                                            <SelectItem value="automatic">{globalDict.automaticLocation}</SelectItem>
                                            <SelectItem value="manual">{globalDict.manualLocation}</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        {locationMode === 'automatic' ? (
                            <>
                                <div className="col-span-2">
                                    <span className="text-sm text-foreground px-1">{globalDict.obscureRadius}</span>
                                    <Select value={randomizationRadius.toString()} onValueChange={(value) => setRandomizationRadius(Number(value))}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder={globalDict.radius} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>{globalDict.radius} ({globalDict.km})</SelectLabel>
                                                {[0, 1, 5, 10].map(value => (
                                                    <SelectItem key={value} value={value.toString()}>{value} {globalDict.km}</SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </>
                        ) : (
                            <div className="col-span-2">
                                <span className="text-sm text-foreground px-1"> {globalDict.enterYourLocation}</span>
                                <LocationInput
                                    value={manualLocation}
                                    onChange={setManualLocation}
                                    onLocationSelect={handleLocationSelect}
                                />
                            </div>
                        )}

                        <div className="col-span-2 px-10 py-5">
                            <div className="relative w-full aspect-[3/4] rounded-[2%] overflow-hidden bg-foreground/10">
                                <div ref={mapContainer} className="w-full h-full" />
                                {!selectedCoordinates && (
                                    <div 
                                        className="absolute inset-0 bg-black/70 flex items-center justify-center cursor-pointer"
                                        onClick={handleUpdateLocation}
                                    >
                                        <div className="text-white text-center text-lg font-medium">
                                            {locationMode === 'automatic' 
                                                ? globalDict.locationNotSetAutomatic
                                                : globalDict.locationNotSetManual}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="col-span-2 px-10">
                            {selectedCoordinates && (
                                <div className="mt-2 text-sm text-foreground px-1">
                                    <div className="flex justify-between">
                                        <span>{globalDict.latitude}</span>
                                        <span>{selectedCoordinates.lat.toFixed(6)}°</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>{globalDict.longitude}</span>
                                        <span>{selectedCoordinates.lng.toFixed(6)}°</span>
                                    </div>
                                </div>
                            )}
                        </div>              
                    </div>
                </ContentFeed>
                <ContentNavigation items={[
                    {
                        icon: PrevArrowIcon,
                        label: globalDict.back,
                        onClick: handlePrevPageClick
                    },
                    ...(locationMode === 'automatic' ? [{
                        icon: LocateFixedIcon,
                        label: globalDict.updateLocation,
                        onClick: handleUpdateLocation
                    }] : []),
                    {
                        icon: NextArrowIcon,
                        label: globalDict.next,
                        onClick: handleNextPageClick,
                        isDisabled: !selectedCoordinates
                    }
                ]}
                />
            </Content>
        </Page>
    );
} 
