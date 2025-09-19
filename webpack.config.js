const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  const isDevelopment = !isProduction;
  const publicPath = isProduction ? '/memory-game/' : '/';
  
  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? '[name].[contenthash:8].js' : '[name].js',
      clean: true,
      publicPath: publicPath,
    },
    
    // Простая оптимизация только для production
    optimization: isProduction ? {
      minimize: true,
      // Простое разделение vendors от app кода
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: 10,
          },
        },
      },
    } : {
      moduleIds: 'named', // Лучше для отладки
    },
    
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-react', {
                  runtime: 'automatic' // Уменьшает размер bundle
                }]
              ],
              // Кеширование для ускорения сборки
              cacheDirectory: true,
            },
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/,
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: 8 * 1024, // Inline маленькие изображения (8kb)
            }
          },
          generator: {
            filename: 'assets/img/[name].[hash:8][ext]'
          }
        },
        {
          test: /\.(woff|woff2)$/,
          type: 'asset/resource',
          generator: {
            filename: 'assets/fonts/[name].[hash:8][ext]'
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
        publicPath: publicPath,
        // Минификация HTML только в production
        ...(isProduction && {
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            minifyJS: true,
            minifyCSS: true,
          },
        }),
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
      compress: true,
      // Улучшенные настройки для стабильности
      client: {
        overlay: {
          errors: true,
          warnings: false,
        },
        reconnect: true,
      },
    },
    
    resolve: {
      extensions: ['.js', '.jsx'],
      // Простые алиасы для удобства
      alias: {
        '@': path.resolve(__dirname, 'src'),
      }
    },
    
    performance: {
      maxAssetSize: isProduction ? 250000 : 500000,
      maxEntrypointSize: isProduction ? 250000 : 500000,
      hints: isProduction ? 'warning' : false
    },
    
    // Source maps для отладки
    devtool: isDevelopment ? 'eval-cheap-module-source-map' : 'source-map',
  };
};