const _ = require('lodash');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { UnusedFilesWebpackPlugin } = require('unused-files-webpack-plugin');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OfflinePlugin = require('offline-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

const { getConfig } = require('./base.config');

const ENVIRONMENT = 'production';

module.exports = (env = {}) =>
  merge(getConfig(ENVIRONMENT), {
    devtool: 'source-map',
    entry: {
      main: ['./src/index.js'],
    },
    mode: 'production',
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
      ],
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: true,
        }),
        new OptimizeCssAssetsPlugin(),
      ],
      runtimeChunk: true,
      splitChunks: {
        chunks: 'all',
      },
    },
    output: {
      filename: 'assets/js/[name].[contenthash].bundle.js',
    },
    plugins: _.compact([
      new CleanWebpackPlugin(),

      new MiniCssExtractPlugin({
        chunkFilename: 'assets/css/[name].[contenthash].bundle.css',
        filename: 'assets/css/[name].[contenthash].bundle.css',
      }),

      // Launch the bundle analyzer if --env.analyze=true is passed via  CLI
      env.analyze && new BundleAnalyzerPlugin(),

      new webpack.EnvironmentPlugin({
        NODE_ENV: ENVIRONMENT,
        REACT_APP_API_ENDPOINT: 'https://api.0xtracker.com',
        REACT_APP_AUTO_RELOAD_INTERVAL: '30 seconds',
      }),

      new OfflinePlugin({
        ServiceWorker: {
          events: true,
        },
        appShell: '/',
        autoUpdate: 60000,
        excludes: ['**/.*', '**/*.map', '**/*.gz', '_redirects'],
      }),

      new UnusedFilesWebpackPlugin({
        failOnUnused: true,
        globOptions: {
          ignore: [
            'src/**/*.stories.js',
            'src/components/hidden.js',
            'src/components/visible.js',
            'src/**/*.test.js',
            'src/**/*.test.js.snap',
            'src/test-util/**/*.*',
            'src/components/filter-button.js',
            'src/features/traders/components/traders-filter-dialog.js',
            'src/features/traders/components/traders-filter.js',
            'src/features/traders/components/trader-type-selector.js',
          ],
        },
        patterns: ['src/**/*.*'],
      }),
    ]),
  });
