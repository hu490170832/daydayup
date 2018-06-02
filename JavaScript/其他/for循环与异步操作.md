### 今天遇到异步循环的问题

如下 for 循环嵌套异步请求，如逐步发送请求（每次请求的数据都会发生改变）

开始研究一下

demo1 错误

```js
for (var i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000 * (i + 1));
}
```

执行结果是 每隔一秒输出一个 5

**原因** 每次时间结束\(timeout\)都指向原始的`i`，而并非它的拷贝。所以，for循环使`i`增长到5，之后`timeout`运行并调用了当前`i`

的值（也就是5）。

解决方法 将 var 声明改为 let

```js
for (let i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000 * (i + 1));
}
```

执行结果是 每隔一秒输出 0 1 2 3 4

```js
let temp = 1;
for (let i = 0; i < 3; i++) {
  temp++;
  setTimeout(() => {
    console.log(temp);
  }, 1000 * (i + 1));

  axios.get('/async?count=' + temp).then((res) => {
    console.log(res.data.count);
  });
}
```

执行结果 依次输出  2 3 4  之后每隔一秒输出 4

### 2）for循环异步后才执行下一步的方法

```js
(function iterator(i) {
          if (i > 3) {
            //这里就是异步执行后才执行的代码
            console.log('end');
            return;
          }
          axios.get('/async?count=' + i).then((res) => {
            console.log(res.data.count);
            iterator(i + 1);
          });
        })(1);
```

依次输出 1 2 3 end

**async await 用法demo**

```js
function getDataSync() {

  return axios.get('/async?count=' + 1).then((res) => {
    console.log(res.data.count);
    return res.data.count;
  });

}
const getData = async () => {
  await getDataSync();
  console.log('end~~~~~~');
};

getData();
```

依次输出 1 end~~~~~

**Promise**

```js
new Promise((resolve, reject) => {
  axios.get('/async?count=' + 1).then((res) => {
    resolve(res.data.count);
  });
}).then((data)=>{
  console.log(data);
  console.log('end');
}); // 1 end
```

**Promise.all**

```js
Promise.all(
  [1,2,3].map((i)=>{
    return axios.get('/async?count=' + i).then((res) => res.data.count );
  })
).then((value)=>{
  console.log(value);
  console.log('end');
})
//  ["1", "2", "3"]
//  end
```



