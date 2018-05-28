# 配置 loader

webpack 的 loader 用于处理不同的文件类型，在日常的项目中使用 loader 时，可能会遇到比较复杂的情况，本小节我们来深入探讨 loader 的一些配置细节。

## loader 匹配规则

当我们需要配置 loader 时，都是在`module.rules`中添加新的配置项，在该字段中，每一项被视为一条匹配使用 loader 的规则。

先来看一个基础的例子：

```js
module.exports = {
  // ...
  module: {
    rules: [ 
      {
        test: /\.jsx?/, // 条件
        include: [ 
          path.resolve(__dirname, 'src'),
        ], // 条件
        use: 'babel-loader', // 规则应用结果
      }, // 一个 object 即一条规则
      // ...
    ],
  },
}...
```

loader 的匹配规则中有两个最关键的因素：一个是匹配条件，一个是匹配规则后的应用。

 匹配条件通常都使用请求资源文件的绝对路径来进行匹配，在官方文档中称为 `resource`，除此之外还有比较少用到的 `issuer`，则是声明依赖请求的源文件的绝对路径。举个例子：在 `/path/to/app.js` 中声明引入` import './src/style.scss'`，`resource` 是 `/path/to/src/style.scss`，`issuer` 是 `/path/to/app.js`，规则条件会对这两个值来尝试匹配。

上述代码中的`test`和`include`都用于匹配`resource`路径，是`resource.test`和`resource.include`的简写，你也可以这么配置：

```js
module.exports = {
  // ...
  rules: [ 
      {
        resource: { // resource 的匹配条件
          test: /\.jsx?/, 
          include: [ 
            path.resolve(__dirname, 'src'),
          ],
        },
        // 如果要使用 issuer 匹配，便是 issuer: { test: ... }
        use: 'babel-loader',
      },
      // ...
    ], 
}...
```



