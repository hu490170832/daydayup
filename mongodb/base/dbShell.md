# mongoDB shell

## 数据库操作

```js
show dbs // 显示所有数据库
use COLLECTION_NAME // 切换数据库 | 创建数据库
db     // 显示当前的数据库名称|
db.dropDatabase() // 删除数据库
```

## 集合操作

```js
/** 创建集合 **/
db.user.insert({username: 'gershon'}) //better

db.createCollection(name, options) 
    -- db.createCollection('user',{username:'gershon'})

show collections // 查询集合
db.COLLECTION_NAME.drop() // 删除集合
```

## 文档操作

### 插入文档

```js
db.COLLECTION_NAME.insert(document) 
db.COLLECTION_NAME.save(document)
```

### 查询文档

`find()` 基础使用

```js
db.COLLECTION_NAME.find() // 查询集合中所有记录
db.COLLECTION_NAME.find().pretty() // 格式化查询的记录

db.COLLECTION_NAME.findOne() //查找第一条记录

// -- 以实例讲解用法
db.user.find({"age":{$lt:18}})  // 小于 ==> where age < 18 
db.user.find({"age":{$gt:18}})  // 大于 ==> where age > 18
db.user.find({"age":{$lte:18}}) // 小于或等于 ==> where age <= 18
db.user.find({"age":{$gte:18}}) // 大于或等于 ==> where age >= 18
db.user.find({"age":{$ne:18}})  // 不等于 ==> where age != 18


// MongoDB 中的 and 条件
db.user.find({"name":"gershon","age":18}) //==> where name ='gershon' and age=18
// MongoDB 中的 or 条件
db.user.find({$or: [{name:'gershon'},{age:18}]}) //==> where name ='gershon' or age=18
//MongoDB 中 and 和 or 结合使用 ==> 查询 user 集合中 age 值大于17 且 name=gershon或Bob
db.user.find('age':{$gt:17}，$or:[{name:'gershon'},{name:'Bob'}]) //WHERE age > 17  (name='gershon' OR name="Bob")

// $type 操作符 【基于BSON类型来查询集合中匹配的数据类型，并返回结果。】
1 Double | 2 String | 3 Object | 4 Array | 8 Boolean | 9 Date | 10 Null | 14 Symbol
db.user.find({"name":{$type:2}})  //==> 查询 user 集合中 name 为 String 类型的文档
```

`find()` 映射和限制记录

* MongoDB 中限制字段的显示，可以利用 0 或 1 来设置字段列表。1 用于显示字段，0 用于隐藏字段。
* MongoDB 中想要显示或者跳过指定的文档条数，可以利用 limit\(\) 方法和 skip\(\) 方法

```js
db.user.find() //会显示user集合的所有记录包括 '_id' 我们不想他显示 ==>
    --db.user.find({},{name:1, '_id':0}) // user 集合中查找的记录 不显示_id字段

db.user.find().limit(2) // 限制返回两条记录
db.user.find().limit(2).skip(1) //查找的记录跳过首条数据
```

### 更新文档

`update()` 更新已经存在文档的值 `db.COLLECTION_NAME.update(SELECTIOIN_CRITERIA, UPDATED_DATA)`

```js
db.user.update( {name: 'gershon'}, { $set: {name: 'ggg'}})

// 面范例只会更新第一条发现的文档，若想更新全部发现的文档，则需要用 multi:true 
b.user.update({'name':'user1'},{$set:{'name':'user2'}},{multi:true})
```

`save()` 方法通过传入的文档来替换已有文档`db.COLLECTION_NAME.save({_id:ObjectId(),NEW_DATA})`

```js
db.user.save({'_id':'5b100aede14238e914735ed2',hh:'ww'})
```

### 删除文档

```js
db.COLLECTION_NAME.remove(DELLETION_CRITTERIA,justOne)
    --db.user.remove({name:'gershon'}) // 删除 name 为 'gershon' 的所有记录
    --db.user.remove({name:'gershon'}, 1) // 删除 name 为 'gershon' 的一条记录
    --db.user.remove({}) // 删除集合中所有记录
```



