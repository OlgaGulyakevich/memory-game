const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  const publicPath = isProduction ? '/memory-game/' : '/';
  
  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? 'bundle.[contenthash].js' : 'bundle.js',
      clean: true,
      publicPath: publicPath,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react'],
            },
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|jpe?g|gif|svg|woff2?)$/,
          type: 'asset/resource',
          generator: {
            filename: 'assets/[name].[hash][ext]'
          }
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.PUBLIC_URL': JSON.stringify(publicPath.slice(0, -1)) 
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: 'index.html',
        inject: true,
        publicPath: publicPath
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: 'public/404.html', to: '404.html' },
          { from: 'public/img', to: 'img' },
          { from: 'public/data', to: 'data' },
          { from: 'public/fonts', to: 'fonts' },
          { from: 'public/favicon*.png', to: '[name][ext]' },
          { from: 'public/favicon.ico', to: 'favicon.ico' },
        ],
      }),
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, 'public'),
        publicPath: '/'
      },
      historyApiFallback: true,
      port: 3001,
      open: true,
      hot: true,
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    performance: {
      maxAssetSize: 300000,
      maxEntrypointSize: 300000,
      hints: isProduction ? 'warning' : false
    },
  };
};