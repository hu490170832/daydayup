# 目录

* [探讨JS合并数组的方法](#探讨JS合并数组的方法)
* [Array 和 String 之间的转化](#array-和-string-之间的转化)
* [判断数组是否一样](#判断数组是否一样)

### 探讨JS合并数组的方法

```js
var a = [1,2,3];
var b = [4,5,6];
```

#### 1）concat

```js
var c = a.concat(b);
```

concat方法连接a、b两个数组后，a、b两个数组的数据不变，同时会返回一个新的数组。这样当我们需要进行多次的数组合并时，会造成很大的内存浪费，所以这个方法肯定不是最好的。

#### 2）for循环

```js
for (var key in b){
    a.push(key);
}
```

这样的写法可以解决第一种方案中对内存的浪费，但是会有另一个问题：丑！这么说不是没有道理，如果能只用一行代码就搞定，岂不快哉~

#### 3）apply

函数的apply方法有一个特性，那就是func.apply\(obj,argv\)，argv是一个数组。所以我们可以利用这点，直接上代码：

```js
a.push.apply(a,b)
```

调用a.push这个函数实例的apply方法，同时把，b当作参数传入，这样a.push这个方法就会遍历b数组的所有元素，达到合并的效果。

**另外，还要注意两个小问题：**

以上3种合并方法并没有考虑过a、b两个数组谁的长度更小。所以好的做法是预先判断a、b两个数组哪个更大，然后使用大数组合并小数组，这样就减少了数组元素操作的次数！

### Array 和 String 之间的转化

> array ==》 string

```js
var arr = [1,2,3];

arr.toString(); // '1,2,3'

arr.join();     //'1,2,3'
arr.join('');   //'123'
arr.join('-');  //'1-2-3'
```

> string ==》 array

```js
var str = 'abc';

str.split();     //["abc"]
str.split('');   //["a", "b", "c"]
str.split('b')   //["a", "c"]
```

### 判断数组是否一样

```js
var arr1 = [1];
var arr2 = [2];
JSON.stringify(arr1) == JSON.stringify(arr2)    // false
```

上面的方法有个缺点就是 类型会被转换为字符串 比如 `SON.stringify(['1']) == JSON.stringify([1])` 为 true

