const webpack = require('webpack');

module.exports = {
  reactStrictMode: true,
  webpack: config => {
    config.plugins.push(
      new webpack.DefinePlugin({
        CESIUM_BASE_URL: JSON.stringify('cesium'),
        'process.env': {
          GA_TRACKING_CODE: JSON.stringify(process.env.GA_TRACKING_CODE),
          CECIUM_ACCESS_TOKEN: JSON.stringify(process.env.CECIUM_ACCESS_TOKEN),
        },
      }),
    );
    return config;
  }
}
