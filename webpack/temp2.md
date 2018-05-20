## webpack 的简介与安装

### 1）前端为什么需要WebPack？

现在的前端网页功能丰富，特别是SPA（single page web application 单页应用）技术流行后，JavaScript的复杂度增加和需要一大堆依赖包，还需要解决`SCSS，Less……`新增样式的扩展写法的编译工作。所以现代化的前端已经完全依赖于WebPack的辅助了。

现在最流行的三个前端框架，可以说和webpack已经紧密相连，框架官方都推出了和自身框架依赖的webpack构建工具。

* React.js+WebPack
* Vue.js+WebPack
* AngluarJS+WebPack

### 2）什么是WebPack？

> WebPack可以看做是**模块打包机**：它做的事情是，分析你的项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言（Sass，TypeScript等），并将其转换和打包为合适的格式供浏览器使用。在3.0出现后，Webpack还肩负起了优化项目的责任。

这段话有三个重点：

打包：可以把多个Javascript文件打包成一个文件，减少服务器压力和下载带宽。

* 转换：把拓展语言转换成为普通的JavaScript，让浏览器顺利运行。
* 优化：前端变的越来越复杂后，性能也会遇到问题，而WebPack也开始肩负起了优化和提升性能的责任。

我们可以从下图再次了解一下WebPack的作用:![](/assets/webpack.png)3）安装webpack

**3.1 全局安装**

```
npm install webpack -g
```

```
npm install webpack-cli -g
```

查看webpack版本

```
webpack -v
```

**3.2 对项目目录进行安装**  
全局安装完成后，我们还要进行一个项目目录的安装。在用npm安装前，我们先要进行一下初始化，初始化的主要目的是生成package.json文件

```
npm init
```

输入完成后，npm终端会问你关于项目的名称，描述……一堆内容，如果你不考虑发布到npm上，这些内容都不重要，而且我们后期还可以用文本的形式修改这些内容。现在我们只要一路回车就完成了初始化。这时用dir命令已经可以看到生成的package.json文件了。

```
npm install --save-dev webpack
```

**这里的参数–-save是要保存到package.json中，dev是在开发时使用这个包，而生产环境中不使用。**

**开发环境and生产环境：**

* **开发环境：在开发时需要的环境，这里指在开发时需要依赖的包。**
* **生产环境：程序开发完成，开始运行后的环境，这里指要使项目运行，所需要的依赖包。**



