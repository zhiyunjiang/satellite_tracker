import 'src/styles/globals.css';
import type { AppProps } from 'next/app';
import * as Cesium from 'cesium';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';

Cesium.Ion.defaultAccessToken = process.env.CECIUM_ACCESS_TOKEN || '';

config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
