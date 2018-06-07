# fs -文件模块

* [**fs.stat 检测是文件还是目**](#fsstat)
* [**fs.mkdir 创建目录**](#fsmkdir)
* [**fs.writeFile 创建写入文件**](#fswritefile)
* [**fs.appendFile 追加文件**](#fsappendfile)
* [**fs.readFile 读取文件**](#fsreadfile)
* [**fs.readdir 读取目录**](#fsreaddir)
* [**fs.rename 重命名**](#fsrename)
* [**fs.rmdir 删除目录**](#fsrmdir)
* [**fs.unlink 删除文件**](#fsunlink)
  * [rename 剪切文件](#剪切文件)

## fs.stat

> stats.isFile\(\) 是否为文件 \| stats.isDirectory 是否为目录

```js
const fs = require('fs');
fs.stat('html', function (err, stats) { // 运行此函数前请在根目录创建html文件夹
    if (err) {
        console.log(err);
        return false;
    }
    console.log('文件：' + stats.isFile());      //false
    console.log('文件：' + stats.isDirectory()); //true
})
```

## fs.mkdir

`fs.mkdir(path, mode, callback)`

> * path 将创建的目录路径
> * mode 目录的权限\(读写权限\)，默认07777
> * callback 回调：传递异常参数 err

```js
fs.mkdir('css', function (err) {
    if (err) {
        console.log(err);
        return false;
    }
    console.log('创建目录成功');
})
```

## fs.writeFile

`fs.writeFile(filename, data, options, callback)`

> * filename   文件名称
> * data    将要写入的内容，可以使字符串 或 buffer数据。
> * options   数组对象，包含：
>   * encoding   可选值，默认 ‘utf8′，当data使buffer时，该值应该为 ignored。
>   * mode   \(Number\)        文件读写权限，默认值 438
>   * flag       \(String\)            默认值 ‘w'
> * callback {Function}  回调，传递一个异常参数err。

```js
fs.writeFile('t.txt', '你好，node.js', 'utf-8', function (err) {
    if (err) {
        console.log(err);
        return false;
    }
    console.log('写入成功');
})
```

## fs.appendFile

```js
fs.appendFile('t.txt', '这是追加的内容', function (err) {
    if (err) {
        console.log(err);
        return false;
    }
    console.log('追加内容成功');
})
```

## fs.readFile

```js
fs.readdir('html', function (err, data) {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(data);
})
```

## fs.readdir

> fs.readdir读取目录  把目录下面的文件和文件夹都获取到

```js
fs.readdir('html', function (err, data) {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(data);
})
```

## fs.rename

```js
fs.rename('html/index.html', 'html/news.html', function (err) {
    if (err) {
        console.log(err);
        return false;
    }
    console.log('修改名字成功');
})
```

##### 剪切文件

```js
fs.rename('html/css/basic.css', 'html/style.css', function (err) {
    if (err) {
        console.log(err);
        return false;
    }
    console.log('剪切成功');
})
```

## fs.rmdir

```js
fs.rmdir('css',function(err){
    if(err){
        console.log(err);
        return false;
    }
    console.log('删除 目录-css 成功');
```

## fs.unlink

```js
fs.unlink('t.txt',function(err){
    if(err){
        console.log(err);
        return false;
    }
    console.log('删除文件成功');
})
```



