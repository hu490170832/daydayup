## Flex 基本概念：

![](https://pic3.zhimg.com/80/v2-54a0fc96ef4f455aefb8ee4bc133291b_hd.jpg)

## Flex 容器：

```css
.container{
    display: flex | inline-flex;       //可以有两种取值
}
```

**需要注意的是：当时设置 flex 布局之后，子元素的 float、clear、vertical-align 的属性将会失效。**

有下面六种属性可以设置在容器上，它们分别是：

> 1. flex-direction  
>    1. 功能：决定水平方向的排列方向 
>    2. 参数：row \| row-reverse \| column \| column-reverse
> 2. flex-wrap
>    1. 功能：决定容器内项目是否可以换行
>    2. 参数：nowrap \| wrap \| wrap-reverse
> 3. flex-flow
>    1. 功能：flex-direction、flex-wrap 的简写形式 ---&gt; 没什么卵用
>    2. 参数：&lt;flex-direction&gt; \| &lt;flex-wrap&gt;
> 4. justify-content
>    1. 功能：定义在水平方向的对齐方式
>    2. 参数：flex-start \| flex-end \| center \| space-between \| space-around
> 5. align-items
>    1. 功能：定义了容器内项目的对齐方式
>    2. 参数：stretch \| flex-start \| flex-end \| center \| baseline 
> 6. align-content
>    1. 功能：定义了多根轴线的对齐方式，如果项目只有一根轴线，则该属性将不起作用
>    2. 参数：stretch \| flex-start \| flex-end \| center \| space-between \| space-around

说明 ：参数首位为默认值 ；参数中含有 `reverse` 的表示反方向

### Justify-content

**justify-content:space-between  **两端对齐，项目之间的间隔相等，即剩余空间等分成间隙

![](/assets/space-between.png)

**justify-content:space-around ** 每个项目两侧的间隔相等，所以项目之间的间隔比项目与边缘的间隔大一倍。

![](/assets/space-around.png)

### align-items

**建立在主轴为水平方向时测试，即 flex-direction: row \( 默认值 \)**

> stretch 默认值， 即如果项目未设置高度或者设为 auto，将占满整个容器的高度。

假设容器高度设置为 100px，而项目都没有设置高度的情况下，则项目的高度也为 100px。

![](https://pic1.zhimg.com/80/v2-0cced8789b0d73edf0844aaa3a08926d_hd.jpg)



> flex-start：交叉轴的起点对齐

假设容器高度设置为 100px，而项目分别为 20px, 40px, 60px, 80px, 100px, 则如下图显示

![](https://pic4.zhimg.com/80/v2-26d9e85039beedd78e412459bd436e8a_hd.jpg)

> flex-end：交叉轴的终点对齐

![](https://pic3.zhimg.com/80/v2-8b65ee47605a48ad2947b9ef4e4b01b3_hd.jpg)

> center：交叉轴的中点对齐

![](https://pic4.zhimg.com/80/v2-7bb9d8385273d8ad469605480f40f8f2_hd.jpg)

> baseline: 项目的第一行文字的基线对齐

![](https://pic4.zhimg.com/80/v2-abf7ac4776302ad078986f7cd0dddaee_hd.jpg)

### algin-content





