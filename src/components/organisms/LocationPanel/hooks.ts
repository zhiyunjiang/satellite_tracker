import { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { getLocation } from '@/modules/Orbit';
import { Tle } from '@/models/Tle/types';

type Location = {
  longitude: number;
  latitude: number;
  height: number;
};

const format = (value: number) => {
  return (Math.round(value * 100) / 100).toFixed(2);
};

export const useLocationPanel = (tle: Tle) => {
  const [location, setLocation] = useState<Location>();

  const setCurrentLocation = useCallback(async () => {
    const initialLocation = await getLocation(tle, new Date());
    setLocation(initialLocation);
  }, [tle]);

  const interval = useRef<number>();

  useEffect(() => {
    interval.current = window.setInterval(() => {
      setCurrentLocation();
    }, 1000);

    return () => {
      const { current } = interval;
      if (current) {
        window.clearInterval(current);
      }
    };
  }, [setCurrentLocation]);

  const longitude = useMemo(() => {
    if (location) {
      return format(location.longitude);
    }
    return undefined;
  }, [location]);

  const latitude = useMemo(() => {
    if (location) {
      return format(location.latitude);
    }
    return undefined;
  }, [location]);

  const heigth = useMemo(() => {
    if (location) {
      return format(location.height / 1000);
    }
    return undefined;
  }, [location]);

  return { longitude, latitude, heigth };
};
