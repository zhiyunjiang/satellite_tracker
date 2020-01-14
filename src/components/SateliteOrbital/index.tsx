import * as React from 'react';
import { Cartesian3 } from 'cesium';
import { CzmlDataSource, CameraFlyTo } from 'resium';
import { getOrbital, GetOrbitalResponse } from '../../queries/orbitalQuery';

const { useState, useCallback, useEffect } = React;

type OrbitalState = {
  isLoading: boolean;
  isError: boolean;
  response?: GetOrbitalResponse;
};

const useOrbital = () => {
  const [state, setState] = useState<OrbitalState>({
    isLoading: true,
    isError: false,
    response: undefined,
  });

  const fetchData = useCallback(async () => {
    const res = await getOrbital();
    if (res.status >= 400) {
      setState(prevState => {
        return { ...prevState, isLoading: false, isError: true };
      });
    }
    const data = res.data as GetOrbitalResponse;
    setState(prevState => {
      return {
        ...prevState,
        isLoading: false,
        isError: false,
        response: data,
      };
    });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ...state };
};

const SateliteOrbital: React.FC = () => {
  const { isError, isLoading, response } = useOrbital();
  if (isLoading) return null;
  if (isError || !response) return null;

  const czml = [
    {
      id: 'document',
      name: 'CZML',
      version: '1.0',
      clock: {
        currentTime: response.epoch,
      },
    },
    {
      id: 'Satellite/ISS',
      name: 'ISS',
      availability: response.availability,
      description: '<p>The International Space Station (ISS)</p>',
      ellipsoid: {
        radii: {
          cartesian: [50000.0, 50000.0, 50000.0],
        },
        fill: true,
        material: {
          solidColor: {
            color: {
              rgba: [9, 175, 237, 255],
            },
          },
        },
      },
      path: {
        show: [
          {
            interval: response.availability,
            boolean: true,
          },
        ],
        width: 1,
        material: {
          solidColor: {
            color: {
              rgba: [9, 175, 237, 120],
            },
          },
        },
        resolution: 120,
      },
      position: {
        epoch: response.epoch,
        cartographicDegrees: response.cartographicDegrees,
      },
    },
  ];

  return (
    <>
      <CameraFlyTo
        destination={Cartesian3.fromDegrees(response.position.lon, response.position.lat, 20000000)}
      />
      <CzmlDataSource data={czml} />
    </>
  );
};

export default SateliteOrbital;
