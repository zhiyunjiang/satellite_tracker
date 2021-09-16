import * as React from 'react';
import { CzmlDataSource, Viewer } from 'resium';
import { buildOrbitalCzmlData } from '../../../modules/Cesium';
import { CartographicDegree } from '../../../modules/Orbit';

type Props = {
  startTime: Date;
  orbital: CartographicDegree[];
}

const RootPage: React.VFC<Props> = ({ startTime, orbital }) => {
  const czmlData = React.useMemo(() => {
    return buildOrbitalCzmlData(startTime, orbital)
  }, []);

  return (
    <Viewer full>
      <CzmlDataSource data={czmlData} />
    </Viewer>
  );
}

export default RootPage;
