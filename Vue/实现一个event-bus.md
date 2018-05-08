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





