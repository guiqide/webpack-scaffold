/*
 +----------------------------------------------------------------------+
 | webpack4-scaffold                                                    |
 +----------------------------------------------------------------------+
 | Author: kevingui <guiqide@gmail.com>                                 |
 +----------------------------------------------------------------------+
 */
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConf = require('./webpack.common')

const config = merge(baseConf, {
    mode: 'development',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ],
})

module.exports = (env, argv) => {
    if (config.mode === 'development') {
        config.devtool = 'source-map'
    }
    return config
}