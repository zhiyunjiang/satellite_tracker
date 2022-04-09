import * as React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { SatelliteLocation, getOrbital } from '@/modules/Orbit';
import TleRepository from '@/models/Tle/repository';

const RootPage = dynamic(() => import('../components/pages/RootPage'), {
  ssr: false,
});

type Props = {
  startTime: number;
  orbital: SatelliteLocation[];
};

const Root: NextPage<Props> = ({ startTime, orbital }) => {
  return (
    <>
      <Head>
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="cesium/Widgets/widgets.css" />
      </Head>
      <RootPage startTime={new Date(startTime)} orbital={orbital} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const tle = await TleRepository().find('ISS (ZARYA)');

  const startTime = new Date();
  const orbital = await getOrbital(tle, startTime);

  return { props: { startTime: startTime.getTime(), orbital } };
};

export default Root;
