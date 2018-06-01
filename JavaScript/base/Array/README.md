`arr.reduce(callback,[initialValue])`

callback （执行数组中每个值的函数，包含四个参数）

* * previousValue （上一次调用回调返回的值，或者是提供的初始值（initialValue））
  * currentValue （数组中当前被处理的元素）
  * index （当前元素在数组中的索引）
  * array （调用 reduce 的数组）
* initialValue （作为第一次调用 callback 的第一个参数。）

```js
let arr = [1,2,3,4,5]
arr.reduce((pre,cur,curIndex)=>{
    console.log('pre: ',pre,'cur: ',cur, 'curIndex: ', curIndex);
})
// pre:  1 cur:  2 curIndex:  1
// pre:  undefined cur:  3 curIndex:  2
// pre:  undefined cur:  4 curIndex:  3
// pre:  undefined cur:  5 curIndex:  4


arr.reduce((pre,cur,curIndex)=>{
    console.log('pre: ',pre,'cur: ',cur, 'curIndex: ', curIndex);
},10)
// pre:  1 cur:  2 curIndex:  1
// pre:  undefined cur:  3 curIndex:  2
// pre:  undefined cur:  4 curIndex:  3
// pre:  undefined cur:  5 curIndex:  4

arr.reduce((pre, cur) => pre + cur) // 累加值 ： 15
```



