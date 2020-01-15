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
      description:
        '<p>国際宇宙ステーション(ISS)</p> <p>国際宇宙ステーションは、地球及び宇宙の観測、宇宙環境を利用した様々な研究や実験を行うための有人施設。</p> <p><a href="https://ja.wikipedia.org/wiki/%E5%9B%BD%E9%9A%9B%E5%AE%87%E5%AE%99%E3%82%B9%E3%83%86%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3" target="_blank" rel="noopener noreferrer">参照</a></p>',
      label: {
        fillColor: {
          rgba: [255, 255, 255, 255],
        },
        font: '11pt Lucida Console',
        horizontalOrigin: 'LEFT',
        pixelOffset: {
          cartesian2: [12, 0],
        },
        show: true,
        text: 'ISS',
        verticalOrigin: 'CENTER',
      },
      ellipsoid: {
        radii: {
          cartesian: [100000.0, 100000.0, 100000.0],
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
      ellipse: {
        semiMinorAxis: 50000.0,
        semiMajorAxis: 50000.0,
        height: response.position.alt,
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
