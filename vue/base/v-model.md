# v-model

## 介绍

```html
<input v-model="searchText">
// 等价于：
<input :value="searchText" @input="searchText = $event.target.value">
```

* `v-model` 默认绑定`value 属性`到标签中，且值为 v-model 的属性值 `searchText`
* `v-model` 默认在标签中自定义 `input事件`，且抛出值给v-model 的属性值 `searchText`
* ==》 这样便实现了数据的双向绑定

当用在组件上时，`v-model`则会这样：

```html
<my-input type="text" :value="msg" @input="msg = $event.target.value">
```

为了让它正常工作，这个组件内的`<input>`必须：

> * 将其`value`特性绑定到一个名叫`value`的 prop 上
> * 在其`input`事件被触发时，将新的值通过自定义的`input`事件抛出

## 先封装一个my-input组件

```vue
<template>
  <div>
    <input :value="value" @input="$emit('input', $event.target.value)">
  </div>
</template>

<script>
  export default {
    props: {
      value: String
    }
  }
</script>
```

使用引入后 

```html
<my-input v-model="msg"></my-input>
```

## model 属性

允许一个自定义组件在使用`v-model`时定制 prop 和 event。默认情况下，一个组件上的`v-model`会把`value`用作 prop 且把`input`用作 event，但是一些输入类型比如单选框和复选框按钮可能想使用`value`prop 来达到不同的目的。使用`model`选项可以回避这些情况产生的冲突。

## 封装一个checkbox

```vue
<template>
  <div>
    <input type="checkbox" :checked="checked" @change="$emit('change', !checked)"> {{label}}
  </div>
</template>

<script>
  export default {
    model: {
      prop: 'checked',
      event: 'change'
    },
    props: {
      label: String,
      checked: Boolean
    }
  }
</script>
```

```vue
<template>
  <div class="hello">
    {{fruit}}
    <my-checkbox v-model="fruit.apple" label="apple"></my-checkbox>
    <my-checkbox v-model="fruit.peach" label="peach"></my-checkbox>
  </div>
</template>

<script>
  import myCheckbox from './demo'

  export default {
    components: {myCheckbox},
    data() {
      return {
        msg: false,
        fruit: {
          apple: true,
          peach: false
        }
      }
    }
  }
</script>
```

## **在element-ui 中封装多一个 select**

```vue
<template>
  <el-select :value="value" @input="$emit('input', $event)">
    <el-option label="男" :value="1"></el-option>
    <el-option label="女" :value="2"></el-option>
  </el-select>
</template>

<script>
  export default {
    name: "my-select",
    props:['value']
  }
</script>
```

```js
<my-select v-model="msg"></my-select>
```



