##### 安装

```
npm install axios --save
```

##### 安装样式库 element

```
npm install element-ui --save
```

##### 建立文件夹以及文件

![文件.png](https://upload-images.jianshu.io/upload_images/8677726-9ba6dbd5ffb57ac0.png?imageMogr2/auto-orient/strip|imageView2/2/w/1240)
**http.js**

```js
import axios from 'axios'
import qs from 'qs'
import { Message,Loading } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 请求拦截
axios.interceptors.request.use(config => {

  return config;
},error => {
  return Promise.reject(error);
});

// 响应拦截
axios.interceptors.response.use(response => {
  return response;
},error => {
  return Promise.reject(error.response);
});


function errorState(response) {

  // 状态码正确直接返回数据
  if(response && (response.status == 200 || response.status == 304 || response.status == 400)){
    return response;
  }else {
    Message.error('网络异常');
  }
}

function successState(res) {
  // 统一判断后端返回的错误码
  if(res.data.recode == '0001'){
    Message.error('网络异常')
  }else if(res.data.recode != '0002' && res.data.recode != '0003'){
    // Message.error('网络异常22')
  }
}

const httpServer= (opts, data) =>{
  let Public = {// 公用参数 --默认会加到请求中
    // 'srAppid':""
  };

  let httpDefaultOpts = { //http默认配置
    method: opts.method,
    baseURL:'',  //默认的头地址
    url:opts.url,
    timeout: 10000,
    params: Object.assign(Public,data),
    data: qs.stringify(Object.assign(Public, data)),
    headers: opts.method == 'get' ? {
      'X-Requested-With': 'XMLHttpRequest',
      "Accept": "application/json",
      "Content-Type": "application/json; charset=UTF-8"
    }:{
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  };

  if(opts.method=='get'){
    delete httpDefaultOpts.data
  }else{
    delete httpDefaultOpts.params
  }

  let promise = new Promise(function(resolve, reject) {
    axios(httpDefaultOpts).then(
      (res) => {
        successState(res)
        resolve(res)
      }
    ).catch(
      (response) => {
        errorState(response)
        reject(response)
      }
    )

  });

  return promise;
};

export default httpServer;
```

test.js \(测试用的api接口文件\)

```js
const serviceModule = {
  getTestApi:{
    url: '/test/test1',
    method: 'get'
  },
  getTestApi2:{
    url: '/test/test',
    method: 'post'
  }
};

const ApiSetting = {...serviceModule};

export default ApiSetting
```

##### 配置下跨域代理

找到 config/index.js  `proxyTable`下添加以下代码

```js
'/': {
        target: 'http://127.0.0.1:3000', //设置调用接口域名和端口号别忘了加http
        changeOrigin: true,
        pathRewrite: {
          '^/': '/'
        }
      }
```

##### 配置下后端 根目录下建立server文件夹

```
cd server
npm init
npm install express --save
```

server下建立app.js文件

```js
var express = require('express');
var app = express();

app.get('/test/test1', function (req, res) {
  res.send('you get');
});

app.post('/test/test', function (req, res) {
  res.send('you post');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
```

尽情测试

1 引入接口文件

```js
import http from '../api/http'
import ApiSetting from '../api/test'
```

2 使用

```js
http(ApiSetting.getTestApi,{'abc':'def'}).then(res=>{
  console.log(res);
},err =>{
  console.log(err);
});

http(ApiSetting.getTestApi2,{'abc':'def'}).then(res=>{
  console.log(res);
},err =>{
  console.log(err);
})
```

**vue2.0+vueRouter+vuex+less+axios 完整项目配置地址** [https://github.com/gershonv/vue-project.git](https://github.com/gershonv/vue-project.git######安装)
