# 基础知识

## 组件与模板

### 显示数据

#### 使用插值显示组件属性

要显示组件的属性，最简单的方式就是通过插值 (interpolation) 来绑定属性名。 要使用插值，就把属性名包裹在双花括号里放进视图模板，如 {{myHero}}。

#### 选择模板来源

@Component 元数据告诉 Angular 要到哪里去找该组件的模板。

* 可以使用 @Component 装饰器的 template 属性来定义内联模板。
* 可以把模板定义在单独的 HTML 文件中，并且让 @Component 装饰器的 templateUrl 属性指向该文件。

#### 初始化

```
export class AppComponent {
  title: string;
  myHero: string;

  constructor() {
    this.title = 'Tour of Heroes';
    this.myHero = 'Windstorm';
  }
}
```
可以用构造函数来代替这些属性的声明和初始化语句。

#### 添加循环遍历数据的逻辑

`*ngFor` 指令（Angular 预置）可以循环遍历数据。

```
<li *ngFor="let hero of heroes">
  {{ hero }}
</li>
```
注意看 `ngFor` 双引号表达式中的 `hero`，它是一个模板输入变量。Angular 把 `hero` 变量作为双花括号插值的上下文。

#### 通过 NgIf 进行条件显示

Angular 的 `ngIf` 指令会根据一个布尔条件来显示或移除一个元素。

> Angular 并不是在显示和隐藏这条消息，它是在从 DOM 中添加和移除这个段落元素。 这会提高性能，特别是在一些大的项目中有条件地包含或排除一大堆带着很多数据绑定的 HTML 时。


### 模板语法

重要的是要记住，**HTML Attribute** 和 **DOM Property** 是不同的，就算它们具有相同的名称也是如此。 在 Angular 中，**HTML Attribute** 的唯一作用是初始化元素和指令的状态。

*模板绑定使用的是 Property 和事件，而不是 Attribute。*

编写数据绑定时，你只是在和目标对象的 **DOM Property** 和事件打交道。

> 该通用规则可以帮助你建立 HTML Attribute 和 DOM Property 的思维模型： 属性负责初始化 DOM 属性，然后完工。Property 值可以改变；Attribute 值则不能。
> 
> 此规则有一个例外。 可以通过 setAttribute() 来更改 Attribute，接着它会重新初始化相应的 DOM 属性。

