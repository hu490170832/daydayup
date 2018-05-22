## babel-plugin-import

### 优雅的引入Vant

vant是支持babel-plugin-import引入的，它可以让我们按需引入组件模块，并且不用管理我们的样式，现在Vue项目组件库的主流引入方法。

安装：

```js
npm i babel-plugin-import -D
```

也可以

```
npm install babel-plugin-import --save-dev
```

在.babelrc中配置plugins（插件）

```js
"plugins": [
    "transform-vue-jsx", 
    "transform-runtime",
    ["import",{"libraryName":"vant","style":true}]
  ]
```

### 按需使用Vant组件

我们设置好.babelrc后，就可以按需引入Vant框架了。比如现在我们引入一个`Button`组件.  
在src/main.js里加入下面的代码：

```js
import { Button } from 'vant'
Vue.use(Button)
```

有了这段代码之后，我们就可以在需要的组件页面中加入`Button`了.

```html
<van-button type="primary">主要按钮</van-button>
```



