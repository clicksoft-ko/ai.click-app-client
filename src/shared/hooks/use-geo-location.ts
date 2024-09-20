import { useState, useEffect, useCallback } from 'react';

export interface GeoLocation {
  lat: number;
  lng: number;
}

interface UseGeoLocationProps {
  use?: boolean;
}

export const useGeoLocation = (props?: UseGeoLocationProps) => {
  const use = props?.use ?? true;

  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState<GeoLocation>();
  // 위치 엑세스 허용 여부
  const [isGeoAccess, setIsGeoAccess] = useState(false);

  const updateLocation = useCallback(() => {
    if (!use) return;
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setIsGeoAccess(true);
        setIsLoading(false);
      },
        () => {
          setIsGeoAccess(false);
          setIsLoading(false);
        },
      );
    }
  }, [props?.use]);

  useEffect(() => {
    updateLocation();
  }, [updateLocation]);

  return { isLoading, location, isGeoAccess, updateLocation };
};