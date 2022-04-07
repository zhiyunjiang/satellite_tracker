import * as satellite from 'satellite.js';
import dayjs from 'dayjs';

type TleLines = {
  line1: string;
  line2: string;
};

/**
 * SatelliteLocation
 * offsetTime: Offset time from start time [second].
 * longitude: longitude [degree].
 * latitude: latitude [degree].
 * altitude: altitude [meter].
 */
export type SatelliteLocation = {
  offsetTime: number;
  longitude: number;
  latitude: number;
  altitude: number;
};

export const getOrbital = async (tleLines: TleLines, time: Date) => {
  const satrec = satellite.twoline2satrec(tleLines.line1, tleLines.line2);

  const start = dayjs(time);
  const result: SatelliteLocation[] = [];

  for (let i = 0; i < 100; i++) {
    const time = start.add(i, 'minutes');
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

    result.push({
      offsetTime: i * 60,
      longitude: satellite.degreesLong(positionGd.longitude),
      latitude: satellite.degreesLat(positionGd.latitude),
      altitude: positionGd.height * 1000,
    });
  }

  return result;
};
