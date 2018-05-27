update 修改数据库的数据，但是并没有返回值，所以平时中会用的比较少

###### db.runCommand\( \):

---

它是数据库运行命令的执行器，执行命令首选就要使用它，因为它在Shell和驱动程序间提供了一致的接口。（几乎操作数据库的所有操作，都可以使用runCommand来执行）现在我们试着用runCommand来修改数据库，看看结果和直接用db.collections.update有什么不同。

```js
db.workmate.update({sex:1},{$set:{money:1000}},false,true) 
var resultMessage=db.runCommand({getLastError:1})
printjson(resultMessage);
```

代码解析：  
`db.workmate.update({sex:1},{$set:{money:1000}},false,true)`

* false：第一句末尾的false是upsert的简写，代表没有此条数据时不增加;
* true：true是multi的简写，代表修改所有。
* getLastError:1 :表示返回功能错误
* printjson：表示以json对象的格式输出到控制台。

上边的代码，我们修改了所有男士的数据，每个人增加了1000元钱\(money\)，然后用db.runCommand\(\)执行，可以看到执行结果在控制台返回了。  
![callback.png](https://upload-images.jianshu.io/upload_images/8677726-a26aad416d4b133a.png?imageMogr2/auto-orient/strip|imageView2/2/w/1240)  
db.listCommands\( \):查看所有的Commad命令  
比如我们要查看是否和数据库链接成功了，就可以使用Command命令。

```js
db.runCommand({ping:1}) // 返回ok：1就代表链接正常。
```

###### findAndModify:

---

**findAndModify是查找并修改的意思**。配置它可以在修改后给我们返回修改的结果,我们先看下面的代码：

```js
var myModify={
    findAndModify:"workmate",
    query:{name:'JSPang'},
    update:{$set:{age:18}},
    new:true    //更新完成，需要查看结果，如果为false不进行查看结果
}
var ResultMessage=db.runCommand(myModify);

printjson(ResultMessage)
```

代码解析：

* _query_：需要查询的条件/文档
* _sort_  ：   进行排序
* _remove_ ：\[boolean\]是否删除查找到的文档，值填写true，可以删除。
* _new_ ：\[boolean\]返回更新前的文档还是更新后的文档。
* _fields_ ： 需要返回的字段
* _upsert_ ： 没有这个值是否增加。

![result.png](https://upload-images.jianshu.io/upload_images/8677726-03a13bc7717a620a.png?imageMogr2/auto-orient/strip|imageView2/2/w/1240)

