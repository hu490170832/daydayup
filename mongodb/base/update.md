######概要
>* $set 修改键值 `db.workmate.update({"name":"MinJie"},{"$set":{sex:2,age:21}})`
>* $unset 删除 key 和 value `db.workmate.update({"name":"MinJie"},{$unset:{"age":''}})`
>* $inc对数字进行计算 `db.workmate.update({"name":"MinJie"},{$inc:{"age":-2}})`
>* multi选项 `true`  为每个json 批量添加数据 `db.workmate.update({},{$set:{interset:[]}},{multi:true})`
>* upsert选项 在找不到值的情况下，直接插入这条数据 `db.workmate.update({name:'xiaoWang'},{$set:{age:20}},{upsert:true})`
>* $push追加数组/内嵌文档值 `db.workmate.update({name:'xiaoWang'},{$push:{interest:'draw'}})`
>* $addToSet 查找是否存在，不存在就push上去 `db.workmate.update({name:"xiaoWang"},{$addToSet:{interest:"readBook"}})`
>* $pop 删除数组值 `db.workmate.update({name:'xiaoWang'},{$pop:{interest:1}})`
>* 数组定位修改 `db.workmate.update({name:'xiaoWang'},{$set:{"interest.2":"Code"}})`

---- 

新建 demo1.js
```js
var workmate1={
    name:'JSPang',
    age:33,
    sex:1,
    job:'前端',
    skill:{
        skillOne:'HTML+CSS',
        SkillTwo:'JavaScript',
        SkillThree:'PHP'
    },
    regeditTime:new Date()
};

var workmate2={
    name:'ShengLei',
    age:30,
    sex:1,
    job:'JAVA后端',
    skill:{
        skillOne:'HTML+CSS',
        SkillTwo:'J2EE',
        SkillThree:'PPT'
    },
    regeditTime:new Date()
};

var workmate3={
    name:'MinJie',
    age:20,
    sex:1,
    job:'UI设计',
    skill:{
        skillOne:'PhotoShop',
        SkillTwo:'UI',
        SkillThree:'Word+Excel+PPT'
    },
    regeditTime:new Date()
};

var db=connect('company');
var workmateArray=[workmate1,workmate2,workmate3];
db.workmate.insert(workmateArray);
print('[SUCCESS]: The data was inserted successfully.');
```
控制台下 `load('./demo1.js')` 加载js文件

---
######$set 修改键值
用来修改一个指定的键值(key) 具体用法如下
```
db.workmate.update({"name":"MinJie"},{"$set":{sex:2,age:21}})
```
######$unset 删除 key 和 value
它的作用其实就是删除一个key值和键
```
db.workmate.update({"name":"MinJie"},{$unset:{"age":''}})
```
######$inc对数字进行计算
它是对value值的修改，但是修改的必须是数字，字符串是不起效果的。我们现在要对MiJie的年龄减去2岁，就可以直接用$inc来操作。
```
db.workmate.update({"name":"MinJie"},{$inc:{"age":-2}})
```
######multi选项
要把每个人的爱好也加入进来，但是如果你直接写会只加一个，比如下面这种形式。
```	
db.workmate.update({},{$set:{interset:[]}})
```
这时候你用db.workmate.find()查找，你会发现只改变了第一个数据，其他两条没有改变。这时候我们想改变就要用到multi选项。
```
db.workmate.update({},{$set:{interset:[]}},{multi:true})
```
这时候每个数据都发生了改变，multi是有ture和false两个值，true代表全部修改，false代表只修改一个（默认值）

---

######upsert选项
upsert是在找不到值的情况下，直接插入这条数据。
```
db.workmate.update({name:'xiaoWang'},{$set:{age:20}},{upsert:true})
```
upsert也有两个值：true代表没有就添加，false代表没有不添加(默认值)。
![插入成功.png](https://upload-images.jianshu.io/upload_images/8677726-546866f87a46a85b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

######$push追加数组/内嵌文档值
$push的功能是追加数组中的值，但我们也经常用它操作内嵌稳文档，就是{}对象型的值。先看一个追加数组值的方式，比如我们要给小王加上一个爱好(interset)为画画（draw）：
```
db.workmate.update({name:'xiaoWang'},{$push:{interest:'draw'}})
```

![插入数组成功.png](https://upload-images.jianshu.io/upload_images/8677726-c6161e3114a4c8de.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
当然$push修饰符还可以为内嵌文档增加值，比如我们现在要给我们的UI，增加一项新的技能skillFour为draw，这时候我们可以操作为：
```
db.workmate.update({name:'MinJie'},{$push:{"skill.skillFour":'draw'}})
```
![内嵌文档.png](https://upload-images.jianshu.io/upload_images/8677726-3abbd53c8c501572.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

######$addToSet 
查找是否存在，不存在就push上去
```
db.workmate.update({name:"xiaoWang"},{$addToSet:{interest:"readBook"}})
```

######$each 批量追加
它可以传入一个数组，一次增加多个值进去，相当于批量操作，性能同样比循环操作要好很多，这个是需要我们注意的，工作中也要先组合成数组，然后用批量的形式进行操作。

例子：我们现在要给xiaoWang,一次加入三个爱好，唱歌（Sing），跳舞（Dance），编码（Code）。
```
var newInterset=["Sing","Dance","Code"];
db.workmate.update({name:"xiaoWang"},{$addToSet:{interest:{$each:newInterset}}})
```
######$pop 删除数组值
$pop只删除一次，并不是删除所有数组中的值。而且它有两个选项，一个是1和-1。
1：从数组末端进行删除
-1：从数组开端进行删除
```
db.workmate.update({name:'xiaoWang'},{$pop:{interest:1}})
```
######数组定位修改
 有时候只知道修改数组的第几位，但并不知道是什么，这时候我们可以使用interest.int 的形式。
例子，比如我们现在要修改xiaoWang的第三个兴趣为编码（Code），注意这里的计数是从0开始的。
```
db.workmate.update({name:'xiaoWang'},{$set:{"interest.2":"Code"}})
```