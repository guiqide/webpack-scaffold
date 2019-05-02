/*
 +----------------------------------------------------------------------+
 | webpack4-scaffold                                                    |
 +----------------------------------------------------------------------+
 | Author: kevingui <guiqide@gmail.com>                                 |
 +----------------------------------------------------------------------+
 */
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConf = require('./webpack.common')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}
const config = merge(baseConf, {
    mode: 'production',
    devServer: {
        index: 'index.html',
        compress: true,
        port: 8889,
        open: true,
        proxy: {
        },
        contentBase: resolve('dist'),
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ],
    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin({})
        ]
    },
})
module.exports = (env, argv) => {
    if (config.mode === 'production') {
        config.devtool = 'source-map'
    }
    return config
}