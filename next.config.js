const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        CESIUM_BASE_URL: JSON.stringify('cesium'),
        'process.env': {
          GA_TRACKING_CODE: JSON.stringify(process.env.GA_TRACKING_CODE),
          CECIUM_ACCESS_TOKEN: JSON.stringify(process.env.CECIUM_ACCESS_TOKEN),
        },
      }),
      isProduction
        ? new CopyWebpackPlugin({
            patterns: [
              {
                from: 'node_modules/cesium/Build/Cesium',
                to: '../public/cesium',
              },
            ],
          })
        : {}
    );
    return config;
  }
};
