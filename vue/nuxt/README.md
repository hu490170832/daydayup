# 目录

* [安装 nuxt.js](#开始)
* [Nuxt 常用配置项](#Nuxt常用配置项)
* [Nuxt 的路由配置和参数传递](#Nuxt的路由配置和参数传递)
* [Nuxt 的动态路由和参数校验](#Nuxt的动态路由和参数校验)
* [Nuxt 的路由动画效果](#Nuxt的路由动画效果)
* [Nuxt 的默认模版和默认布局](#Nuxt的默认模版和默认布局)
* [Nuxt 的错误页面和个性meta设置](#Nuxt的错误页面和个性meta设置)
* [asyncData 方法获取数据](#asyncData方法获取数据)

## Nuxt.js是什么？

[Nuxt.js](https://zh.nuxtjs.org/guide) 简单的说是Vue.js的通用框架，最常用的就是用来作 [SSR（服务器端渲染）](#ssr)。

通过对客户端/服务端基础架构的抽象组织，Nuxt.js 主要关注的是应用的**UI渲染**。

再直白点说，就是Vue.js原来是开发SPA（单页应用）的，但是随着技术的普及，很多人想用Vue开发多页应用，并在服务端完成渲染。这时候就出现了Nuxt.js这个框架，她简化了SSR的开发难度。还**可以直接用命令把我们制作的vue项目生成为静态html**。

## Nuxt.js是特点：

基于 Vue.js

* 自动代码分层
* 服务端渲染
* 强大的路由功能，支持异步数据
* 静态文件服务
* ES6/ES7 语法支持
* 打包和压缩 JS 和 CSS
* HTML头部标签管理
* 本地开发支持热加载
* 集成ESLint
* 支持各种样式预处理器： SASS、LESS、 Stylus等等

## SSR

> 简单来说就是：**在服务器端把 vue 文件渲染成 html 返回给浏览器**

SSR两个优点：

* SEO 不同于SPA的HTML只有一个无实际内容的HTML和一个app.js，SSR生成的HTML是有内容的，这**让搜索引擎能够索引到页面内容**。【常用于 新闻 博客类网站....】
* 更快内容到达时间 传统的SPA应用是将bundle.js从服务器获取，然后在客户端解析并挂载到dom。而SSR直接将HTML字符串传递给浏览器。大大加快了首屏加载时间。

## 开始

使用init命令来初始化Nuxt.js项目

```
vue init nuxt/starter
```

使用npm install安装依赖包

```
npm install --registry=https://registry.npm.taobao.org
```

打开项目

```
npm run dev
```

## 目录结构

```js
|-- .nuxt                            // Nuxt自动生成，临时的用于编辑的文件，build
|-- assets                           // 用于组织未编译的静态资源入LESS、SASS 或 JavaScript
|-- components                       // 用于自己编写的Vue组件，比如滚动组件，日历组件，分页组件
|-- layouts                          // 布局目录，用于组织应用的布局组件，不可更改。
|-- middleware                       // 用于存放中间件
|-- pages                            // 用于存放写的页面，我们主要的工作区域
|-- plugins                          // 用于存放JavaScript插件的地方
|-- static                           // 用于存放静态资源文件，比如图片
|-- store                            // 用于组织应用的Vuex 状态管理。
|-- .editorconfig                    // 开发工具格式配置
|-- .eslintrc.js                     // ESLint的配置文件，用于检查代码格式
|-- .gitignore                       // 配置git不上传的文件
|-- nuxt.config.json                 // 用于组织Nuxt.js应用的个性化配置，已覆盖默认配置
|-- package-lock.json                // npm自动生成，用于帮助package的统一性设置的，yarn也有相同的操作
|-- package.json                     // npm包管理配置文件
```

## Nuxt常用配置项

**配置IP和端口：**

在 `package.json` 里对 `config` 项进行配置 \(\)

```
 "config":{
    "nuxt":{
      "host":"127.0.0.1",
      "port":"1818"
    }
  },
```

**配置全局 css**

`assert` 下新建 `css/global.css`

在`nuxt.config.js`里进行操作 `module.exports` 中添加一个属性。

```
 css:['~assets/css/global.css'],
```

**配置webpack的loader**

在 `nuxt.config.js` 里的 `build` 属性中配置。比如现在我们要配置一个url-loader来进行小图片的64位打包

```js
build: {

    loaders:[
      {
        test:/\.(png|jpe?g|gif|svg)$/,
        loader:"url-loader",
        query:{
          limit:10000,
          name:'img/[name].[hash].[ext]'
        }
      }
    ],

    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
```

## Nuxt的路由配置和参数传递

**简单路由 demo**

根目录的pages文件下新建两个文件夹，about和news

在about文件夹下新建index.vue文件，并写入下面的代码：

```html
<template>
  <div>
      <h2>About Index page</h2>
      <ul>
        <li><a href="/">Home</a></li>
      </ul>
  </div>
</template>
```

在news文件夹下新建index.vue文件，并写入下面的代码：

```html
<template>
  <div>
      <h2>News Index page</h2>
       <ul>
        <li><a href="/">Home</a></li>
      </ul>
  </div>
</template>
```

修改原来的pages文件夹下的index.vue

```html
<template>
  <div>
    <ul>
      <li><a href="/">HOME</a></li>
      <li><a href="/about">ABOUT</a></li>
      <li><a href="/news">NEWS</a></li>
    </ul>
  </div>
</template>
```

**&lt;nuxt-link&gt; 路由跳转**

**`nuxt-link  类似 router-link`** 我们先把首页的 a 标签替换为 nuxt-link

```html
<template>
  <div>
    <ul>
      <li><nuxt-link :to="{name:'index'}">HOME</nuxt-link></li>
      <li><nuxt-link :to="{name:'about'}">ABOUT</nuxt-link></li>
      <li><nuxt-link :to="{name:'news',params:{newsId:3306}}">NEWS</nuxt-link></li>
    </ul>
  </div>
</template>
```

在news文件夹下的 index.vue 里用 `$route.params.newsId` 进行接收

```html
<template>
  <div>
      <h2>News Index page</h2>
      <p>NewsID:{{$route.params.newsId}}</p>
       <ul>
        <li><a href="/">Home</a></li>
      </ul>
  </div>
</template>
```

## Nuxt的动态路由和参数校验

**动态路由**

我在news文件夹下面新建了\_id.vue的文件，以下画线为前缀的Vue文件就是动态路由，然后在文件里边有 $route.params.id来接收参数。`/pages/news/_id.vue`

```html
<template>
  <div>
      <h2>News-Content [{{$route.params.id}}]</h2>
      <ul>
        <li><a href="/">Home</a></li>
      </ul>
  </div>
</template>
```

修改新闻首页路由  我们在 `/pages/news/index.vue` 进行修改，增加两个详细页的路由News-1和News-2。

```html
<template>
  <div>
      <h2>News Index page</h2>
      <p>NewsID:{{$route.params.newsId}}</p>
       <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/news/123">News-1</a></li>
        <li><a href="/news/456">News-2</a></li>
      </ul>
  </div>
</template>
```

代码写好后，打开npm run dev 进行查看，我们已经进入了新闻详细页，并在详细页中取得了传递过来的新闻ID

**参数校验**

进入一个页面，对参数传递的正确性校验是必须的，Nuxt.js也贴心的为我们准备了校验方法 **validate\( \)。**

**`/pages/news/_id.vue`**

```js
export default { 
  validate ({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id)
  } 
}
```

我们使用了validate方法，并把params传递进去，然后用正则进行了校验，如果正则返回了true正常进入页面，如果返回false进入404页面。

## Nuxt的路由动画效果

**全局动画配置**

在我们之前建立好的 `/assert/css/gobal.css`下写入

```css
.page-enter-active, .page-leave-active {
    transition: opacity 1s;
}
.page-enter, .page-leave-active {
    opacity: 0;
}
```

这时候在页面切换的时候就会有2秒钟的动画切换效果了，但是你会发现一些页面是没有效果的，这是因为你没有是 `<nuxt-link>` 组件来制作跳转链接。你需要进行更改。

**单独设置页面动效**

想给一个页面单独设置特殊的效果时，我们只要在css里改变默认的page，然后在页面组件的配置中加入transition字段即可。例如，我们想给about页面加入一个字体放大然后缩小的效果，其他页面没有这个效果。

在全局样式 `assets/css/global.css` 中添加以下内容。

```css
.test-enter-active, .test-leave-active {
    transition: all 2s;
    font-size:12px;
    
}
.test-enter, .test-leave-active {
    opacity: 0;
    font-size:40px;
}
```

然后在about/index.vue组件中设置

```js
export default {
  transition:'test'
}
```

## Nuxt的默认模版和默认布局

在开发应用时，经常会用到一些公用的元素，比如网页的标题是一样的，每个页面都是一模一样的标题。这时候我们有两种方法，

* 第一种方法是作一个公用的组件出来：只能定制 &lt;template&gt; 里的内容
* 第二种方法是修改默认模版：可以订制很多头部信息，包括IE版本的判断

**默认模板**

Nuxt为我们提供了超简单的默认模版订制方法，只要在根目录下创建一个app.html就可以实现了。在我们希望每个页面的最上边都加入“hello world” 这几个字，我们就可以使用默认模版来完成。

```html
<!DOCTYPE html>
<html lang="en">
<head>
   {{ HEAD }}
</head>
<body>
    <p>hello world</p>
    {{ APP }}
</body>
</html>
```

这里的{{ HEAD }}读取的是 **nuxt.config.js **里的信息，{{APP}} 就是我们写的pages文件夹下的主体页面了。需要注意的是HEAD和APP都需要大写，如果小写会报错的。【需要重启服务器才能生效】

**默认布局**

和默认模板类似的功能还有默认布局，但是从名字上你就可以看出来，默认布局主要针对于页面的统一布局使用。它在位置根目录下的**layouts/default.vue**。需要注意的是在默认布局里不要加入头部信息，只是关于&lt;template&gt;标签下的内容统一订制。

```html
<template>
  <div>
    <p>hello world</p>
    <nuxt/>
  </div>
</template>
```

这里的&lt;nuxt/&gt;就相当于我们每个页面的内容，你也可以把一些通用样式放入这个默认布局里，但是个人不建议这样写，会增加页面的复杂程度

## Nuxt的错误页面和个性meta设置

当用户输入路由错误的时候，我们需要给他一个明确的指引，所以说在应用程序开发中404页面是必不可少的。Nuxt.js支持直接在默认布局文件夹里建立错误页面。

**建立错误页面**

在根目录下的layouts文件夹下建立一个`error.vue` 文件，它相当于一个显示应用错误的组件

```html
<template>
  <div>
      <h2 v-if="error.statusCode==404">404页面不存在</h2>
      <h2 v-else>500服务器错误</h2>
      <ul>
          <li><nuxt-link to="/">HOME</nuxt-link></li>
      </ul>
  </div>
</template>

<script>
export default {
  props:['error'],
}
</script>
```
代码用v-if进行判断错误类型，需要注意的是这个错误是你需要在<script>里进行声明的，如果不声明程序是找不到error.statusCode的。

**个性meta设置**
页面的Meta对于SEO的设置非常重要，比如你现在要作个新闻页面，那为了搜索引擎对新闻的收录，需要每个页面对新闻都有不同的title和meta设置。直接使用head方法来设置当前页面的头部信息就可以了。我们现在要把New-1这个页面设置成个性的meta和title。
1. 我们先把 `pages/news/index.vue` 页面的链接进行修改一下，传入一个 `title` ，目的是为了在新闻具体页面进行接收title，形成文章的标题
`/pages/news/index.vue`

```html
<li><nuxt-link :to="{name:'news-id',params:{id:123,title:'jspang.com'}}">News-1</nuxt-link></li>
```
2. 第一步完成后，我们修改 `/pages/news/_id.vue`，让它根据传递值变成独特的meta和title标签。


```html
<template>
  <div>
      <h2>News-Content [{{$route.params.id}}]</h2>
      <ul>
        <li><a href="/">Home</a></li>
      </ul>
  </div>
</template>
<script>
export default {

  validate ({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id)
  },
  data(){
    return{
      title:this.$route.params.title,
    }
  },
//独立设置head信息
  head(){
      return{
        title:this.title,
        meta:[
          {hid:'description',name:'news',content:'This is news page'}
        ]
      }
    }
}
  
</script>

```
## asyncData方法获取数据
在项目中需要在初始化页面前先得到数据，也就是我们常说的异步请求数据。Nuxt.js贴心的为我们扩展了Vue.js的方法，增加了anyncData。从名字上就很好理解，这是一个一部的方法。
**创建远程数据**
[myjson.com](http://myjson.com/) 它是一个json的简单仓库，学习使用是非常适合的。我们打开网站，在对话空中输入JSON代码


```json
{
  "name": "gershon",
  "age": 18,
  "interest": "I love coding!"
}
```
输入后，网站会给你一个地址，这就是你这个JSON仓库的地址了 [https://api.myjson.com/bins/11me0y](https://api.myjson.com/bins/11me0y)

**安装axios**
```
npm install axios --save
```
我们在pages下面新建一个文件，叫做 `ansyData.vue`

```html
<template>
  <div>
      <h1>姓名：{{info.name}}</h1>
      <h2>年龄：{{info.age}}</h2>
      <h2>兴趣：{{info.interest}}</h2>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data(){
     return {
         name:'hello World',
     }
  },
  asyncData(){
      return axios.get('https://api.myjson.com/bins/11me0y')
      .then((res)=>{
          console.log(res)
          return {info:res.data}
      })      
  }
}
</script>

```
**ansycData的await方法**
当然上面的方法稍显过时，现在都在用ansyc…await来解决异步,改写上面的代码。

```html
<template>
  <div>
      <h1>姓名：{{info.name}}</h1>
      <h2>年龄：{{info.age}}</h2>
      <h2>兴趣：{{info.interest}}</h2>     
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data(){
     return {
         name:'hello World',
     }
  },
  async asyncData(){
      let {data}=await axios.get('https://api.myjson.com/bins/8gdmr')
      return {info: data}      
  }
}
</script>
```