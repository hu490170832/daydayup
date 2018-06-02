# module.exports与exports？？关于exports的总结

每一个node.js执行文件，都自动创建一个module对象，同时，module对象会创建一个叫exports的属性，初始化的值是 {}

```js
module.exports = {};
```

Node.js为了方便地导出功能函数，node.js会自动地实现以下这个语句

`foo.js`

```js
 exports.a = function(){
 console.log('a')
 }

 exports.a = 1
```

`test.js`

```js
var x = require('./foo');
console.log(x.a) // 1
```

exports是引用 module.exports的值。module.exports 被改变的时候，exports不会被改变，而模块导出的时候**，真正导出的执行是module.exports，而不是exports**

再看看下面例子 `foo.js`

```js
 exports.a = function(){
  console.log('a')
 }

 module.exports = {a: 2}
 exports.a = 1 
```

`test.js`

```js
var x = require('./foo');
console.log(x.a) // 2
```

exports在module.exports 被改变后，失效。

