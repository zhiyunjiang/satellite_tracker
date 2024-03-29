import { VFC, useMemo } from 'react';
import { Cartesian3 } from 'cesium';
import { CzmlDataSource, Viewer, CameraFlyTo, Clock } from 'resium';
import { buildOrbitalCzmlData } from '@/modules/Cesium';
import { SatelliteLocation } from '@/modules/Orbit';
import { Tle } from '@/models/Tle/types';
import LocationPanel from '@/components/organisms/LocationPanel';

type Props = {
  startTime: Date;
  orbital: SatelliteLocation[];
  tle: Tle;
};

const RootPage: VFC<Props> = ({ startTime, orbital, tle }) => {
  const czmlData = useMemo(() => {
    return buildOrbitalCzmlData(startTime, orbital);
  }, [startTime, orbital]);

  return (
    <Viewer full>
      <LocationPanel tle={tle} />
      <CameraFlyTo
        destination={Cartesian3.fromDegrees(
          orbital[0].longitude,
          orbital[0].latitude,
          20000000
        )}
      />
      <Clock shouldAnimate />
      <CzmlDataSource data={czmlData} />
    </Viewer>
  );
};

export default RootPage;
