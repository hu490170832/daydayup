1. **简单配置**

```
npm install vuex --save
```

建立以下文件

![vuex.png](https://upload-images.jianshu.io/upload_images/8677726-a06e4c6bda31b710.png?imageMogr2/auto-orient/strip|imageView2/2/w/1240)

* 开始配置

`types.js`

```js
export const ADD_COUNT = 'ADD_COUNT'
```

`actions.js`

```js
import * as types from './types'

export const testAction = ({commit},option={}) =>{

 return new Promise((resolve, reject)=>{

 commit(types.ADD_COUNT,option)

 })

};
```

`module.js`

```js
import * as types from './types'

export const state = {

 count: 1

};

export const mutations = {

 [types.ADD_COUNT](state,params){

 state.count += params;

 }

};

export const getters = {

 getCount: state => state.count

};
```

`store.js`

```js
import Vue from 'vue'

import Vuex from 'vuex'

import * as actions from './actions'

import {state,mutations,getters} from "./module"

Vue.use(Vuex);

export default new Vuex.Store({

 state,

 actions,

 mutations,

 getters

})
```

在main.js中引入

```js
import Vuex from 'vuex'

import store from './vuex/store'

Vue.use(Vuex);
```

```js
new Vue({

 el: '#app',

 router,

 store,

 components: { App },

 template: '<App/>'

})
```

页面中使用

![ use.png](https://upload-images.jianshu.io/upload_images/8677726-ed5993966f3bb152.png?imageMogr2/auto-orient/strip|imageView2/2/w/1240)

##### 分模块配置

* 以下是介绍+配置

###### 使用插件 [plugins](https://vuex.vuejs.org/zh-cn/plugins.html)

Vuex 的 store 接受 `plugins` 选项，这个选项暴露出每次 mutation 的钩子。Vuex 插件就是一个函数，它接收 store 作为唯一参数：

```js
const myPlugin = store => {

 // 当 store 初始化后调用

 store.subscribe((mutation, state) => {

 // 每次 mutation 之后调用

 // mutation 的格式为 { type, payload }

 })

}
```

然后这么使用：

```js
const store = new Vuex.Store({
 // ...

 plugins: [myPlugin]

})
```

我们想把router和vuex联系起来，使用的是 [vuex-router-sync](https://www.npmjs.com/package/vuex-router-sync) 官网介绍如下：

> Sync vue-router's current $route as part of vuex store's state

意思就是 把 vue-router 的状态放进 vuex 的 state 中，这样就可以通过改state 來进行路由的一些操作，当然直接使用像是 $route.go 之类的也會影响到 state ，会同步的是以下属性

```js
{

 path: '',

 query: null,

 params: null

}
```

###### 介绍完毕开始配置

* 目录结构

![目录.png](https://upload-images.jianshu.io/upload_images/8677726-f9cf76e0eebd6a54.png?imageMogr2/auto-orient/strip|imageView2/2/w/1240)

`store.js`

```js
import Vuex from 'vuex'

import { sync } from 'vuex-router-sync'

import plugins from './plugins/storePlugin'

import mk1 from '../modules/module1/vuex/mk1_store'

export default function (router){

 const store = new Vuex.Store({

 plugins

 });

 //加载各个模块的状态

 mk1(store);

 // 路由状态加载到状态管理

 sync(store, router);

 return store;

}
```

`storePlugin.js`

```js
let globalStore;

const setStore = store =>{

 globalStore = store;

};

export const getStore = () => globalStore;

export default [setStore];
```

###### vuex的配置和之前的差不多 不过也有点区别

`mk1_actions`

```js
import * as types from './mk1_types'

export const testAction = ({commit},option={}) =>{

 return new Promise((resolve, reject)=>{

 commit(types.ADD_COUNT,option)

 })

};
```

`mk1_module.js`

```js
import * as types from './mk1_types'

import * as actions from './mk1_actions'

const state = {

 count: 1

};

const mutations = {

 [types.ADD_COUNT](state,params){

 state.count += params;

 }

};

const getters = {

 getCount: state => state.count

};

export default {

 state,

 actions,

 getters,

 mutations

}
```

`mk1_store.js`

```js
import mk1 from './mk1_module'

export default function(store){

 store.registerModule('mk1',mk1); // 参数1 是注册的state的对象名可以自定义; 参数2 为引入的模块

}
```

`mk1_types.js`

```js
export const ADD_COUNT = 'ADD_COUNT'
```

###### 修改入口文件 main.js

```js
import Vue from 'vue'

import App from './App'

import VueRouter from 'vue-router'

import Vuex from 'vuex'

import initRouter from './common/router'

import initStore from './common/store'

require('!style-loader!css-loader!less-loader!./assets/style/global.less'); // 引入全局样式

Vue.use(VueRouter);

Vue.use(Vuex);

const router = initRouter(); //初始化路由，开始加载各模块的路由

const store = initStore(router); //初始化状态，加载各个模块的状态

Vue.config.productionTip = false

/* eslint-disable no-new */

new Vue({

 el: '#app',

 router,

 store,

 components: { App },

 template: '<App/>'

})
```

大功告成~~~~

![success.png](https://upload-images.jianshu.io/upload_images/8677726-d387cf6ca6ea31a8.png?imageMogr2/auto-orient/strip|imageView2/2/w/1240)

**vue2.0+vueRouter+vuex+less+axios 完整项目配置地址** [https://github.com/gershonv/vue-project.git](https://github.com/gershonv/vue-project.git)
