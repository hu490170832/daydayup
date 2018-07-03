# CSS 基础面试题

**1、介绍一下标准的CSS的盒子模型？与低版本IE的盒子模型有什么不同的？**

* 标准盒子模型：宽度=内容的宽度（content）+ border + padding + margin
* 低版本IE盒子模型：宽度=内容宽度（content+border+padding）+ margin

**2、box-sizing属性？**

* 用来控制元素的盒子模型的解析模式，默认为content-box
* context-box：W3C的标准盒子模型，设置元素的 height/width 属性指的是content部分的高/宽
* border-box：IE传统盒子模型。设置元素的height/width属性指的是border + padding + content部分的高/宽

**3、对BFC规范\(块级格式化上下文：block formatting context\)的理解？**

BFC规定了内部的Block Box如何布局。

定位方案：

1. 内部的Box会在垂直方向上一个接一个放置。

2. Box垂直方向的距离由margin决定，属于同一个BFC的两个相邻Box的margin会发生重叠。

3. 每个元素的margin box 的左边，与包含块border box的左边相接触。

4. BFC的区域不会与float box重叠。

5. BFC是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。

6. 计算BFC的高度时，浮动元素也会参与计算。

满足下列条件之一就可触发BFC

1. 根元素，即html

2. float的值不为none（默认）

3. overflow的值不为visible（默认）

4. display的值为inline-block、table-cell、table-caption

5. position的值为absolute或fixed

**4、为什么会出现浮动和什么时候需要清除浮动？清除浮动的方式？**

浮动元素碰到包含它的边框或者浮动元素的边框停留。由于浮动元素不在文档流中，所以文档流的块框表现得就像浮动框不存在一样。浮动元素会漂浮在文档流的块框上。  
浮动带来的问题：

1. 父元素的高度无法被撑开，影响与父元素同级的元素

2. 与浮动元素同级的非浮动元素（内联元素）会跟随其后

3. 若非第一个元素浮动，则该元素之前的元素也需要浮动，否则会影响页面显示的结构。

清除浮动的方式：

1. **父级div定义height**

2. **最后一个浮动元素后加空div标签 并添加样式clear:both。**

3. **包含浮动元素的父标签添加样式overflow为hidden或auto。**

4. **父级div定义zoom**

**5、什么是响应式设计？响应式设计的基本原理是什么？如何兼容低版本的IE？**

响应式网站设计\(Responsive Web design\)是一个网站能够兼容多个终端，而不是为每一个终端做一个特定的版本。

基本原理是通过媒体查询检测不同的设备屏幕尺寸做处理。

页面头部必须有meta声明的viewport。

```html
<meta name="’viewport’" content="”width=device-width," initial-scale="1." maximum-scale="1,user-scalable=no”"/>
```

**6、::before 和 :after中双冒号和单冒号有什么区别？解释一下这2个伪元素的作用**

1.  单冒号\(:\)用于CSS3伪类，双冒号\(::\)用于CSS3伪元素。
2. ::before就是以一个子元素的存在，定义在元素主体内容之前的一个伪元素。并不存在于dom之中，只存在在页面之中。

:before 和 :after 这两个伪元素，是在CSS2.1里新出现的。起初，伪元素的前缀使用的是单冒号语法，但随着Web的进化，在CSS3的规范里，伪元素的语法被修改成使用双冒号，成为::before ::after

**7、li与li之间有看不见的空白间隔是什么原因引起的？有什么解决办法？**

行框的排列会受到中间空白（回车空格）等的影响，因为空格也属于字符,这些空白也会被应用样式，占据空间，所以会有间隔，把字符大小设为0，就没有空格了。  
解决方法：

1. 可以将&lt;li&gt;代码全部写在一排

2. 浮动li中float：left

3. 在ul中用font-size：0（谷歌不支持）；可以使用letter-space：-3px

**8、display:inline-block 什么时候会显示间隙？**

1. 有空格时候会有间隙 解决：移除空格

2. margin正值的时候 解决：margin使用负值

3. 使用font-size时候 解决：font-size:0、letter-spacing、word-spacing



