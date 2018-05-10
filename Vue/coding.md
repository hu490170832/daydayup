### Vue

**@click.native = " "  意义何在？**

```js
<router-link to='/test' @click="test">测试click</router-link>
```

`router-link`会阻止`click`事件，你可以试试只用`click`不用`native`,事件是不会触发的

> @click.native 主要是为组件绑定原生事件，类似 $el.addEventListener\(click,callback\);
>
> 意思就是当你给一个vue组件绑定事件时候，要加上native！如果是普通的html元素！就不需要

再举个例子：

自定义button组件

```js
<template>
  <div>
    <button type="button" @click="clickHandler">
      <slot/>
    </button>
  </div>
</template>

<script>
  export default {
    methods: {
      clickHandler(){
        this.$emit('vclick') // 触发 `vclick` 事件
      }
    }
  }
</script>
```

引用button.vue组件

```js
<template>
  <div>
    <vButton @click="clickHandler" @vclick="vClickHandler">按钮1</vButton>
    <vButton @click.native="clickHandler" @vclick="vClickHandler">按钮2</vButton>
  </div>
</template>

<script>
  import vButton from './button'

  export default {
    components: {vButton},
    methods: {
      clickHandler() {
        alert('onclick') // 此处不会执行 因为组件中未定义 `click` 事件
      },
      vClickHandler() {
        alert('onvclick') // 触发 `vclick` 自定义事件
      }
    }
  }
</script>
```

可以发现  **不加native的组件只执行自定义的事件 vClickHandler**

**加了native 的组件会执行自定义的事件 vClickHandler 和 click 方法**

### keep-alive

主要用于保留组件状态或避免重新渲染  
首先看下没有加 keep-alive 的效果  
![1.gif](https://upload-images.jianshu.io/upload_images/8677726-857dd3561235ce87.gif?imageMogr2/auto-orient/strip)  


> 然后看看 加了keep-alive 的效果

```html
<keep-alive>
   <router-view/>
</keep-alive>
```

  
![2.gif](https://upload-images.jianshu.io/upload_images/8677726-dee0c2e105930f9a.gif?imageMogr2/auto-orient/strip)

可以发现之前在组件1的输入值还是存在的~~~

