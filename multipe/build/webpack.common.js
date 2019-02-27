import path from 'path'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const autoprefixer = require('autoprefixer');
const precss = require('precss');

module.exports = {
    entry: {
        app: './src/app',
        offline: './src/offline/index.js'
    },
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                include: [path.resolve(__dirname, 'src')],
                loader: 'babel-loader',
                options: {
                    plugins: ['syntax-dynamic-import'],

                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                modules: false
                            }
                        ]
                    ]
                },

                test: /\.js$/
            },
            {
                test: /\.css$/,

                use: [{
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',

                        options: {
                            importLoaders: 1,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',

                        options: {
                            plugins: function () {
                                return [precss, autoprefixer];
                            }
                        }
                    }
                ]
            }
        ]
    }
}