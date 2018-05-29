const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),   //path.resolve 返回一个以相对于当前的工作目录
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                enforce: 'pre',            //指定为前置类型 eslint 语法检查置前
                test: /\.jsx?$/,          //匹配条件
                exclude: /node_modules/,  //排除特定路径
                loader: 'eslint-loader'   //配置的loader
            },
            {
                test: /\.jsx?$/,
                include: [               //匹配特定路径
                    path.resolve(__dirname, 'src')
                ],
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    /**
                     * ExtractTextPlugin : 用它来把依赖的 CSS 分离出来成为单独的文件
                     * extract : 获取对应需要的 loader
                     * css-loader 负责解析 CSS 代码，主要是为了处理 CSS 中的依赖，例如 @import 和 url() 等引用外部文件的声明；
                     * style-loader 会将 css-loader 解析的结果转变成 JS 代码，运行时动态插入 style 标签来让 CSS 代码生效。
                     * */
                    fallback: 'style-loader',
                    use: ['css-loader']
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'less-loader',
                    ],
                }),
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },

        ],
    },
    /**
     * resolve : 解析代码模块路径
     * 我们可以使用类似 import * as m from './index.js' 来引用代码模块 index.js。
     * 引用第三方类库则是像这样：import React from 'react'
     * */
    resolve: {
        alias: {
            utils: path.resolve(__dirname, 'src/utils'),
            log$: path.resolve(__dirname, 'src/utils/log.js') //只匹配 log
        },
        // extensions : 这里的顺序代表匹配后缀的优先级，例如对于 index.js 和 index.jsx，会优先选择 index.js
        extensions: ['.js', '.json', '.jsx', '.css', '.less'],
        modules: [
            path.resolve(__dirname, 'node_modules') //modules : 优先查找 node_modules 目录
        ]

    },

    plugins: [
        /**
         * HtmlWebpackPlugin : 将 HTML 引用路径和我们的构建结果关联起来
         * ExtractTextPlugin : 用它来把依赖的 CSS 分离出来成为单独的文件
         * DefinePlugin : 创建一些在编译时可以配置的全局常量
         * CopyWebpackPlugin : 有些文件没经过 webpack 处理，但是我们希望它们也能出现在 build 目录下
         * ProvidePlugin : 引用某些模块作为应用运行时的变量，从而不必每次都用 require 或者 import
         *  */
        new HtmlWebpackPlugin({
            filename: 'index.html', // 配置输出文件名和路径
            template: 'src/index.html', // 配置文件模板
        }),

        new ExtractTextPlugin('[name].css'),

        new webpack.DefinePlugin({
            TWO: '1+1',
            CONSTANTS: {
                APP_VERSION: JSON.stringify('1.1.2'), // const CONSTANTS = { APP_VERSION: '1.1.2' }
            },
        }),

        new CopyWebpackPlugin([
            // 顾名思义，from 配置来源，to 配置目标路径
            {from: 'src/assets/favicon.ico', to: 'favicon.ico'}
        ]),

        new webpack.ProvidePlugin({
            _: "lodash",
        }),
    ],

    // 开发环境配置
    devServer: {
        port: '1234',
        before(app) {
            app.get('/api/test.json', function (req, res) { // 当访问 /some/path 路径时，返回自定义的 json 数据
                res.json({code: 200, message: 'hello world'})
            })
        }
    }
};