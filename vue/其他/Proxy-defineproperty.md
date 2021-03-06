### 实现双向绑定Proxy比defineproperty优劣如何?

### 前言

---

**双向绑定**其实已经是一个老掉牙的问题了,只要涉及到MVVM框架就不得不谈的知识点,但它毕竟是Vue的三要素之一.

**Vue三要素**

* 响应式: 例如如何监听数据变化,其中的实现方法就是我们提到的双向绑定
* 模板引擎: 如何解析模板
* 渲染: Vue如何将监听到的数据变化和解析后的HTML进行渲染

可以实现双向绑定的方法有很多,KnockoutJS基于观察者模式的双向绑定,Ember基于数据模型的双向绑定,Angular基于脏检查的双向绑定。这里简单描述下常见的基于**数据劫持**的双向绑定。

常见的基于数据劫持的双向绑定有两种实现,一个是目前Vue在用的`Object.defineProperty`,另一个是ES2015中新增的`Proxy`,而Vue的作者宣称将在Vue3.0版本后加入`Proxy`从而代替`Object.defineProperty`,通过本文你也可以知道为什么Vue未来会选择`Proxy`

> 严格来讲Proxy应该被称为『代理』而非『劫持』,不过由于作用有很多相似之处,我们在下文中就不再做区分,统一叫『劫持』。

我们可以通过下图清楚看到以上两种方法在**双向绑定**体系中的关系
![](/assets/MVVM体系)

> 基于数据劫持的当然还有已经凉透的`Object.observe`方法,已被废弃
>
> **提前声明:**我们没有对传入的参数进行及时判断而规避错误,仅仅对核心方法进行了实现.

### 文章目录

1. 基于数据劫持实现的双向绑定的特点
2. 基于Object.defineProperty双向绑定的特点
3. 基于Proxy双向绑定的特点

---

### 1.基于数据劫持实现的双向绑定的特点

#### 1.1 什么是数据劫持

数据劫持比较好理解,通常我们利用`Object.defineProperty`劫持对象的访问器,在属性值发生变化时我们可以获取变化,从而进行进一步操作。

```js
// 这是将要被劫持的对象
const data = {
  name: '',
};
function say(name) {
  if (name === '古天乐') {
    console.log('给大家推荐一款超好玩的游戏');
  } else if (name === '渣渣辉') {
    console.log('戏我演过很多,可游戏我只玩贪玩懒月');
  } else {
    console.log('来做我的兄弟');
  }
}
// 遍历对象,对其属性值进行劫持
Object.keys(data).forEach(function(key) {
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      console.log('get');
    },
    set: function(newVal) {
      // 当属性值发生变化时我们可以进行额外操作
      console.log(`大家好,我系${newVal}`);
      say(newVal);
    },
  });
});
data.name = '渣渣辉';
//大家好,我系渣渣辉
//戏我演过很多,可游戏我只玩贪玩懒月
```

#### 1.2 数据劫持的优势

目前业界分为两个大的流派,一个是以React为首的单向数据绑定,另一个是以Angular、Vue为主的双向数据绑定。

> 其实三大框架都是既可以双向绑定也可以单向绑定,比如React可以手动绑定onChange和value实现双向绑定,也可以调用一些双向绑定库,Vue也加入了props这种单向流的api,不过都并非主流卖点。

单向或者双向的优劣不在我们的讨论范围,我们需要讨论一下对比其他双向绑定的实现方法,数据劫持的优势所在。

1. 无需显示调用: 例如Vue运用数据劫持+发布订阅,直接可以通知变化并驱动视图,上面的例子也是比较简单的实现`data.name = '渣渣辉'`后直接触发变更,而比如Angular的脏检测则需要显示调用`markForCheck`\(可以用zone.js避免显示调用,不展开\),react需要显示调用`setState`。
2. 可精确得知变化数据：还是上面的小例子，我们劫持了属性的setter,当属性值改变,我们可以精确获知变化的内容`newVal`,因此在这部分不需要额外的diff操作,否则我们只知道数据发生了变化而不知道具体哪些数据变化了,这个时候需要大量diff来找出变化值,这是额外性能损耗。

#### 1.3 基于数据劫持双向绑定的实现思路

**数据劫持**是双向绑定各种方案中比较流行的一种,最著名的实现就是Vue。

基于数据劫持的双向绑定离不开`Proxy`与`Object.defineProperty`等方法对对象/对象属性的"劫持",我们要实现一个完整的双向绑定需要以下几个要点。

1. 利用`Proxy`或`Object.defineProperty`生成的Observer针对对象/对象的属性进行"劫持",在属性发生变化后通知订阅者
2. 解析器Compile解析模板中的`Directive`\(指令\)，收集指令所依赖的方法和数据,等待数据变化然后进行渲染
3. Watcher属于Observer和Compile桥梁,它将接收到的Observer产生的数据变化,并根据Compile提供的指令进行视图渲染,使得数据变化促使视图变化

![](/assets/MVVM结构图)

> 我们看到，虽然Vue运用了数据劫持，但是依然离不开**发布订阅**的模式就是因为我们不管在学习一些框架的原理还是一些流行库（例如Redux、Vuex）,基本上都离不开**发布订阅**模式,而_Event_模块则是此模式的经典实现,所以如果不熟悉**发布订阅**模式,建议先熟悉下

文章转自 [https://juejin.im/post/5acd0c8a6fb9a028da7cdfaf](https://juejin.im/post/5acd0c8a6fb9a028da7cdfaf)


