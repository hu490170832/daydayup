##### less全局变量配置

* 安装 `less` 和 `less-loader`
  ```
  npm install less less-loader --save
  ```

* 配置less: 路径：build---webpack.base.conf.js-rules:添加
  ```
  {
    test: /\.less$/,
    loader: 'style-loader!css-loader!less-loader'
  }
  ```
引入全局less 文件：`src/assets/style`  下新建 `global.less`
3. main.js 下引入
  ```
  require('!style-loader!css-loader!less-loader!./assets/style/global.less');
  ```

* 安装  `style-loader`
  ```
  npm install style-loader --save
  ```
    这时候可以使用全局的less文件了 接下来是配置less全局变量

##### less全局变量配置

* 安装

  ```
  npm install sass-resources-loader --save-dev
  ```

2. src\/assets\/style 下新建 `theme.less`
3. 在 .\/build\/utils.js 的 `exports.cssLoaders` 中添加 `lessResourceLoader`
  ```
  function lessResourceLoader() {
   var loaders = [
     cssLoader,
     'less-loader',
     {
       loader: 'sass-resources-loader',
       options: {
         resources: [
           path.resolve(__dirname, '../src/assets/style/theme.less'),
         ]
       }
     }
   ];
   if (options.extract) {
     return ExtractTextPlugin.extract({
       use: loaders,
       fallback: 'vue-style-loader'
     })
   } else {
     return ['vue-style-loader'].concat(loaders)
   }
  }
  ```

  找到  `return` 下`less:generateLoaders('less')`  替换为`less:lessResourceLoader()`


**vue2.0+vueRouter+vuex+less+axios 完整项目配置地址** [https:\/\/github.com\/gershonv\/vue-project.git](https://github.com/gershonv/vue-project.git)

