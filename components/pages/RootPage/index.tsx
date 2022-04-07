import * as React from 'react';
import { Cartesian3 } from 'cesium';
import { CzmlDataSource, Viewer, CameraFlyTo, Clock } from 'resium';
import { buildOrbitalCzmlData } from 'modules/Cesium';
import { SatelliteLocation } from 'modules/Orbit';

type Props = {
  startTime: Date;
  orbital: SatelliteLocation[];
};

const RootPage: React.VFC<Props> = ({ startTime, orbital }) => {
  const czmlData = React.useMemo(() => {
    return buildOrbitalCzmlData(startTime, orbital);
  }, [startTime, orbital]);

  return (
    <Viewer full>
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
