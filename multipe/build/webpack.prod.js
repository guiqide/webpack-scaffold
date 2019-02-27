import merge from 'webpack-merge'
import baseConf from './webpack.common'

module.export = merge(baseConf, {
    mode: 'production',
     plugins: [
     ]
})