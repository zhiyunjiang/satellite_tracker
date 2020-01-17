import * as React from 'react';
import { Cartesian3 } from 'cesium';
import { getOrbital, GetOrbitalResponse } from '../../queries/orbitalQuery';
import * as ellipseImg from '../../assets/img/ellipse.png';
const { useState, useCallback, useEffect } = React;

const orbitalCzml = (data: GetOrbitalResponse) => {
  return [
    {
      id: 'document',
      name: 'CZML',
      version: '1.0',
      clock: {
        currentTime: data.epoch,
      },
    },
    {
      id: 'Satellite/ISS',
      name: 'ISS',
      availability: data.availability,
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
      billboard: {
        horizontalOrigin: 'CENTER',
        image: ellipseImg.default,
        scale: 0.5,
        show: true,
        verticalOrigin: 'CENTER',
      },
      path: {
        show: [
          {
            interval: data.availability,
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
        epoch: data.epoch,
        cartographicDegrees: data.cartographicDegrees,
      },
    },
  ];
};

type OrbitalState = {
  isLoading: boolean;
  isError: boolean;
  czml?: object;
  destination?: Cartesian3;
};

const useOrbital = () => {
  const [state, setState] = useState<OrbitalState>({
    isLoading: true,
    isError: false,
    czml: undefined,
    destination: undefined,
  });

  const fetchData = useCallback(async () => {
    const res = await getOrbital();
    if (res.status >= 400) {
      setState({ isLoading: false, isError: true });
    }
    const data = res.data as GetOrbitalResponse;
    setState({
      isLoading: false,
      isError: false,
      czml: orbitalCzml(data),
      destination: Cartesian3.fromDegrees(data.position.lon, data.position.lat, 20000000),
    });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ...state };
};

export default useOrbital;
