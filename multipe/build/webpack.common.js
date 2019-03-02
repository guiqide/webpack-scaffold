/*
 +----------------------------------------------------------------------+
 | webpack4-scaffold                                                    |
 +----------------------------------------------------------------------+
 | Author: kevingui <guiqide@gmail.com>                                 |
 +----------------------------------------------------------------------+
 */
const fs = require('fs')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
// postcss
const autoprefixer = require('autoprefixer')
const precss = require('precss')

require('./check-versions')()

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

function addEntry(str) {
    return `./src/app/${str}/index.js`
}

const config = {
    entry: {
        index: addEntry('index'),
        offline: addEntry('offline')
    },
    output: {
        filename: '[name].[chunkhash].js',
        path: resolve('dist')
    },
    module: {
        rules: [
            {
                include: [resolve('src')],
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
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        // publicPath: '../dist/' // 静态资源的url路径
                    }
                },{
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                        sourceMap: true
                    }
                }, {
                    loader: 'postcss-loader',
                    options: {
                        plugins: function () {
                            return [precss, autoprefixer];
                        }
                    }
                }],

            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 5000,
                        name: './assets/[name].[hash].[ext]',
                        fallback: 'file-loader'
                    }
                }]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['../dist'], {
            allowExternal: true
        }),
        // new HtmlWebpackPlugin({
        //     template: './src/app/index/index.html',
        // }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ],
    resolve: {
        alias: {
            '@': resolve('src'),
            'lib': resolve('src/lib'),
            'assets': resolve('src/assets'),
            'common': resolve('src/common')
        }
    }
}

let filenames = fs.readdirSync(resolve('src/app'));
filenames.forEach(function (filename) {
    let stats = fs.statSync(path.resolve(resolve('src/app'), filename));
    if (stats.isDirectory()) {
        let extension = path.extname(filename);
        let name = filename.substring(0, filename.lastIndexOf(extension));
        // config.entry[name] = path.resolve(resolve('src/app'), 'js', name + '.js')
        config.plugins.push(new HtmlWebpackPlugin({
            filename: name + '.html',
            template: path.resolve(resolve('src/app'), name,'index.html'),
            inject: true,
            chunks: ['common', name] //这个设置使得每个 html 只包含 common 以及与自己命名相同的那一个 chunk
        }));
    }
});

module.exports = config