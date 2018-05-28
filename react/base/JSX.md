# JSX

JSX即Javascript XML，它使用XML标记来创建虚拟DOM和声明组件。第02节的HelloWorld程序从本质上能完成所有的工作。只是有一些开发效率问题，比如JavaScript代码与标签混写在一起、缺乏模板支持等。而使用JSX，则可以有效解决这些问题。

### 加入JSX语法支持

如果要使用JSX语法的支持，你可以使用Babel来进行转换，你可以去网上提供的静态资源库引用（[http://www.bootcdn.cn/](http://www.bootcdn.cn/)），也可以自己下载。

重写HelloWorld

```html
<div id="reactContainer"></div>
<script src="../react.js"></script>
<script src="../react-dom.js"></script>
<script src="https://cdn.bootcss.com/babel-core/5.8.38/browser.js"></script>
<script type="text/babel">
    var HelloComponent =React.createClass({
        render:function(){
            return <h1>Hello World</h1>;
        }
    });

    ReactDOM.render(
        <HelloComponent/>,
        document.getElementById('reactContainer')
    )
</script>
```

通过上边的代码你可以发现JSX的好处。

* 可以使用熟悉的语法仿照HTML来定义虚拟DOM。
* 程序代码更加直观。
* 于JavaScript之间等价转换，代码更加直观。

### JSX中的表达式

JSX是支持表达式的，你只要使用{}括号，就可以使用表达式了。我们把HelloWorld程序改写成使用表达式的。

我们把上边的程序改写成带表达式的形式。

```js
var HelloComponent =React.createClass({
    render:function(){
        return <h1>Hello {this.props.name?this.props.name:'world'}</h1>;
    }
});

ReactDOM.render(
    <HelloComponent name="gershon"/>,
    document.getElementById('reactContainer')
)
```

需要注意的是表达式不支持if…else这样的语句，但是支持三元运算符和二元运算符。

### JSX上的数组输出

```js
 let names = ['Angular', 'React', 'Vue'];
 let HelloComponent = React.createClass({
      render: function () {
          return <div>
              {names.map((name) => <div key={name}>Hello,{name}!</div>)}
          </div>
      }
  });
 ReactDOM.render(<HelloComponent name="names"/>, document.getElementById('reactContainer'))
```

上边的代码，我们使用了ES6的语法maps来进行进行循环，循环时需要注意的是，新版本的React需要使用key，如果没有key虽然会出来效果，但是控制台会包错。key的作用是生成虚拟DOM时，需要使用key来进行标记,DOM更新时进行比较。

### 数组中的JSX

我们上边的例子是循环数组的内容到JSX中，其实在数组中可以直接使用JSX语法，看下面的例子。

```js
let arr=[
    <h1 key="1">Hello world!</h1>,
    <h2 key="2"> React is awesome</h2>
];
ReactDOM.render(
<div>{arr}</div>, document.getElementById('reactContainer') )
```

JSX允许直接在模版插入JavaScript变量。如果这个变量是一个数组，则会展开这个数组的所有成员。

