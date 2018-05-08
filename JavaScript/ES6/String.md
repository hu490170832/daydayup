* **.includes\( \)**

之前我们使用`indexOf()`函数的返回值是否`>-1`来判断字符串是否包含某些字符串，现在我们更简单地使用`.includes()`

来返回一个布尔值来判断：

```js
const string = 'food';
const substring = 'foo';
console.log(string.includes(substring));
```



