'use strict';

const path = require('path');

const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const cesiumSource = 'node_modules/cesium/Source';
const cesiumWorkers = '../Build/Cesium/Workers';

module.exports = (_, args) => {
  const prod = args.mode === 'production';
  return {
    context: __dirname,
    devServer: {
      hot: true,
      port: 3001,
      open: true,
    },
    devtool: !prod ? void 0 : 'eval-source-map',
    entry: ['./src/index.tsx'],
    mode: prod ? 'production' : 'development',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: 'ts-loader',
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|gif|jpg|jpeg|svg|xml|json)$/,
          use: ['url-loader'],
        },
        ...[
          prod
            ? {
                // Strip cesium pragmas
                test: /\.js$/,
                enforce: 'pre',
                include: path.resolve(__dirname, cesiumSource),
                use: [
                  {
                    loader: 'strip-pragma-loader',
                    options: {
                      pragmas: {
                        debug: false,
                      },
                    },
                  },
                ],
              }
            : {},
        ],
      ],
    },
    output: {
      path: path.join(__dirname, 'build'),
    },
    plugins: [
      new webpack.DefinePlugin({
        CESIUM_BASE_URL: JSON.stringify('/'),
        'process.env': {
          GA_TRACKING_CODE: JSON.stringify(process.env.GA_TRACKING_CODE),
          BACKEND_URL: prod
            ? JSON.stringify(process.env.CLOUD_FUNCTIONS_BASE_URL)
            : JSON.stringify('http://localhost:3000'),
        },
      }),
      new CopyPlugin([
        {
          from: path.join(cesiumSource, cesiumWorkers),
          to: 'Workers',
        },
        {
          from: path.join(cesiumSource, 'Assets'),
          to: 'Assets',
        },
        {
          from: path.join(cesiumSource, 'Widgets'),
          to: 'Widgets',
        },
      ]),
      new HtmlPlugin({
        template: 'index.html',
      }),
      ...(prod ? [] : [new webpack.HotModuleReplacementPlugin()]),
    ],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      alias: {
        ...(prod
          ? {}
          : {
              'react-dom': '@hot-loader/react-dom',
            }),
        cesium$: 'cesium/Cesium',
        cesium: 'cesium/Source',
      },
    },
  };
};
