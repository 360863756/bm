/* eslint-disable indent */
const webpack = require('webpack');
const path = require('path');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

// port = 9528 npm run dev || npm run dev --port = 9528 || 9528
const port = process.env.port || process.env.npm_config_port || 9528;
const assetsDir = process.env.VUE_APP_ASSETS_DIR || 'static';

module.exports = {
  publicPath: process.env.PUBLIC_PATH || '/',
  outputDir: 'dist',
  assetsDir: assetsDir,
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port,
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        // 后端服务
        target: process.env.VUE_PROXY_TARGET || '/',
        pathRewrite: {
          [`^${process.env.VUE_APP_BASE_API}`]: '',
        },
      },
      '/static': {
        // 后端服务
        target: process.env.VUE_PROXY_TARGET || '/',
      },
    },
  },
  configureWebpack: {
    name: process.env.VUE_APP_TITLE || require('./package.json').name,
  },
  chainWebpack(config) {
    const {
      NODE_ENV
    } = process.env || {};
    // set svg-sprite-loader
    config.module
    .rule('svg')
      .exclude.add(path.resolve(__dirname, 'src/icons'))
      .end();
    config.module
      .rule('icons')
        .test(/\.svg$/)
        .include
          .add(path.resolve(__dirname, 'src/icons'))
          .end()
        .use('svg-sprite-loader')
          .loader('svg-sprite-loader')
          .options({
            symbolId: 'icon-[name]'
          })
          .end()
        .use('svgo-loader')
          .loader('svgo-loader')
          .options({
            externalConfig: 'svgo.yml'
          });
    config
      .when(NODE_ENV === 'production', config => {
        config
          .plugin('dll')
          .use(webpack.DllReferencePlugin, [{
            manifest: require('./dll/vendor-manifest.json'),
          }])
          .end()
          .plugin('addAssetHtml')
          .after('html')
          .use(AddAssetHtmlWebpackPlugin, [{
            filepath: path.resolve(__dirname, './dll/*.dll.js'),
            outputPath: `${assetsDir}/js`,
            hash: true,
            publicPath: `${process.env.PUBLIC_PATH}/${assetsDir}/js`,
          }])
          .end()
          .optimization
          .runtimeChunk('single')
          .splitChunks({
            chunks: 'all',
            cacheGroups: {
              commons: {
                name: 'chunk-commons',
                test: path.resolve(__dirname, 'src/components'),
                minChunks: 3,
                priority: 5,
                reuseExistingChunk: true,
              },
              libs: {
                name: 'chunk-libs',
                test: /[\\/]node_modules[\\/]/,
                priority: 10,
                chunks: 'initial',
              },
              elementUI: {
                name: 'chunk-elementUI',
                test: /[\\/]node_modules[\\/]_?element-ui(.*)/,
                priority: 20,
              },
              uedComponents: {
                name: 'chunk-uedComponents',
                test: /[\\/]node_modules[\\/]_?ued-components(.*)/,
                priority: 20,
              },
              icons: {
                name: 'chunk-icons',
                test: path.resolve(__dirname, './src/icons'),
                priority: 20,
              },
            }
          });
      });
  },
};
