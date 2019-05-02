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

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}
const config = merge(baseConf, {
    devServer: {
        index: 'index.html',
        compress: true,
        port: 8888,
        open: true,
        proxy: {
        },
        contentBase: resolve('dist'),
        // publicPath: ''
    },
    mode: 'development',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ]
})

module.exports = (env, argv) => {
    if (config.mode === 'development') {
        config.devtool = 'source-map'
    }
    return config
}