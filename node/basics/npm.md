## 如何使用 npm 管理 NodeJS 包

---

* 检查 npm 安装的位置以及版本 （打开gitbash）

```
$ which npm 
/d/Program Files/nodejs/npm

$ node -v
v8.10.0

$ npm -v 
v 5.6.0
```

> npm init 生成 package.json 文件

输入你的包的详细信息，例如名称、版本、作者、GitHub 页面等等，或者按下回车键接受默认值并键入`yes`确认。

也可以使用 **npm init --y** 这样会直接生成 package.json 文件，不需要在命令行交互~~

### **package.json**

```js
{
  "name": "npmtest",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "commander": "^2.15.1"
  }
}
```

版本号前面的插入符号 \(`^`\) 表示在安装时，npm 将取出它可以找到的最高版本的包。

你也可能会注意到另一个名为`package-lock.json`的文件，该文件确保在项目安装的所有系统上都保持相同的依赖关系。

### 更新本地包

```js
$ npm update
```

然后，运行以下命令确保所有包都更新了。

```
$ npm outdated
```

如果没有需要更新的，那么它返回空。

要找出哪一个全局包需要更新，运行：

```
$ npm outdated -g --depth=0
```

![](/assets/微信截图_20180514232615.png)

更新单个全局包，运行：

```
npm update -g <package-name>
```

更新所有的全局包，运行：

```
npm update -g
```

### 列出 NodeJS 模块 {#toc_6}

```
$ npm list
demo@1.0.0 /home/sk/demo
└── commander@2.13.0
```

要仅仅列出顶级模块，使用`-depth=0`选项：

    $ npm list -g --depth=0

    +-- cnpm@5.3.0
    +-- gitbook@3.2.3
    +-- gitbook-cli@2.3.2
    +-- koa-generator@1.1.16
    `-- vue-cli@2.9.3

#### 寻找 NodeJS 模块 {#toc_7}

```
$ npm search request
```

该命令将显示包含搜索字符串`request`的所有模块。

### 移除 NodeJS 模块 移除 NodeJS 模块 移除 NodeJS 模块 ~~~

要删除本地包，转到项目目录并运行以下命令，这会从`node_modules`目录中删除包：

```
$ npm uninstall <package-name>
```

要从`package.json`文件中的依赖关系中删除它，使用如下所示的`save`选项：

```
$ npm uninstall --save <package-name>
```

要删除已安装的全局包，运行：

```
$ npm uninstall -g <package>
```

### 清除 npm 缓存 清除 npm 缓存 清除 npm 缓存~~~ {#toc_9}

默认情况下，npm 在安装包时，会将其副本保存在`$HOME`目录中名为`.npm`的缓存文件夹中。所以，你可以在下次安装时不必再次下载。

查看缓存模块：

```
$ ls ~/.npm
```

随着时间的推移，缓存文件夹会充斥着大量旧的包。所以不时清理缓存会好一些。

从 npm@5 开始，npm 缓存可以从 corruption 问题中自行修复，并且保证从缓存中提取的数据有效。如果你想确保一切都一致，运行：

```
$ npm cache verify
```

清除整个缓存，运行：

```
$ npm cache clean --force
```

### 查看 npm 配置 {#toc_10}

要查看 npm 配置，键入：

```
$ npm config ls
```

要显示当前的全局位置：

```
$ npm config get prefix

C:\Users\Administrator\AppData\Roaming\npm
```



