const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
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
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html'  
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
    static: [
      { directory: './public' },
      { directory: './public/data', publicPath: '/data' }
    ],
    historyApiFallback: true,
    port: 3001,
    open: true,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  performance: {
    maxAssetSize: 300000,
    maxEntrypointSize: 300000
  },
  
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};