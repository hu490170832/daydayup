const path = require('path')
const webpack = require('webpack')


module.exports = function (env, argv) {
    return {
        mode: env.production ? 'production' : 'development',


        devtool: env.production ? 'source-maps' : 'eval', //enum
        /**
         * 通过在浏览器调试工具 (browser devtools) 中添加 (meta info) 增强调试
         * */

        entry: './app/entry', //string | object | array


        // 这里应用程序开始执行
        // webpack 开始打包
        output: {
            // webpack 如何输出结果相关选项

            path: path.resolve(__dirname, 'dist'),

            filename: 'bundle.js',
            /**
             * filename: '[name].js' 用于多个入口点(entry point)
             * filename: '[chunkhash].js' 用于长效缓存
             * */

            publicPath: '/assets/',
            /**
             * 输出解析文件的目录，url 相对于html页面
             * publicPath: 'https://cdn.example.com/'
             * */

            library: 'MyLibrary', //导出库(exported library)的名称

            libraryTarget: 'umd',
            /**
             * 导出库(exported library) 的类型
             * umd2: 通用模块定义 | commonjs2.js: exported with module.exports
             * commonjs-module: 使用 module.exports 导出 |commonjs: 作为 exports 的属性导出
             * ...略
             * */

            /******** 高级输出配置 ********/
            pathinfo: true, //在生成代码时，引入相关的模块、导出、请求等有帮助的路径信息

            chunkFilename: '[id].js',
            /**
             *  '[chunkhash].js' 长效缓存(/guides/caching)
             *  「附加分块(additional chunk)」的文件名模板
             */

            jsonpFuntion: 'myWebpackJsonp', // 用于加载分块的 JSONP 函数名

            sourceMapFilename: '[file].map',
            /**
             *  sourcemaps/[file].map
             * 「source map 位置」的文件名模板         *
             * */

            devtoolModuleFilenameTemplate: 'webpack', //「devtool 中模块」的文件名模板

            umdNamedDefine: true, // 在 UMD 库中使用命名的 AMD 模块

            crossOriginLoading: "use-credentials", // 枚举
            /**
             * 指定运行时如何发出跨域请求问题
             * crossOriginLoading: "anonymous",
             * crossOriginLoading: false
             * */

            /********  专家级输出配置（自行承担风险） ********/
            devtoolLineToLine: { // 为这些模块使用 1:1 映射 SourceMaps（快速）
                test: /\.jsx$/
            },

            hotUpdateMainFilename: "[hash].hot-update.json", //「HMR 清单」的文件名模板

            hotUpdateChunkFilename: "[id].[hash].hot-update.js", // HMR 分块」的文件名模板

            sourcePrefix: "\t" // 包内前置式模块资源具有更好可读性
        },

        module: {
            // 关于模块配置
            rules: [
                // 模块规则（配置 loader、解析器等选项）

                {
                    test: /\.jsx?$/,
                    include: [
                        path.resolve(__dirname, 'app')
                    ],
                    exclude: [
                        path.resolve(__dirname, 'app/demo.files')
                    ],
                    /**
                     * 这里是匹配条件，每个选项都接收一个正则表达式或字符串
                     * test 和 include 具有相同的作用，都是必须匹配选项
                     * exclude 是必不匹配选项（优先于 test 和 include）
                     *
                     *  最佳实践：
                     *  - 在 include 和 exclude 中使用绝对路径数组
                     *  - 尽量避免 exclude，更倾向于使用 include
                     * */

                    enforce: "pre", //pre | post 标识应用这些规则，即使规则覆盖（高级选项）

                    loader: "babel-loader",

                    options: {
                        presets: ['es2015'] //loader 的可选项
                    }

                },

                {
                    test: /\.html$/,
                    use: [
                        // 应用多个 loader 和选项
                        'htmllint-loader',
                        {
                            loader: 'html-loader',
                            options: {
                                /* ... */
                            }
                        }
                    ]
                }

            ]
        },

        resolve: {
            // 解析模块请求的选项
            // （不适用于对 loader 解析）

            modules: [ //用于查找模块的目录
                'node_modules',
                path.resolve(__dirname, 'app')
            ],

            extensions: [".js", ".json", ".jsx", ".css"], // 使用的扩展名

            alias: {
                //模块别名列表

                'vue$': 'vue/dist/vue.esm.js',
                '@': path.join(__dirname, '..', 'src')
            },
            //...
        },

        context: __dirname,
        // webpack 的主目录 entry 和 module.rules.loader 选项
        // 相对于此目录解析

        target: 'web', //包(bundle) 应该运行的环境 ...

        devServer: {
            proxy: {
                '/api': 'http://localhost:3000'
            },
            compress: true, //允许 gzip 压缩
            hot: true, //热加载
            https: false
            //...
        },

        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                compress: argv['optimize-minimize'] // 只有传入 -p 或 --optimize-minimize
            })
        ]

    };
}