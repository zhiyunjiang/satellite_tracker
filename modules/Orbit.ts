import * as satellite from 'satellite.js';
import dayjs from 'dayjs';

type TleLines = {
  line1: string;
  line2: string;
}

export type CartographicDegree = {
  offset: number;
  longitude: number;
  latitude: number;
  altitude: number;
};

export const getOrbital = async (tleLines: TleLines, time: Date) => {
  const satrec = satellite.twoline2satrec(tleLines.line1, tleLines.line2);

  const start = dayjs(time);
  const cartographicDegrees: CartographicDegree[] = [];

  // 5400s = 1.5h
  let i = 0;
  while (i < 5400) {
    const time = start.add(i, 'seconds');
    const { position: positionEci } = satellite.propagate(
      satrec,
      time.toDate()
    );

    if (typeof positionEci === 'boolean') {
      continue;
    }

    const positionGd = satellite.eciToGeodetic(
      positionEci,
      satellite.gstime(time.toDate())
    );

    cartographicDegrees.push({
      offset: i * 60,
      longitude: satellite.degreesLong(positionGd.longitude),
      latitude: satellite.degreesLat(positionGd.latitude),
      altitude: positionGd.height * 1000,
    });

    i += 1;
  }

  return cartographicDegrees;
};
