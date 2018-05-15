# 入门

---

## 1. 概述 {#概述}

Promise 对象是 JavaScript 的异步操作解决方案，为异步操作提供统一接口。它起到代理作用（proxy），充当异步操作与回调函数之间的中介，使得异步操作具备同步操作的接口。Promise 可以让异步操作写起来，就像在写同步操作的流程，而不必一层层地嵌套回调函数。

首先，Promise 是一个对象，也是一个构造函数。

```js
function f1(resolve, reject) {
  // 异步代码...
}

var p1 = new Promise(f1);
```

上面代码中，`Promise`构造函数接受一个回调函数`f1`作为参数，`f1`里面是异步操作的代码。然后，返回的`p1`就是一个 Promise 实例。

Promise 的设计思想是，所有异步任务都返回一个 Promise 实例。Promise 实例有一个`then`方法，用来指定下一步的回调函数。

```js
var p1 = new Promise(f1);
p1.then(f2);
```

上面代码中，`f1`的异步操作执行完成，就会执行`f2 `传统的写法可能需要把`f2`作为回调函数传入`f1`，比如写成`f1(f2)`，异步操作完成后，在`f1`内部调用`f2`。Promise 使得`f1`和`f2`变成了链式写法。不仅改善了可读性，而且对于多层嵌套的回调函数尤其方便。

## 2. Promise.prototype.then\(\) {#promise-对象的状态}

```js
var p1 = new Promise(function (resolve, reject) {
  resolve('成功');
});
p1.then(console.log, console.error);
// "成功"

var p2 = new Promise(function (resolve, reject) {
  reject(new Error('失败'));
});
p2.then(console.log, console.error);
// Error: 失败
```

## 3. Promise 的实例 {#promise-的实例}

#### 1）加载图片

我们可以把图片的加载写成一个`Promise`对象。

```js
var preloadImage = function (path) {
  return new Promise(function (resolve, reject) {
    var image = new Image();
    image.onload  = resolve;
    image.onerror = reject;
    image.src = path;
  });
};
```

## 4. **all的用法**

Promise的all方法提供了并行执行异步操作的能力，并且在所有异步操作执行完后才执行回调。我们仍旧使用上面定义好的runAsync1、runAsync2、runAsync3这三个函数，看下面的例子：

```js
Promise
.all([runAsync1(), runAsync2(), runAsync3()])
.then(function(results){
    console.log(results);
});
```

用Promise.all来执行，all接收一个数组参数，里面的值最终都算返回Promise对象。这样，三个异步操作的并行执行的，等到它们都执行完后才会进到then里面。那么，三个异步操作返回的数据哪里去了呢？都在then里面呢，all会把所有异步操作的结果放进一个数组中传给then，就是上面的results。

# 进阶

---

## 1. promise语法

Promise编程的核心思想是**如果数据就绪\(promised\)，那么\(then\)做点什么。**

下文是一个promise实例。

```js
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```

Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。

resolve函数的作用是，将Promise对象的状态从“未完成”变为“成功”（即从 pending 变为resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；

reject函数的作用是，将Promise对象的状态从“未完成”变为“失败”（即从 pending 变为rejected）， 在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

Promise实例生成以后，可以用then方法分别指定resolved状态和rejected状态的回调函数。

```js
promise.then(function(value) {
  // success
}, function(error) {
  // failure
});
```

#### then方法可以接受两个回调函数作为参数。

第一个回调函数是Promise对象的状态变为resolved时调用，第二个回调函数是Promise对象的状态变为rejected时调用。其中，第二个函数是可选的，不一定要提供。这两个函数都接受Promise对象传出的值作为参数。

下面是一个使用then的例子。**then方法返回的是一个新的Promise实例。**因此可以采用链式写法，即then方法后面再调用另一个then方法。

```js
getJSON("/posts.json").then(function(json) {
  return json.post;
}).then(function(post) {
  // ...
});
```

上面的代码使用then方法，依次指定了两个回调函数。第一个回调函数完成以后，会将返回结果作为参数，传入第二个回调函数。

Promise.prototype.catch方法用于指定发生错误时的回调函数。

```js
getJSON('/posts.json').then(function(posts) {
  // ...
}).catch(function(error) {
  // 处理 getJSON 和 前一个回调函数运行时发生的错误
  console.log('发生错误！', error);
});
```

上面代码中，getJSON方法返回一个 Promise 对象；如果异步操作抛出错误，状态就会变为rejected，就会调用catch方法指定的回调函数，处理这个错误。另外，**then方法**指定的回调函数，如果运行中抛出错误，也会被catch方法捕获。

一般总是建议，Promise 对象后面要跟catch方法，这样可以处理 Promise 内部发生的错误。catch方法返回的还是一个 Promise 对象，因此后面还可以接着调用then方法。

#### 注意：

1. 如果调用resolve函数和reject函数时带有参数，那么它们的参数会被传递给回调函数。resolve函数的参数除了正常的值以外，还可能是另一个 Promise 实例。

```js
const p1 = new Promise(function (resolve, reject) {
  // ...
});

const p2 = new Promise(function (resolve, reject) {
  // ...
  resolve(p1);
})
```

上面代码中，p1和p2都是 Promise 的实例，但是p2的resolve方法将p1作为参数，即一个异步操作的结果是返回另一个异步操作。

**这时p1的状态就会传递给p2，也就是说，p1的状态决定了p2的状态。如果p1的状态是pending，那么p2的回调函数就会等待p1的状态改变；如果p1的状态已经是resolved或者rejected，那么p2的回调函数将会立刻执行。**

1. 调用resolve或reject并不会终结 Promise 的参数函数的执行。
2. then方法是定义在原型对象Promise.prototype上的。
3. 如果没有使用catch方法指定错误处理的回调函数，Promise 对象抛出的错误不会传递到外层代码，即不会有任何反应。
4. Promise 在resolve语句后面，再抛出错误，不会被捕获，等于没有抛出。因为 Promise的状态一旦改变，就永久保持该状态，不会再变了。

## 2. Promise.resolve\(\)

有时需要将现有对象转为 Promise 对象，Promise.resolve方法就起到这个作用。

Promise.resolve等价于下面的写法。

```js
Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))
```

Promise.resolve方法的参数分成四种情况。

#### 1）参数是一个 Promise 实例

如果参数是 Promise 实例，那么Promise.resolve将不做任何修改、原封不动地返回这个实例。

#### 2）参数是一个thenable对象

thenable对象指的是具有then方法的对象，比如下面这个对象。

```js
let thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};
```

Promise.resolve方法会将这个对象转为 Promise 对象，然后就立即执行thenable对象的then方法。

```js
let thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};

let p1 = Promise.resolve(thenable);
p1.then(function(value) {
  console.log(value);  // 42
});
```

上面代码中，**thenable对象的then方法执行后，对象p1的状态就变为resolved，从而立即执行最后那个then方法指定的回调函数**，输出 42。

#### 3）参数不是具有then方法的对象，或根本就不是对象。

如果参数是一个原始值，或者是一个不具有then方法的对象，则Promise.resolve方法返回一个**新的 Promise 对象**，状态为resolved。

```js
const p = Promise.resolve('Hello');

p.then(function (s){
  console.log(s)
});
// Hello
```

上面代码生成一个新的 Promise 对象的实例p。由于字符串Hello不属于异步操作（判断方法是字符串对象不具有 then 方法），返回 Promise 实例的状态从一生成就是resolved，所以回调函数会立即执行。Promise.resolve方法的参数，会同时传给回调函数。

#### 4）不带有任何参数

Promise.resolve方法允许调用时不带参数，直接返回一个resolved状态的 Promise 对象。

所以，如果希望得到一个 Promise 对象，比较方便的方法就是直接调用Promise.resolve方法。

```js
const p = Promise.resolve();

p.then(function () {
  // ...
});
```

上面代码的变量p就是一个 Promise 对象。需要注意的是，

立即resolve的 Promise 对象，是在本轮“事件循环”（event loop）的结束时，而不是在下一轮“事件循环”的开始时。

```js
setTimeout(function () {
  console.log('three');
}, 0);

Promise.resolve().then(function () {
  console.log('two');
});

console.log('one');

// one
// two
// three
```

上面代码中，setTimeout\(fn, 0\)在下一轮“事件循环”开始时执行，Promise. resolve\(\)在本轮“事件循环”结束时执行，console.log\('one'\)则是立即执行，因此最先输出。

## 3.新手错误

#### 1）用了 promises 后怎么用 forEach?

```js
// 我想删除所有的docs
db.allDocs({include_docs: true}).then(function (result) {
  result.rows.forEach(function (row) {
    db.remove(row.doc);  
  });
}).then(function () {
  // 我天真的以为所有的docs都被删除了！
});
```

问题在于第一个函数实际上返回的是 undefined，这意味着第二个方法不会等待所有 documents 都执行 db.remove\(\)。实际上他不会等待任何事情，并且可能会在任意数量的文档被删除后执行！

**简而言之，forEach\(\)/for/while 并非你寻找的解决方案。你需要的是 Promise.all\(\):**

```js
db.allDocs({include_docs: true}).then(function (result) {
  return Promise.all(result.rows.map(function (row) {
    return db.remove(row.doc);
  }));
}).then(function (arrayOfResults) {
  // All docs have really been removed() now!
});
```

上面的代码是什么意思呢？大体来说，Promise.all\(\)会以一个 promises 数组为输入，并且返回一个新的 promise。这个新的 promise 会在数组中所有的 promises 都成功返回后才返回。他是异步版的 for 循环。

并且 Promise.all\(\) 会将执行结果组成的数组返回到下一个函数，比如当你希望从 PouchDB 中获取多个对象时，会非常有用。此外一个更加有用的特效是，一旦数组中的 promise 任意一个返回错误，Promise.all\(\) 也会返回错误。

#### 2）忘记使用catch

单纯的坚信自己的 promises 会永远不出现异常，很多开发者会忘记在他们的代码中添加一个 .catch\(\)。然而不幸的是这也意味着，任何被抛出的异常都会被吃掉，并且你无法在 console 中观察到他们。这类问题 debug 起来会非常痛苦。

#### 3\) 使用副作用调用而非返回

下面的代码有什么问题？

```js
somePromise().then(function () {
  someOtherPromise();
}).then(function () {
  // 我希望someOtherPromise() 状态变成resolved!
  // 但是并没有
});
```

每一个 promise 都会提供给你一个 then\(\) 函数 \(或是 catch\(\)，实际上只是 then\(null, ...\) 的语法糖\)。当我们在 then\(\) 函数内部时：

```js
somePromise().then(function () {
  // I'm inside a then() function!
});
```

我们可以做什么呢？有三种事情：

* return 另一个 promise
* return 一个同步的值 \(或者 undefined\)
* throw 一个同步异常

就是这样。一旦你理解了这个技巧，你就理解了 promises。因此让我们逐个了解下。

#### 返回另一个 promise

```js
getUserByName('nolan').then(function (user) {
  return getUserAccountById(user.id);
}).then(function (userAccount) {
  // I got a user account!
});
```



