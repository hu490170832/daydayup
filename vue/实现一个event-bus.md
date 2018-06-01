### React/Vue不同组件之间是怎么通信的?

**Vue**

1. 父子组件用Props通信
2. 非父子组件用Event Bus通信
3. 如果项目够复杂,可能需要Vuex等全局状态管理库通信

**React**

1. 父子组件,父-&gt;子直接用Props,子-&gt;父用callback回调
2. 非父子组件,用发布订阅模式的Event模块
3. 项目复杂的话用Redux、Mobx等全局状态管理管库
4. 用新的[Context Api](https://link.juejin.im/?target=https%3A%2F%2Fjuejin.im%2Fpost%2F5a7b41605188257a6310fbec)

我们大体上都会有以上回答,接下来很可能会问到如何实现`Event(Bus)`,因为这个东西太重要了,几乎所有的模块通信都是基于类似的模式,包括安卓开发中的`Event Bus`,Node.js中的`Event`模块\(Node中几乎所有的模块都依赖于Event,包括不限于`http、stream、buffer、fs`等\).

我们仿照Node中[Event API](https://link.juejin.im/?target=http%3A%2F%2Fnodejs.cn%2Fapi%2Fevents.html)实现一个简单的Event库,他是**发布订阅模式**的典型应用.

> **提前声明: **我们没有对传入的参数进行及时判断而规避错误,仅仅对核心方法进行了实现.

**1.1初始化class**

我们利用ES6的`class`关键字对`Event`进行初始化,包括`Event`的事件清单和监听者上限。

我们选择了`Map`作为储存事件的结构,因为作为键值对的储存方式`Map`比一般对象更加适合,我们操作起来也更加简洁,可以先看一下Map的[基本用法与特点](https://link.juejin.im/?target=http%3A%2F%2Fes6.ruanyifeng.com%2F%23docs%2Fset-map%23Map)。

```js
class EventEmeitter {
  constructor() {
    this._events = this._events || new Map(); // 储存事件/回调键值对
    this._maxListeners = this._maxListeners || 10; // 设立监听上限
  }
}
```

**1.2 监听与触发**

触发监听函数我们可以用`apply`与`call`两种方法,在少数参数时`call`的性能更好,多个参数时`apply`性能更好,当年Node的Event模块就在三个参数以下用`call`否则用`apply`

当然当Node全面拥抱ES6+之后,相应的`call/apply`操作用`Reflect`新关键字重写了,但是我们不想写的那么复杂,就做了一个简化版.

```js
// 触发名为type的事件
EventEmeitter.prototype.emit = function(type, ...args) {
  let handler;
  // 从储存事件键值对的this._events中获取对应事件回调函数
  handler = this._events.get(type);
  if (args.length > 0) {
    handler.apply(this, args);
  } else {
    handler.call(this);
  }
  return true;
};

// 监听名为type的事件
EventEmeitter.prototype.addListener = function(type, fn) {
  // 将type事件以及对应的fn函数放入this._events中储存
  if (!this._events.get(type)) {
    this._events.set(type, fn);
  }
};
```

我们实现了触发事件的`emit`方法和监听事件的`addListener`方法,至此我们就可以进行简单的实践了.

```js
// 实例化
const emitter = new EventEmeitter();

// 监听一个名为arson的事件对应一个回调函数
emitter.addListener('arson', man => {
  console.log(`expel ${man}`);
});

// 我们触发arson事件,发现回调成功执行
emitter.emit('arson', 'low-end'); // expel low-end
```

似乎不错,我们实现了基本的触发/监听,但是如果有多个监听者呢?

```js
// 重复监听同一个事件名
emitter.addListener('arson', man => {
  console.log(`expel ${man}`);
});
emitter.addListener('arson', man => {
  console.log(`save ${man}`);
});

emitter.emit('arson', 'low-end'); // expel low-end
```

是的,只会触发第一个,因此我们需要进行改造.

---

---

文章转自 https://juejin.im/post/5ac2fb886fb9a028b86e328c
