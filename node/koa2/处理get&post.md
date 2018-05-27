## koa2 入坑（1）之处理get/post请求

**先来个小demo**

```js
const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000);
```

### 处理get请求

query和querystring区别

在koa2中GET请求通过request接收，但是接受的方法有两种：query和querystring。

* query：返回的是格式化好的参数对象。
* querystring：返回的是请求字符串。

```js
const Koa = require('koa');
const app = new Koa();

app.use(async(ctx)=>{
    // ctx.body = 'hello';
    let url = ctx.url;
    let request = ctx.request;
    let req_query = request.query;
    let req_queryString = request.querystring;

    ctx.body = {
        url,
        req_query,
        req_queryString
    }
});

app.listen(3000,()=>{
    console.log('http://127.0.0.1:3000');
});
```

![](https://upload-images.jianshu.io/upload_images/8677726-cd484ad7a4aa7a79.png?imageMogr2/auto-orient/strip|imageView2/2/w/520)

### **直接从ctx中获取Get请求**

```js
const Koa = require('koa');
const app = new Koa();

app.use(async(ctx)=>{
    // 从request 中接收get请求
    let url = ctx.url;
    let request = ctx.request;
    let req_query = request.query;
    let req_queryString = request.querystring;

    // 从上下文中ctx 直接获取get请求
    let ctx_query = ctx.query;
    let ctx_querystring = ctx.querystring;

    ctx.body = {
        url,
        req_query,
        req_queryString,
        ctx_query,
        ctx_querystring,
    }
});

app.listen(3000,()=>{
    console.log('http://127.0.0.1:3000');
});
```

![](https://upload-images.jianshu.io/upload_images/8677726-738df13c612ba750.png?imageMogr2/auto-orient/strip|imageView2/2/w/532)

### 处理POST请求

**获取Post请求的步骤：**

* 解析上下文ctx中的原生nodex.js对象req。
* 将POST表单数据解析成query string-字符串.\(例如:user=gershon&age=18\)
* 将字符串转换成JSON格式。

```js
const Koa = require('koa');
const app = new Koa();

app.use(async (ctx) => {
    if (ctx.url === '/' && ctx.method === 'GET') {
        //显示表单页面
        let html = `
            <h2>koa2 request POST</h2>
            <form method="post" action="/">
            <p>userName</p> 
            <input name="userName">  <br>
            <p>age</p>
            <input name="age">
            <p>website</p>    
            <input name="website">    
            <button type="submit">submit</button> 
            </form>
        `;
        ctx.body = html;

    } else if (ctx.url === '/' && ctx.method === 'POST') {
        let postData = await parsePostData(ctx);
        ctx.body = postData;

    } else {
        ctx.body = '<h1>404<h1>'
    }

    function parsePostData() {
        return new Promise((resolve, reject) => {
            try {
                let postData = '';
                ctx.req.addListener('data', (data) => { // 有数据传入的时候
                    postData += data;
                });
                ctx.req.on('end', () => {
                    let parseData = parseQueryStr(postData);
                    resolve(parseData);
                });
            } catch (e) {
                reject(e);
            }
        })
    }

    // 处理 string => json
    function parseQueryStr(queryStr) {
        let queryData = {};
        let queryStrList = queryStr.split('&');
        console.log('queryStrList',queryStrList);
        console.log('queryStrList.entries()',queryStrList.entries());
        for(let [index,queryStr] of queryStrList.entries()){
            let itemList = queryStr.split('=');
            console.log('itemList',itemList);
            queryData[itemList[0]] = decodeURIComponent(itemList[1]);
        }
        return queryData;
    }
});
app.listen(3000, () => {
    console.log('http://127.0.0.1:3000');
});
```

![](https://upload-images.jianshu.io/upload_images/8677726-1be97590aa376dc1.png?imageMogr2/auto-orient/strip|imageView2/2/w/697)

