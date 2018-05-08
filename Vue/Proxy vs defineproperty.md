### 实现双向绑定Proxy比defineproperty优劣如何?

---

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

我们可以通过下图清楚看到以上两种方法在**双向绑定**体系中的关系![](/assets/MVVM体系)

> 基于数据劫持的当然还有已经凉透的`Object.observe`方法,已被废弃。
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



