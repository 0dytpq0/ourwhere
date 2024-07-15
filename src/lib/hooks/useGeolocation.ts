'use client';

import { useEffect, useState } from 'react';

interface Location {
  latitude: number;
  longitude: number;
}

function useGeoLocation(): Location | null {
  const [myLocation, setMyLocation] = useState<Location | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, { enableHighAccuracy: true, maximumAge: 0 });
  }, []);

  const handleSuccess = (response: GeolocationPosition) => {
    const { latitude, longitude } = response.coords;
    setMyLocation({ latitude, longitude });
  };

  const handleError = (error: GeolocationPositionError) => {
    console.error(error);
  };

  return myLocation;
}

export default useGeoLocation;
