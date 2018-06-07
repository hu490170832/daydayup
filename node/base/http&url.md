## http

1. 引入 http  模块
2. 创建服务器

```js
// 1.引入http模块
const http = require('http');

// 2.用http模块创建服务
/**
 * req 获取url信息
 * res 浏览器返回响应信息
 * */

http.createServer(function (req, res) {

    // 发送 HTTP 头部 => 状态值 200 ；文件类型html；编码utf-8
    res.writeHead(200,{"Content-Type":"text/html;charset:'utf-8'"});
    res.write('你好，node.js');
    res.write('我是第一个nodejs程序');

    res.end(); //结束响应
}).listen(3000);

console.log('Server listening on http://localhost:3000/');
```

## url

* url.parse\(\) **解析 URL**
* url.format\(urlObject\) //是上面 url.parse\(\) 操作的逆向操作
* url.resolve\(from, to\) 添加或者替换地址

```js
const http = require('http');
const url = require('url');

http.createServer(function (req, res) {

    //http://localhost:8001/news?aid=123
    // console.log(req.url);  //返回  /news?aid=123

    if (req.url != '/favicon.ico') {
        let result = url.parse(req.url, true);  //第一个参数是地址    第二个参数是true的话表示把get传值转换成对象

        console.log('aid=' + result.query.aid);  /*获取url的get传值*/
        console.log('cid=' + result.query.cid);
    }

    res.writeHead(200, {"Content-Type": "text/html;charset:'utf-8'"});
    res.write('你好，node.js');
    res.end();
}).listen(8001,'127.0.0.1');

console.log('Server listening on http://localhost:8001/');

```



