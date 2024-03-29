import dayjs from 'dayjs';
import ellipse from 'assets/img/ellipse.png';
import { SatelliteLocation } from './Orbit';

export const buildOrbitalCzmlData = (
  startTime: Date,
  orbital: SatelliteLocation[]
) => {
  const start = dayjs(startTime);
  const currentTime = start.toISOString();

  const { offsetTime: endOffsetTime } = orbital[orbital.length - 1];
  const end = dayjs(startTime).add(endOffsetTime, 'seconds');
  const availability = `${currentTime}/${end.toISOString()}`;

  const cartographicDegrees = orbital.reduce<number[]>((acc, item) => {
    acc.push(item.offsetTime);
    acc.push(item.longitude);
    acc.push(item.latitude);
    acc.push(item.altitude);
    return acc;
  }, []);

  return [
    {
      id: 'document',
      name: 'CZML',
      version: '1.0',
      clock: { currentTime },
    },
    {
      id: 'Satellite/ISS (ZARYA)',
      name: 'ISS (ZARYA)',
      availability,
      description: 'ISS (ZARYA)',
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
        text: 'ISS (ZARYA)',
        verticalOrigin: 'CENTER',
      },
      billboard: {
        horizontalOrigin: 'CENTER',
        image: ellipse.blurDataURL,
        scale: 1,
        show: true,
        verticalOrigin: 'CENTER',
      },
      path: {
        show: [
          {
            interval: availability,
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
        epoch: currentTime,
        cartographicDegrees,
      },
    },
  ];
};
