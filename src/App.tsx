import * as React from 'react';
import { Viewer, CzmlDataSource } from 'resium';
import { getCurrentPosition } from './queries/orbitalQuery';

const { useState, useCallback, useEffect } = React;

type CartographicDegrees = {
  lon: number;
  lat: number;
  alt: number;
};

type OrbitalState = {
  isLoading: boolean;
  isError: boolean;
  cartographicDegrees?: CartographicDegrees;
};

const useCurrentPosition = () => {
  const [state, setState] = useState<OrbitalState>({
    isLoading: true,
    isError: false,
    cartographicDegrees: undefined,
  });

  const fetchCurrentPosition = useCallback(async () => {
    const res = await getCurrentPosition();
    if (res.status >= 400) {
      setState(prevState => {
        return { ...prevState, isLoading: false, isError: true };
      });
    }
    const cartographicDegrees = res.data as CartographicDegrees;
    setState(prevState => {
      return {
        ...prevState,
        isLoading: false,
        isError: false,
        cartographicDegrees: cartographicDegrees,
      };
    });
  }, []);

  useEffect(() => {
    fetchCurrentPosition();
  }, [fetchCurrentPosition]);

  return { ...state };
};

const App: React.FC = () => {
  const { isError, isLoading, cartographicDegrees } = useCurrentPosition();
  if (isLoading) return <div>Loading....</div>;
  if (isError || !cartographicDegrees) return <div>Error!</div>;

  const czml = [
    {
      id: 'document',
      name: 'CZML',
      version: '1.0',
    },
    {
      id: 'shape1',
      name: 'ISS',
      position: {
        cartographicDegrees: [
          cartographicDegrees.lon,
          cartographicDegrees.lat,
          cartographicDegrees.alt,
        ],
      },
      ellipse: {
        semiMinorAxis: 50000.0,
        semiMajorAxis: 50000.0,
        height: cartographicDegrees.alt,
        material: {
          solidColor: {
            color: {
              rgba: [229, 32, 255, 127],
            },
          },
        },
        outline: true, // height must be set for outlines to display
        outlineColor: {
          rgba: [255, 255, 255, 255],
        },
      },
    },
  ];
  return (
    <Viewer full>
      <CzmlDataSource data={czml} />
    </Viewer>
  );
};

export default App;
