# path

## path.resolve

将多个路径解析为一个规范化的**绝对路径**。其处理方式类似于对这些路径逐一进行**cd操作**，与cd操作不同的是，这引起路径可以是文件，并且可不必实际存在

`path.resolve('foo/bar', '/tmp/file/', '..', 'a/../subfile')`相当于

```bash
cd foo/bar
cd /tmp/file/
cd ..
cd a/../subfile
pwd
```

demo

```js
path.resolve('/foo/bar', './baz')
// 输出结果为
'/foo/bar/baz'
path.resolve('/foo/bar', '/tmp/file/')
// 输出结果为
'/tmp/file'

path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif')
// 当前的工作路径是 /home/itbilu/node，则输出结果为
'/home/itbilu/node/wwwroot/static_files/gif/image.gif'
```

```js
const path = require('path')
let myPath = path.join(__dirname,'/img/so');
let myPath2 = path.join(__dirname,'./img/so');
let myPath3 = path.resolve(__dirname,'/img/so');
let myPath4 = path.resolve(__dirname,'./img/so');

console.log(__dirname);  // C:\Users\PC-0092\Desktop\node-path ==> 当前文件所在目录
console.log(myPath);     // C:\Users\PC-0092\Desktop\node-path\img\so
console.log(myPath2);    // C:\Users\PC-0092\Desktop\node-path\img\so
console.log(myPath3);    // C:\img\so
console.log(myPath4);    // C:\Users\PC-0092\Desktop\node-path\img\so
```

## path.join

path.join\(\)方法可以连接任意多个路径字符串。要连接的多个路径可做为参数传入

```js
var path = require('path');
//合法的字符串连接
path.join('/foo', 'bar', 'baz/asdf', 'quux', '..')
// 连接后
'/foo/bar/baz/asdf'
```



