## fs：操作文件系统

### 1） 读取文件

* **readFile readFileSync**`fs.readFile(filename,[options],function(err,data){ })`

**有Sync后缀的方法为同步方法，不具有Sync后缀的方法均为异步方法**

> 1. `filename` ：表示要读取文件的路径和名称
> 2. `options` ：指定使用哪种编码格式来读取该文件，可指定的属性值为‘utf-8’，‘ascii’，‘base64’
> 3. `callback` ：表示文件服务完毕后执行的回调函数，回调函数的第一个参数err，为读取文件操作失败时触发的错误对象，第二个参数data，表示读取文件成功后读取到的文件内容。

实例： 同目录下新建 index.txt 文件，写入内容 "我是 index.txt"

```js
var fs = require('fs');
var data = fs.readFile('./index.txt', 'utf-8', function(err,data){
    // 操作结果作为回调函数的第二个参数返回
    if (err) {
        console.log('读取文件发生错误')
    }else {
        console.log(data);
    }
});
```

运行结果 ：![](https://upload-images.jianshu.io/upload_images/8677726-f95609667ed6bc52.png?imageMogr2/auto-orient/strip|imageView2/2/w/327)



* **read** `fs.read(fd, buffer, offset, length, position, callback)`

> 1. fd ：通过 fs.open\(\) 方法返回的文件描述符
> 2. buffer ：数据写入的缓冲区
> 3. offset ：缓冲区写入的偏移量
> 4. length ：要从文件中读取的字节数
> 5. position ：文件读取的起始位置，如果position的值为null，则会从当前文件指针的位置读取
> 6. callback ：回调函数，有三个参数 err , bytesRead, buffer 
>    1. err ：错误信息
>    2. bytesRead ：表示读取的字节数
>    3. buffer ：缓冲区对象

### 2） 写入文件

* **writeFile writeFileSync** `fs.writeFile(path, data, [options], function(err){ });`

> 1. `path`：文件路径
> 2. `data`：要写入的数据
> 3. ...

```js
var fs = require('fs');
fs.writeFile('./message.txt','这是写入的数据',function(err){
    if(err){
        console.log('写文件操作失败。')
    }else {
        console.log('写文件操作成功。')
    }
})
```

如果message文件不存在 则会创建message.txt  
如果message文件存在 则写入的数据覆盖原本内容

* **write writeSync** `fs.write(fd,buffer,offset,length,position,function(err,written,buffer) {})`

```js
var fs = require('fs')
var buf = new Buffer('心心心输送机');
fs.open('./message.txt','w', function(err,fd){
    fs.write(fd,buf,3,9,0,function(err,written,buffer){
        if(err){
            console.log('文件写入失败')
        }else{
            console.log('写入文件成功')
        }
    })
})
```

"心心输" 三个字被写入

在写入文件后，我们经常要关闭文件`fs.close(fd,[callback])`

#### 2.1 用readFile writeFile 实现复制图片

```js
var fs = require('fs');
fs.readFile('./a.jpg', 'base64', function(err,data){
    fs.writeFile('./b.jpg',data.toString(),'base64',function(err){
        if(err){
            console.log('写文件操作失败')
        }else {
            console.log('写文件操作成功')
        }
    })
});
```

### 3）在文件中追加内容

**appendFile appendFileSync** `fs.appendFile(path, data, options, callback)`

```js
var fs = require('fs');
fs.appendFile('./message.txt', '这是追加的数据', 'utf-8', function(err){
    if(err){
        console.log('追加文件失败')
    }else {
        console.log('追加文件成功')
    }
});
```

### 4）打开文件

**open openSync** `fs.open(path, flags[, mode], callback) `

> 1. path ： 文件的路径。
> 2. flags ：文件打开的行为
>    1. r ： 以只读模式打开文件
>    2. r+ ：以读写模式打开文件
>    3. rs ：以同步的方式读取文件
>    4. rs+ ：以同步的方式读写文件
> 3. mode ：设置文件模式（权限），文件创建的默认权限为 0666（可读写）
> 4. callback ：回调函数，带有两个参数如：callback\( err, fd \)

```js
var fs = require('fs')
fs.open('message.txt', 'r+', function (err, fd) {
    if (err) return err;
    console.log(fd);
    console.log('文件打开成功');
});
```

运行结果：![](https://upload-images.jianshu.io/upload_images/8677726-472d454dbd35795d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/307)

### 5）创建文件、目录

**mkdir mkdirSync** `fs.mkdir(path[, mode], callback)`

```js
var fs = require("fs");

console.log("创建目录 test");
fs.mkdir("test",function(err){
    if (err) {
        return console.error(err);
    }
    console.log("目录创建成功。");
});
```

### 6）读取目录

**readdir readdirSync** `fs.readdir(path,function(err,files){})`

```js
var fs = require('fs')
fs.readdir('./',function(err,files){
    if(err){
        console.log('读取目录失败')
    }else{
        console.log(files)
    }
})
```

当前目录：![](https://upload-images.jianshu.io/upload_images/8677726-0d749fae48456bf0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/237)

运行结果：![](https://upload-images.jianshu.io/upload_images/8677726-5a6cbebeaba5a3f1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/563)

### 7）获取文件信息

**stat** `fs.stat(path, callback)`

```js
var fs = require('fs');
fs.stat('message.txt',function(err,stats){
    if(err){
        return err;
    }
    console.log(stats);
    console.log("读取文件信息成功");
    //检测文件类型
    console.log('是否为文件(isFile) ? ' + stats.isFile());
    console.log('是否为目录(isDirectory) ? ' + stats.isDirectory());
});
```

运行结果：![](https://upload-images.jianshu.io/upload_images/8677726-f4eaac06e81683c3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/369)

### 8）判断文件目录是否存在 

**exists** `fs.exists(path, callback)`

```js
var fs = require('fs');
fs.exists('./test', function (exists) {
    if (exists) {
        console.log('路径存在');
    }
});
```



