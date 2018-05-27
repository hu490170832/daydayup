##### 插入数据

---

新建demo.js 输入数据后控制台下 `load('./demo.js')`

```js
var workmate1={
    name:'JSPang',
    age:33,
    sex:1,
    job:'前端',
    skill:{
        skillOne:'HTML+CSS',
        skillTwo:'JavaScript',
        skillThree:'PHP'
    },
    regeditTime:new Date(),
    interest:[]
}
var workmate2={
    name:'ShengLei',
    age:31,
    sex:1,
    job:'JAVA后端',
    skill:{
        skillOne:'HTML+CSS',
        skillTwo:'J2EE',
        skillThree:'PPT'
    },
    regeditTime:new Date(),
    interest:[]
}
var workmate3={
    name:'MinJie',
    age:18,
    sex:0,
    job:'UI',
    skill:{
        skillOne:'PhotoShop',
        skillTwo:'UI',
        skillThree:'PPT'
    },
    regeditTime:new Date(),
    interest:[]
}
var workmate4={
    name:'XiaoWang',
    age:25,
    sex:1,
    job:'UI',
    skill:{
        skillOne:'PhotoShop',
        skillTwo:'UI',
        skillThree:'PPT'
    },
    regeditTime:new Date(),
    interest:[]
}
var workmate5={
    name:'LiangPeng',
    age:28,
    sex:1,
    job:'前端',
    skill:{
        skillOne:'HTML+CSS',
        skillTwo:'JavaScript',
    },
    regeditTime:new Date(),
    interest:[]
}
var workmate6={
    name:'HouFei',
    age:25,
    sex:0,
    job:'前端',
    skill:{
        skillOne:'HTML+CSS',
        skillTwo:'JavaScript',
    },
    regeditTime:new Date(),
    interest:[]
}
var workmate7={
    name:'LiuYan',
    age:35,
    sex:0,
    job:'美工',
    skill:{
        skillOne:'PhotoShop',
        skillTwo:'CAD',
    },
    regeditTime:new Date(),
    interest:[]
}
var workmate8={
    name:'DingLu',
    age:20,
    sex:0,
    job:'美工',
    skill:{
        skillOne:'PhotoShop',
        skillTwo:'CAD',
    },
    regeditTime:new Date(),
    interest:[]
}
var workmate9={
    name:'JiaPeng',
    age:29,
    sex:1,
    job:'前端',
    skill:{
        skillOne:'HTML+CSS',
        skillTwo:'JavaScript',
        skillThree:'PHP'
    },
    regeditTime:new Date(),
    interest:[]
}
var workmate10={
    name:'LiJia',
    age:26,
    sex:0,
    job:'前端',
    skill:{
        skillOne:'HTML+CSS',
        skillTwo:'JavaScript',
        skillThree:'PHP'
    },
    regeditTime:new Date(),
    interest:[]
}
var db=connect('company');
var workmateArray=[workmate1,workmate2,workmate3,workmate4,workmate5,workmate6,workmate7,workmate8,workmate9,workmate10];
db.workmate.insert(workmateArray);
print('[SUCCESS]：The data was inserted successfully');
```

简单查找  
比如我们现在要查找数据中技能一会HTML+CSS的所有人。那我们直接进行查找加条件就可以了

```js
db.workmate.find({"skill.skillOne":"HTML+CSS"})
```

筛选字段

```js
db.workmate.find(
    {"skill.skillOne":"HTML+CSS"},
    {name:true,"skill.skillOne":true} // name : true 表示显示这个字段
)
```

![result.png](https://upload-images.jianshu.io/upload_images/8677726-515b56c19b2974ab.png?imageMogr2/auto-orient/strip|imageView2/2/w/1240)  
细心的小伙伴会发现还不够完美，多了一个ID字段，这个也不是我们想要的，这时候只要把\_id:false就可以了。当然这里的false和true，也可以用0和1表示。

```js
db.workmate.find(
    {"skill.skillOne":"HTML+CSS"},
    {name:true,"skill.skillOne":true,_id:false} 
)
```

![result.png](https://upload-images.jianshu.io/upload_images/8677726-c34f8b66801242b5.png?imageMogr2/auto-orient/strip|imageView2/2/w/1240)

###### 不等修饰符

---

* 小于\($lt\):英文全称less-than
* 小于等于\($lte\)：英文全称less-than-equal
* 大于\($gt\):英文全称greater-than
* 大于等于\($gte\):英文全称greater-than-equal
* 不等于\($ne\):英文全称not-equal

我们现在要查找一下，公司内年龄小于30大于25岁的人员。看下面的代码。

```js
db.workmate.find(
    {age:{$lte:30,$gte:25}},
    {name:true,age:true,"skill.skillOne":true,_id:false}
)
```

MongoDB也提供了方便的日期查找方法，现在我们要查找注册日期大于2018年1月10日的数据，我们可以这样写代码。

```js
var startDate= new Date('01/01/2018');
db.workmate.find(
    {regeditTime:{$gt:startDate}},
    {name:true,age:true,"skill.skillOne":true,_id:false}
)
```

##### find的多条件查询

---

###### $in修饰符

in修饰符可以轻松解决一键多值的查询情况。就如上面我们讲的例子，现在要查询同事中年龄是25岁和33岁的信息。

```js
db.workmate.find({age:{$in:[25,33]}},
    {name:1,"skill.skillOne":1,age:1,_id:0}
)
```

###### $or修饰符

它用来查询多个键值的情况，就比如查询同事中大于30岁或者会做PHP的信息。主要区别是两个Key值。$in修饰符是一个Key值，这个需要去比较记忆。

```js
db.workmate.find({$or:[
    {age:{$gte:30}},
    {"skill.skillThree":'PHP'}
]},
    {name:1,"skill.skillThree":1,age:1,_id:0}
)
```

or很好理解，就是或者的意思，我们查出来的结果也是一样的，查出了年龄大于30岁的，或者会做PHP的信息。相对应的还有$nor修饰符，这里不作演示了，自己试验一下。

###### $and修饰符

$and用来查找几个key值都满足的情况，比如要查询同事中大于30岁并且会做PHP的信息，这时需要注意的是这两项必须全部满足。当然写法还是比较简单的。只要把上面代码中的or换成and就可以了。

```js
db.workmate.find({$and:[
    {age:{$gte:30}},
    {"skill.skillThree":'PHP'}
]},
    {name:1,"skill.skillThree":1,age:1,_id:0}
)
```

###### $not修饰符

它用来查询除条件之外的值，比如我们现在要查找除年龄大于20岁，小于30岁的人员信息。需要注意的是$not修饰符不能应用在条件语句中，只能在外边进行查询使用。

```js
db.workmate.find({
    age:{
        $not:{
            $lte:30,
            $gte:20
        }
    }
},
{name:1,"skill.skillOne":1,age:1,_id:0}
)
```

##### find的数组查询

---

删除之前的表数据 `db.workmate.drop()` ，重新导入数据 `load('./demo.js')`

```js
var workmate1={
    name:'JSPang',
    age:33,
    sex:1,
    job:'前端',
    skill:{
        skillOne:'HTML+CSS',
        skillTwo:'JavaScript',
        skillThree:'PHP'
    },
    regeditTime:new Date(),
    interest:['看电影','看书','吃美食','钓鱼','旅游']
}

var workmate2={
    name:'ShengLei',
    age:31,
    sex:1,
    job:'JAVA后端',
    skill:{
        skillOne:'HTML+CSS',
        skillTwo:'J2EE',
        skillThree:'PPT'
    },
    regeditTime:new Date(),
    interest:['篮球','看电影','做饭']
}

var workmate3={
    name:'MinJie',
    age:18,
    sex:0,
    job:'UI',
    skill:{
        skillOne:'PhotoShop',
        skillTwo:'UI',
        skillThree:'PPT'
    },
    regeditTime:new Date(),
    interest:['做饭','画画','看电影']
}
var workmate4={
    name:'XiaoWang',
    age:25,
    sex:1,
    job:'UI',
    skill:{
        skillOne:'PhotoShop',
        skillTwo:'UI',
        skillThree:'PPT'
    },
    regeditTime:new Date(),
    interest:['写代码','篮球','画画']
}
var workmate5={
    name:'LiangPeng',
    age:28,
    sex:1,
    job:'前端',
    skill:{
        skillOne:'HTML+CSS',
        skillTwo:'JavaScript',
    },
    regeditTime:new Date(),
    interest:['玩游戏','写代码','做饭']
}

var workmate6={
    name:'HouFei',
    age:25,
    sex:0,
    job:'前端',
    skill:{
        skillOne:'HTML+CSS',
        skillTwo:'JavaScript',
    },
    regeditTime:new Date(),
    interest:['化妆','读书','做饭']
}

var workmate7={
    name:'LiuYan',
    age:35,
    sex:0,
    job:'美工',
    skill:{
        skillOne:'PhotoShop',
        skillTwo:'CAD',
    },
    regeditTime:new Date(),
    interest:['画画','聚会','看电影']
}


var workmate8={
    name:'DingLu',
    age:20,
    sex:0,
    job:'美工',
    skill:{
        skillOne:'PhotoShop',
        skillTwo:'CAD',
    },
    regeditTime:new Date(),
    interest:['美食','看电影','做饭']
}

var workmate9={
    name:'JiaPeng',
    age:29,
    sex:1,
    job:'前端',
    skill:{
        skillOne:'HTML+CSS',
        skillTwo:'JavaScript',
        skillThree:'PHP'
    },
    regeditTime:new Date(),
    interest:['写代码','篮球','游泳']
}

var workmate10={
    name:'LiJia',
    age:26,
    sex:0,
    job:'前端',
    skill:{
        skillOne:'HTML+CSS',
        skillTwo:'JavaScript',
        skillThree:'PHP'
    },
    regeditTime:new Date(),
    interest:['玩游戏','美食','篮球']
}



var db=connect('company');
var workmateArray=[workmate1,workmate2,workmate3,workmate4,workmate5,workmate6,workmate7,workmate8,workmate9,workmate10];
db.workmate.insert(workmateArray);
print('[SUCCESS]：The data was inserted successfully');
```

###### 基本数组查询

比如现在我们知道了一个人的爱好是'画画','聚会','看电影'，但我们不知道是谁，这时候我们就可以使用最简单的数组查询

```js
db.workmate.find({interest:['画画','聚会','看电影']},
    {name:1,interest:1,age:1,_id:0} 
)
```

![result.png](https://upload-images.jianshu.io/upload_images/8677726-543ac36e5f282fdc.png?imageMogr2/auto-orient/strip|imageView2/2/w/1240)  
在终端中运行后，我们得到了数据。这时候我们说，想查出看兴趣中有看电影的员工信息。按照正常逻辑，应该使用下面的代码。

```js
db.workmate.find({interest:['看电影']},
    {name:1,interest:1,age:1,_id:0} 
)
```

运行后，并没有如我们所愿得到相应的人员数据，数据为空。那问题出现在哪里？问题就在于我们写了一个中括号\(\[\]\),因为加上中括号就相当于完全匹配了，所以没有得到一条符合查询条件的数据。我们去掉中括号再看看结果。

```js
db.workmate.find({interest:'看电影'},
    {name:1,interest:1,age:1,_id:0} 
)
```

###### $all-数组多项查询

现在我们的条件升级了，要查询出喜欢看电影和看书的人员信息，也就是对数组中的对象进行查询，这时候要用到一个新的查询修饰符$all。看下面的例子：

```js
db.workmate.find(
    {interest:{$all:["看电影","看书"]}},
    {name:1,interest:1,age:1,_id:0} 
)
```

###### $in-数组的或者查询

用$all修饰符，是需要满足所有条件的，$in主要满足数组中的一项就可以被查出来（有时候会跟$or弄混）。比如现在要查询爱好中有看电影的或者看书的员工信息。

```js
db.workmate.find(
    {interest:{$in:["看电影","看书"]}},
    {name:1,interest:1,age:1,_id:0} 
)
```

![$all - $in.png](https://upload-images.jianshu.io/upload_images/8677726-b6f3a4c947b08d4a.png?imageMogr2/auto-orient/strip|imageView2/2/w/1240)

###### $size-数组个数查询

$size修饰符可以根据数组的数量查询出结果。比如现在我们要查找兴趣的数量是5个人员信息，这时候就可以使用$size。

```js
db.workmate.find(
    {interest:{$size:5}},
    {name:1,interest:1,age:1,_id:0} 
)
```

###### $slice-显示选项

有时候我并不需要显示出数组中的所有值，而是只显示前两项，比如我们现在想显示每个人兴趣的前两项，而不是把每个人所有的兴趣都显示出来。

```js
db.workmate.find(
    {},
    {name:1,interest:{$slice:2},age:1,_id:0} 
)
```

这时候就显示出了每个人兴趣的前两项，如果我们想显示兴趣的最后一项，可以直接使用slice:-1，来进行查询

```js
db.workmate.find(
    {},
    {name:1,interest:{$slice:-1},age:1,_id:0} 
)
```

##### 查询：find的参数使用方法

---

前边已经讲了操作find方法的第一个参数（query）和第二个参数（fields）。find还有几个常用的参数，这些参数多用在分页和排序上。  
![find.png](https://upload-images.jianshu.io/upload_images/8677726-0c5d4f0db5653b52.png?imageMogr2/auto-orient/strip|imageView2/2/w/1240)

* query：这个就是查询条件，MongoDB默认的第一个参数。
* fields：（返回内容）查询出来后显示的结果样式，可以用true和false控制是否显示。
* limit：返回的数量，后边跟数字，控制每次查询返回的结果数量。
* skip:跳过多少个显示，和limit结合可以实现分页。
* sort：排序方式，从小到大排序使用1，从大到小排序使用-1。

明白了上面这些选项，现在可以作一个最简单的分页，我们把同事集合（collections）进行分页，每页显示两个，并且按照年龄从小到大的顺序排列。

```js
db.workmate.find({},{name:true,age:true,_id:false}).limit(2).skip(0).sort({age:1});
```

![分页.png](https://upload-images.jianshu.io/upload_images/8677726-983221bfcc8c8e56.png?imageMogr2/auto-orient/strip|imageView2/2/w/1240)  
想看第二页，则skip写为1就好了

###### $where修饰符

它是一个非常强大的修饰符，但强大的背后也意味着有风险存在。它可以让我们在条件里使用javascript的方法来进行复杂查询。我们先来看一个最简单的例子，现在要查询年龄大于30岁的人员。

```js
db.workmate.find(
    {$where:"this.age>30"},
    {name:true,age:true,_id:false}
)
```

这里的this指向的是workmate（查询集合）本身。这样我们就可以在程序中随意调用。虽然强大和灵活，但是这种查询对于数据库的压力和安全性都会变重，所以在工作中尽量减少$where修饰符的使用。

