* #### 概述

> Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”

* **声明Proxy**

```js
var proxy = new Proxy(target, handler); 
// new Proxy({},{})
```

> `new Proxy()`表示生成一个`Proxy`实例
>
> `target`参数表示所要拦截的目标对象
>
> `handler`参数也是一个对象，用来定制拦截行为

看下实例 ：

```js
var obj = new Proxy({}, {
  get: function (target, key, receiver) {
    console.log(`getting ${key}!`);
    return Reflect.get(target, key, receiver);
  },
  set: function (target, key, value, receiver) {
    console.log(`setting ${key}!`);
    return Reflect.set(target, key, value, receiver);
  }
});

obj.count = 1;  //  setting count!
++obj.count; 
// getting count!
//  setting count!
//  2
```

实例2：

```js
var pro = new Proxy({
    add: function (val) {
        return val + 10;
    },
    name: 'I am gershon'
    },
    {
        get:function(target,key,receiver){
            console.log('come in Get');
            return target[key];
    }
});

console.log(pro.name);
```

可以在控制台看到结果，先输出了come in Get。相当于在方法调用前的钩子函数

![image.png](https://upload-images.jianshu.io/upload_images/8677726-703e592eead13a04.png?imageMogr2/auto-orient/strip|imageView2/2/w/1240)

**get属性** 是在你得到某对象属性值时预处理的方法，他接受三个参数

* key：目标的key值，相当于对象的属性
* target：得到的目标值
* receiver

**set属性 **set属性是值你要改变Proxy属性值时，进行的预先处理。它接收四个参数

* target:目标值。
* key：目标的Key值。
* value：要改变的值。
* receiver：改变前的原始值。

为了加深理解 再举个例子

```js
var proxy = new Proxy({name: 'gershon'},{
        get:function(target,key){
            console.log('come in Get');
            return target[key];
        },
        set:function(target,key,value,receiver){
            console.log(`setting ${key} = ${value}`);
            return target[key] = value;
        }

    });

console.log(proxy.name);
proxy.name='帅哥';
console.log(proxy.name);
```

执行结果：

![image.png](https://upload-images.jianshu.io/upload_images/8677726-42ec1c3f6e2a1770.png?imageMogr2/auto-orient/strip|imageView2/2/w/1240)

PS 预处理时要`return target[key]`

**apply **

apply的作用是调用内部的方法，它使用在方法体是一个匿名函数时。看下边的代码

```js
var target = function () {
    return 'I am gershon';
};
var handler = {
    apply(target, ctx, args) {
        console.log('do apply');
        return Reflect.apply(...arguments);
    }
}
 
var proxy= new Proxy(target, handler);
 
console.log(proxy());
//执行结果 
//do apply
// I am gershon
```



