##### 配置路由拦截器

默认安装 `vue-router` src/common/index.js 修改为

```js
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    //路由懒加载
    {path: '/', component: resolve => require(['@/components/HelloWorld'], resolve)},
    {path: '/test', component: resolve => require(['@/components/test'], resolve)},
  ]
});

// 动态路由
router.addRoutes([
  {path: '/test2', component: resolve => require(['@/components/test2'], resolve)},
]);

//路由拦截器
router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireAuth)) { //判断是否需要登录权限
    if (localStorage.getItem('username')) {// 判断是否登录
      next();
    }else { //没登录 则跳转页面
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  }else{
    next();
  }
});


export default router;
```

##### 配置路由2 分模块

项目结构如下

---

![文件模块示意.png](https://upload-images.jianshu.io/upload_images/8677726-1bf85aef27db7f0a.png?imageMogr2/auto-orient/strip|imageView2/2/w/1240)

**1 src/common/router.js**

```js
import VueRouter from 'vue-router'
import routerInterceptor from '../common/interceptor/routerInterceptor'
import moduleRouter1 from '../modules/module1/module1_router'
// import moduleRouter2 from '../modules/module1/module2_router'

export default function () {
  // 路由配置
  let router = new VueRouter({
    routes:[]
  });

  //路由拦截
  routerInterceptor(router);

  //加载各模块的路由
  moduleRouter1(router);
  return router;
}
```

解析：

* routes 中可以配置路由信息 如下
  ![配置.png](https://upload-images.jianshu.io/upload_images/8677726-660522ee6968450a.png?imageMogr2/auto-orient/strip|imageView2/2/w/1240)
* export 函数导入到项目入口文件 main.js 中
* import 进来的函数主要是各个模块的动态路由文件 比如上例导入了 modules/module1/module1.js

**2 src/common/interceptor/routerInterceptor.js**  
路由拦截器的js文件

```js
export default function (router) {
  //路由拦截器
  router.beforeEach((to, from, next) => {
    if (to.matched.some(res => res.meta.requireAuth)) { //判断是否需要登录权限
      if (localStorage.getItem('username')) {// 判断是否登录
        next();
      }else { //没登录 则跳转页面
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      }
    }else{
      next();
    }
  });
}
```

**3 src/modules/modeule1/module1\_router.js**  
模块下的路由文件 导出到 common/router.js

```js
export default function (router) {
  router.addRoutes([
    {path:'/mm1',component: resolve => require(['./vue/mm1.vue'], resolve)},
    {path:'/mm2',component: resolve => require(['./vue/mm2.vue'], resolve)}
  ])
}
```

**4  修改main.js 文件**

![入口文件.png](https://upload-images.jianshu.io/upload_images/8677726-20841f23b4f9d79a.png?imageMogr2/auto-orient/strip|imageView2/2/w/1240)

梳理一下结构吧  
![结构.png](https://upload-images.jianshu.io/upload_images/8677726-b46d0d91b6632bab.png?imageMogr2/auto-orient/strip|imageView2/2/w/1240)

### 路由输入 mm1 或者 mm2 就可以看到你路由文件啦~~~~

**vue2.0+vueRouter+vuex+less+axios 完整项目配置地址** [https://github.com/gershonv/vue-project.git](https://github.com/gershonv/vue-project.git)

