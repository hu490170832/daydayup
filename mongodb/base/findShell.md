## 基本使用

```js
db.COLLECTION_NAME.find() // 查询集合中所有记录
db.COLLECTION_NAME.find().pretty() // 格式化查询的记录
```

## 映射和限制记录 `limit` `skip`

```js
// 查找 user 集合中 age=18 的记录 且不显示_id字段
db.user.find({age:18},{'_id':0})
```

## find的不等修饰符

* 小于\($lt\):英文全称less-than
* 小于等于\($lte\)：英文全称less-than-equal
* 大于\($gt\):英文全称greater-than
* 大于等于\($gte\):英文全称greater-than-equal
* 不等于\($ne\):英文全称not-equal

demo 查找user 中 年龄小于30大于25岁的人员

```js
db.user.find({age:{$lt:30, $gt: 25}})

db.user.find({age:{$in:[25,30]})
```

## find的多条件查询

* $in 修饰符 `db.user.find({age:{$in : [25, 30]} })`
* $or 修饰符 `db.user.find({$or:[{age:{$lt: 30},{name: 'gershon'}}]})`
* $and 修饰符 `db.user.find({$and:[{age:{$lt: 30},{name: 'gershon'}}]})`
* $nor 修饰符 `db.user.find({$nor:[{age:18}]})`

```js
// $in ==> 查找年龄大于25小于30的记录
db.user.find({age:{$in : [25, 30]} })

// $or ==> 查找年龄小于30或者名字为'gershon'的记录
db.user.find({$or:[{age:{$lt: 30},{name: 'gershon'}}]})

// $and ==> 查找年龄小于30且名字为'gershon'的记录
db.user.find({$and:[{age:{$lt: 30},{name: 'gershon'}}]})

// $nor ==> 查找年龄不为18的记录
db.user.find({$nor:[{age:18}]})
```

## find的数组查询

* $all-数组多项查询
* $in-数组的或者查询
* $size-数组个数查询
* $slice-显示选项

```js
// 数据库
user: {interest: ['看电影','看书','画画'] }

db.user.find({interest:['看电影']}) //==> 返回空记录
db.user.find({interest:'看电影'})  //==> 返回一条记录

// $all ==> 查询出喜欢看电影和看书的人员信息
db.user.find({interest:{$all:["看电影","看书"]}})

// $in ==> 查询爱好中有看电影的或者看书的人员信息
db.user.find({interest:{$in:["看电影","看书"]}})

// $size ==> 比如现在我们要查找兴趣的数量是3个人员信息
db.user.find({interest:{$size:3}})

// $slice ==> 显示每个人兴趣的前两项
db.user.find({},{name:1,interest:{$slice:2},age:1,_id:0} )
```

# find的参数使用方法

* query：这个就是查询条件，MongoDB默认的第一个参数。
* fields：（返回内容）查询出来后显示的结果样式，可以用true和false控制是否显示。
* limit：返回的数量，后边跟数字，控制每次查询返回的结果数量。
* skip:跳过多少个显示，和limit结合可以实现分页。
* sort：排序方式，从小到大排序使用1，从大到小排序使用-1。

```js
// 分页 按照年龄从小到大的顺序排列
db.user.find({},{name:true,age:true,_id:false}).limit(0).skip(2).sort({age:1});

// $where 修饰符
db.workmate.find(
    {$where:"this.age>30"},
    {name:true,age:true,_id:false}
)
```

## findAndModify --查找并修改

findAndModify属性值：

* **query**：需要查询的条件/文档
* **sort**:    进行排序
* **remove**：\[boolean\]是否删除查找到的文档，值填写true，可以删除。
* **new**:\[boolean\]返回更新前的文档还是更新后的文档。
* **fields**：需要返回的字段
* **upsert**：没有这个值是否增加。

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



