## skills
**hash 排序**

找到数组中的重复项 以及重复次数

```js
let arr = [1,2,1,1,3,2];
let hashMap = new Map();

arr.filter((item)=>{
    hashMap.set(item , hashMap.get(item) ?  hashMap.get(item) + 1 : 1)
})

console.log(hashMap); // Map { 1 => 3, 2 => 2, 3 => 1 }
console.log([...hashMap]); // [ [ 1, 3 ], [ 2, 2 ], [ 3, 1 ] ]
```

**生成小于3的随机数**

```js
Math.floor(3*Math.random())
```






---

## Utils

**计算日期差**

```js
function getDateDiff(startDate, endDate) { // 返回日期差
    let startTime = new Date(Date.parse(startDate.replace(/-/g, "/"))).getTime();
    let endTime = new Date(Date.parse(endDate.replace(/-/g, "/"))).getTime();
    let dates = (endTime - startTime) / (1000 * 60 * 60 * 24);
    return dates;
}
```

**本地存储 localStorage**

```js
export default {
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  get(key) {
    return JSON.parse(localStorage.getItem(key))
  },
  remove(key) {
    localStorage.removeItem(key);
  },
  removeAll() {
    localStorage.clear();
  }
};

import localStorageUtil from './test'

//export default ==> import localStorageUtil from './util' 其中'localStorageUtil' 自己命名
//export const localStorageUtil = {...} ==> import { localStorageUtil } from './util'
```



