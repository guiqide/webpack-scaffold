import merge from 'webpack-merge'
import baseConfig from './webpack.common'

module.export = merge(baseConfig, {
    devServer: {

    },
    mode: 'development',
    plugins: [
    ]
})