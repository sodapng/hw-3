const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const ESLintWebpackPlugin = require('eslint-webpack-plugin')

const { resolve } = require('path')

const isDevelopment = process.env.NODE_ENV !== 'production'

module.exports = {
  entry: resolve(__dirname, 'src', 'index.tsx'),
  mode: isDevelopment ? 'development' : 'production',
  target: isDevelopment ? 'web' : 'browserslist',
  context: __dirname,
  devtool: isDevelopment ? 'eval-source-map' : 'hidden-source-map',
  output: {
    clean: true,
    path: resolve(__dirname, 'dist'),
    filename: '[contenthash].bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    plugins: [new TsconfigPathsPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        use: 'babel-loader',
      },
      {
        test: /\.scss$/i,
        exclude: /\.module\.scss$/i,
        use: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 3,
              modules: {
                mode: 'icss',
              },
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.module\.scss$/i,
        use: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 3,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
      {
        test: /\.svg$/i,
        issuer: /\.tsx?$/,
        resourceQuery: { not: [/url/] },
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              prettier: false,
              svgo: false,
              svgoConfig: {
                plugins: [{ removeViewBox: false }],
              },
              titleProp: true,
              ref: true,
            },
          },
        ],
      },
      {
        test: /\.svg$/i,
        type: 'asset/resource',
        resourceQuery: /url/,
        generator: {
          filename: '[hash][ext][query]',
        },
      },
    ],
  },
  devServer: {
    host: '127.0.0.1',
    port: 3000,
    hot: true,
    compress: true,
    open: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'public', 'index.html'),
    }),
    new ForkTsCheckerWebpackPlugin(),
    new ESLintWebpackPlugin(),
    isDevelopment && new MiniCssExtractPlugin(),
    isDevelopment && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
}
