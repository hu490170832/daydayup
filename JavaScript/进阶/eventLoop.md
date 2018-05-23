### 什么是 Event Loop？

Event Loop 是一个很重要的概念，指的是计算机系统的一种运行机制，同时这也是JS引擎的执行机制。

Event Loop 是用来解决单线程的缺陷（**假如JS中不存在异步,只能自上而下执行,如果上一行解析时间很长,那么下面的代码就会被阻塞**）

![](http://www.ruanyifeng.com/blogimg/asset/201310/2013102001.png)

想要理解Event Loop，就要从程序的运行模式讲起。运行以后的程序叫做["进程"](http://zh.wikipedia.org/wiki/进程)（process），一般情况下，一个进程一次只能执行一个任务。

例1 观察js中执行顺序

```js
console.log(1)

setTimeout(function(){
    console.log(2)
},0)

console.log(3)
```

运行结果是: 1 3 2

也就是说,setTimeout里的函数并没有立即执行,而是延迟了一段时间,满足一定条件后,才去执行的,这类代码,我们叫异步代码。

所以,这里我们首先知道了JS里的一种分类方式,就是将任务分为: 同步任务和异步任务

按这种分类，**JS的执行机制是**

1. 首先判断JS是同步还是异步,同步就进入主进程,异步就进入event table
2. 异步任务在event table中注册函数,当满足触发条件后,被推入event queue
3. 同步任务进入主线程后一直执行,直到主线程空闲时,才会去event queue中查看是否有可执行的异步任务,如果有就推入主进程中

以上三步循环执行,这就是event loop

```js
console.log(1) 是同步任务,放入主线程里
setTimeout() 是异步任务,被放入event table, 0秒之后被推入event queue里
console.log(3 是同步任务,放到主线程里

当 1、 3在控制条被打印后,主线程去event queue(事件队列)里查看是否有可执行的函数,执行setTimeout里的函数
```

继续看例2

```js
 setTimeout(function(){
     console.log('定时器开始啦')
 });

 new Promise(function(resolve){
     console.log('马上执行for循环啦');
     for(var i = 0; i < 10000; i++){
         i == 99 && resolve();
     }
 }).then(function(){
     console.log('执行then函数啦')
 });

 console.log('代码执行结束');
```

尝试按照,上文我们刚学到的**JS执行机制**去分析

```js
setTimeout 是异步任务,被放到event table

new Promise 是同步任务,被放到主进程里,直接执行打印 console.log('马上执行for循环啦')

.then里的函数是 异步任务,被放到event table

 console.log('代码执行结束')是同步代码,被放到主进程里,直接执行
```

所以,结果是 【马上执行for循环啦 --- 代码执行结束 --- 定时器开始啦 --- 执行then函数啦】吗?

亲自执行后,结果居然不是这样,而是【马上执行for循环啦 --- 代码执行结束 --- 执行then函数啦 --- 定时器开始啦】

那么,难道是异步任务的执行顺序,不是前后顺序,而是另有规定? 事实上,按照异步和同步的划分方式,并不准确。

而准确的划分方式是:

* macro-task\(宏任务\)：包括整体代码script，setTimeout，setInterval
* micro-task\(微任务\)：Promise，process.nextTick

![](/assets/eventloop.png)

尝试按照刚学的执行机制,去分析例2:

```js
首先执行script下的宏任务,遇到setTimeout,将其放到宏任务的【队列】里

遇到 new Promise直接执行,打印"马上执行for循环啦"

遇到then方法,是微任务,将其放到微任务的【队列里】

打印 "代码执行结束"

本轮宏任务执行完毕,查看本轮的微任务,发现有一个then方法里的函数, 打印"执行then函数啦"

到此,本轮的event loop 全部完成。


下一轮的循环里,先执行一个宏任务,发现宏任务的【队列】里有一个 setTimeout里的函数,执行打印"定时器开始啦"
```

---

**简单说，就是在程序中设置两个线程：一个负责程序本身的运行，称为"主线程"；另一个负责主线程与其他进程（主要是各种I/O操作）的通信，被称为"Event Loop线程"（可以译为"消息线程"）。**

