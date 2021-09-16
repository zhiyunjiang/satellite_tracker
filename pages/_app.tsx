import 'styles/globals.css';
import type { AppProps } from 'next/app';
import * as Cesium from 'cesium';

Cesium.Ion.defaultAccessToken = process.env.CECIUM_ACCESS_TOKEN || '';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
