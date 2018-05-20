# 模式\(Mode\)

[编辑此页](https://github.com/webpack-china/webpack.js.org/edit/cn/src/content/concepts/mode.md)

提供`mode`配置选项，告知 webpack 使用相应模式的内置优化。

`string`

## 用法

只在配置中提供`mode`选项：

```js
module.exports = {
  mode: 'production'
};
```

或者从[CLI](https://www.webpackjs.com/api/cli/)参数中传递：

```js
webpack --mode=production
```

支持以下字符串值：

| **选项** | **描述** |
| :--- | :--- |
| `development` | 会将 `process.env.NODE_ENV` 的值设为 `development`。启用 `NamedChunksPlugin` 和 `NamedModulesPlugin。` |
| `production` | 会将 `process.env.NODE_ENV` 的值设为 `production`。启用 `FlagDependencyUsagePlugin`, `FlagIncludedChunksPlugin`, `ModuleConcatenationPlugin`, `NoEmitOnErrorsPlugin`, `OccurrenceOrderPlugin`, `SideEffectsFlagPlugin` 和 `UglifyJsPlugin`. |

> 记住，只设置`NODE_ENV`，则不会自动设置`mode`。

### mode: development

```js
// webpack.development.config.js
module.exports = {
+ mode: 'development'
- plugins: [
-   new webpack.NamedModulesPlugin(),
-   new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") }),
- ]
}
```

### mode: production

```js
// webpack.production.config.js
module.exports = {
+  mode: 'production',
-  plugins: [
-    new UglifyJsPlugin(/* ... */),
-    new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") }),
-    new webpack.optimize.ModuleConcatenationPlugin(),
-    new webpack.NoEmitOnErrorsPlugin()
-  ]
}
```



