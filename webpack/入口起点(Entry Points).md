# 入口起点\(Entry Points\)

## 单个入口（简写）语法

用法：`entry: string|Array<string>`

**webpack.config.js**

```js
const config = {
  entry: './path/to/my/entry/file.js'
};

module.exports = config;
```

`entry`属性的单个入口语法，是下面的简写：

```js
const config = {
  entry: {
    main: './path/to/my/entry/file.js'
  }
};
```

> **当你向`entry`传入一个数组时会发生什么？**向`entry`属性传入「文件路径\(file path\)数组」将创建**“多个主入口\(multi-main entry\)”**。在你想要多个依赖文件一起注入，并且将它们的依赖导向\(graph\)到一个“chunk”时，传入数组的方式就很有用。

当你正在寻找为「只有一个入口起点的应用程序或工具（即 library）」快速设置 webpack 配置的时候，这会是个很不错的选择。然而，使用此语法在扩展配置时有失灵活性。



