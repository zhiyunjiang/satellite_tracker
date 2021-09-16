import * as React from 'react';
import { Cartesian3 } from 'cesium';
import { CzmlDataSource, Viewer, CameraFlyTo } from 'resium';
import { buildOrbitalCzmlData } from 'modules/Cesium';
import { CartographicDegree } from 'modules/Orbit';

type Props = {
  startTime: Date;
  orbital: CartographicDegree[];
};

const RootPage: React.VFC<Props> = ({ startTime, orbital }) => {
  const czmlData = React.useMemo(() => {
    return buildOrbitalCzmlData(startTime, orbital);
  }, []);

  return (
    <Viewer full>
      <CameraFlyTo
        destination={Cartesian3.fromDegrees(
          orbital[0].longitude,
          orbital[0].latitude,
          20000000
        )}
      />
      <CzmlDataSource data={czmlData} />
    </Viewer>
  );
};

export default RootPage;