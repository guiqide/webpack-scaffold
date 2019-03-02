/*
 +----------------------------------------------------------------------+
 | webpack4-scaffold                                                    |
 +----------------------------------------------------------------------+
 | Author: kevingui <guiqide@gmail.com>                                 |
 +----------------------------------------------------------------------+
 */
const merge = require('webpack-merge')
const baseConf = require('./webpack.common')

const config = merge(baseConf, {
    mode: 'development',
})

module.exports = (env, argv) => {
    if (config.mode === 'development') {
        config.devtool = 'source-map'
    }
    return config
}