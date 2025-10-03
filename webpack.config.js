
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  const isDevelopment = !isProduction;
  const publicPath = isProduction 
    ? (process.env.GITHUB_PAGES ? '/memory-game/' : '/') 
    : '/';
  
  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? '[name].[contenthash:8].js' : '[name].js',
      chunkFilename: isProduction ? 'js/[name].[contenthash:8].chunk.js' : '[name].chunk.js',
      clean: true,
      publicPath: publicPath,
    },
    
    optimization: isProduction ? {
      minimize: true,
      usedExports: true,
      sideEffects: false, 
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        minSize: 20000,
        maxSize: 244000,
        cacheGroups: {
          // React separately
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
            name: 'react-vendor',
            priority: 20,
            enforce: true,
          },
          // React Router separately
          router: {
            test: /[\\/]node_modules[\\/](react-router|react-router-dom|@remix-run)[\\/]/,
            name: 'router-vendor',
            priority: 15,
            enforce: true,
          },
          // Other vendor libraries
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: 10,
          },
         // Common code of the application
          common: {
            minChunks: 2,
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      },
    } : {
      moduleIds: 'named',
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
                ['@babel/preset-env', {
                  targets: '> 0.25%, not dead', 
                  modules: false,                   
                }],
                ['@babel/preset-react', {
                  runtime: 'automatic'
                }]
              ],
              cacheDirectory: true,
              cacheCompression: false,
            },
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: 10 * 1024, 
            },
          },
          generator: {
            filename: 'assets/images/[name].[hash:8][ext]'
          }
        },
        {
          test: /\.svg$/i,
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: 4 * 1024, 
            },
          },
          generator: {
            filename: 'assets/icons/[name].[hash:8][ext]'
          }
        },
        {
          test: /\.(woff|woff2)$/i,
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
          { from: 'public/robots.txt', to: 'robots.txt' },     
          { from: 'public/sitemap.xml', to: 'sitemap.xml' },
          { 
            from: 'public/img', 
            to: 'img',
            noErrorOnMissing: true,
          },
          { 
            from: 'public/data', 
            to: 'data',
            noErrorOnMissing: true,
          },
          { from: 'public/favicon*.png', to: '[name][ext]' },
          { from: 'public/favicon.ico', to: 'favicon.ico' },
        ],
      }),

      // Bundle analyzer for analyzing the size
      ...(env && env.analyze ? [
        new (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)()
      ] : []),
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
      client: {
        overlay: {
          errors: true,
          warnings: false,
        },
      },
    },
    
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      }
    },

    performance: {
      maxAssetSize: 244000, 
      maxEntrypointSize: 244000,
      hints: isProduction ? 'warning' : false,
    },
    
    devtool: isDevelopment ? 'eval-cheap-module-source-map' : false,
  };
};