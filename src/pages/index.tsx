import * as React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { SatelliteLocation, getOrbital } from '@/modules/Orbit';
import TleRepository from '@/models/Tle/repository';
import { Tle } from '@/models/Tle/types';

const RootPage = dynamic(() => import('../components/pages/RootPage'), {
  ssr: false,
});

type Props = {
  startTime: number;
  orbital: SatelliteLocation[];
  tle: Tle;
};

const Root: NextPage<Props> = ({ startTime, orbital, tle }) => {
  return (
    <>
      <Head>
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="cesium/Widgets/widgets.css" />
      </Head>
      <RootPage startTime={new Date(startTime)} orbital={orbital} tle={tle} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const tle = await TleRepository().find('ISS (ZARYA)');

  const startTime = new Date();
  const orbital = await getOrbital(tle, startTime);

  return { props: { startTime: startTime.getTime(), orbital, tle } };
};

export default Root;
