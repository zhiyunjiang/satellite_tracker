import * as React from 'react';
import { CzmlDataSource, CameraFlyTo } from 'resium';
import Loading from '../Loading';
import useOrbital from './hooks';

const SateliteOrbital: React.FC = () => {
  const { isError, isLoading, czml, destination } = useOrbital();
  if (isLoading) return <Loading />;
  if (isError || !czml || !destination) return null;

  return (
    <>
      <CameraFlyTo destination={destination} />
      <CzmlDataSource data={czml} />
    </>
  );
};

export default SateliteOrbital;
