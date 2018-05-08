* ### 处理日期

```js
// 日期格式化
export const Dateformat = function (dateObj, fmt) {
    let o = {
        "M+": dateObj.getMonth() + 1,                 //月份
        "d+": dateObj.getDate(),                    //日
        "h+": dateObj.getHours(),                   //小时
        "m+": dateObj.getMinutes(),                 //分
        "s+": dateObj.getSeconds(),                 //秒
        "q+": Math.floor((dateObj.getMonth() + 3) / 3), //季度
        "S": dateObj.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (dateObj.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
};
// 日期差
export const getDateDiff = function (startDate, endDate) { // 返回日期差
    let startTime = new Date(Date.parse(startDate.replace(/-/g, "/"))).getTime();
    let endTime = new Date(Date.parse(endDate.replace(/-/g, "/"))).getTime();
    let dates = (endTime - startTime) / (1000 * 60 * 60 * 24);
    return dates;
};
```

使用：

```js
import {Dateformat, getDateDiff} from './util'
console.log(Dateformat(new Date(), 'yyyy-MM-dd'));     // "2018-05-08" 
console.log(getDateDiff('2018-05-04', '2018-05-08'));  //4
```

* ### 本地存储 localStorage

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



