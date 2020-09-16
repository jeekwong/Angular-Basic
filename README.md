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

从使用模型-视图-控制器 (MVC) 或模型-视图-视图模型 (MVVM) 的经验中，了解组件和模板这两个概念。 在 Angular 中，组件扮演着控制器或视图模型的角色，模板则扮演视图的角色。

#### 模板中的 HTML

可以通过组件和指令来扩展模板中的 HTML 词汇。它们看上去就是新元素和属性。

#### 插值与模板表达式

##### 插值 {{...}}

所谓 "插值" 是指将表达式嵌入到标记文本中。 默认情况下，插值会用双花括号 {{ 和 }} 作为分隔符。

花括号之间的文本通常是组件属性的名字。

> 看上去似乎正在将结果插入元素标签之间，并将其赋值给属性。 但实际上，插值是一种特殊语法，Angular 会将其转换为属性绑定。

##### 模板表达式

模板表达式会产生一个值，并出现在双花括号 {{ }} 中。 Angular 执行这个表达式，并把它赋值给绑定目标的属性，这个绑定目标可能是 HTML 元素、组件或指令。

在属性绑定中会再次看到模板表达式，它出现在 = 右侧的引号中，就像这样：

```
[property] = "expression";
```

##### 表达式上下文

典型的表达式上下文就是这个组件实例，它是各种绑定值的来源。

表达式也可以引用模板中的上下文属性，例如模板输入变量:

`let customer`
```
<ul>
  <li *ngFor="let customer of customers">{{customer.name}}</li>
</ul>
```
`#customerInput`
```
<label>Type something:
  <input #customerInput>{{customerInput.value}}
</label>
```

表达式中的上下文变量是由模板变量、指令的上下文变量（如果有）和组件的成员叠加而成的。

##### 表达式使用指南

属性名或方法调用应该是常态，但偶然使用逻辑取反 ! 也是可以的。 其它情况下，应该把应用程序和业务逻辑限制在组件中，这样它才能更容易开发和测试。

#### 模板语句

模板语句用来响应由绑定目标（如 HTML 元素、组件或指令）触发的事件。

##### 语句上下文

和表达式中一样，语句只能引用语句上下文中 —— 通常是正在绑定事件的那个组件实例。

典型的语句上下文就是当前组件的实例。 `(click)="deleteHero()"` 中的 deleteHero 就是这个数据绑定组件上的一个方法。

```
<button (click)="deleteHero()">Delete hero</button>
```

语句上下文可以引用模板自身上下文中的属性。 在下面的例子中，就把模板的 `$event` 对象、模板输入变量 `(let hero)`和模板引用变量 `(#heroForm)`传给了组件中的一个事件处理器方法。

```
<button (click)="onSave($event)">Save</button>
<button *ngFor="let hero of heroes" (click)="deleteHero(hero)">{{hero.name}}</button>
<form #heroForm (ngSubmit)="onSubmit(heroForm)"> ... </form>
```

##### 语句指南

模板语句不能引用全局命名空间的任何东西。比如不能引用 `window` 或 `document`，也不能调用 `console.log` 或 `Math.max`。

和表达式一样，避免写复杂的模板语句。 常规是函数调用或者属性赋值。

#### 绑定语法：概览

Angular 提供了多种数据绑定方式。绑定类型可以分为三类，按数据流的方向分为：

* 从数据源到视图
* 从视图到数据源
* 双向：视图到数据源到视图

除`插值`以外的其它绑定类型在等号的左侧都有一个“目标名称”，由绑定符 `[]` 或 `()` 包起来， 或者带有前缀：`bind-`，`on-`，`bindon-`。

绑定的“目标”是绑定符内部的属性或事件：`[]`、`()` 或 `[()]`。

##### 数据绑定与 HTML

```
<!-- Bind button disabled state to `isUnchanged` property -->
<button [disabled]="isUnchanged">Save</button>
//isUnchanged 在组件中为 true 或 false
```

> 绑定到的是按钮的 DOM 元素的 disabled 这个 Property，而不是 Attribute。 这是数据绑定的通用规则。数据绑定使用 DOM 元素、组件和指令的 Property，而不是 HTML 的Attribute。

##### HTML attribute 与 DOM property 的对比

**Attribute 是由 HTML 定义的。Property 是从 DOM（文档对象模型）节点访问的。**

重要的是要记住，`HTML Attribute` 和 `DOM Property` 是不同的，就算它们具有相同的名称也是如此。 在 Angular 中，HTML Attribute 的唯一作用是初始化元素和指令的状态。

**模板绑定使用的是 Property 和事件，而不是 Attribute。**

**编写数据绑定时，你只是在和目标对象的 DOM Property 和事件打交道。**

> 该通用规则可以帮助你建立 HTML Attribute 和 DOM Property 的思维模型： 属性负责初始化 DOM 属性，然后完工。Property 值可以改变；Attribute 值则不能。
> 此规则有一个例外。 可以通过 setAttribute() 来更改 Attribute，接着它会重新初始化相应的 DOM 属性。

#### 绑定类型与绑定目标

数据绑定的目标是 DOM 中的对象。 根据绑定类型，该目标可以是 `Property 名（元素、组件或指令的）`、`事件名（元素、组件或指令的）`，有时是 `Attribute `名。

* 属性
    ```
    // 元素的 property src
    <img [src]="heroImageUrl">
    // 组件的 property hero
    <app-hero-detail [hero]="currentHero"></app-hero-detail>
    // 指令的 property
    <div [ngClass]="{'special': isSpecial}"></div>
    ```
* 事件
    ```
    // 元素的事件 click
    <button (click)="onSave()">Save</button>
    // 组件的事件 deleteRequest
    <app-hero-detail (deleteRequest)="deleteHero()"></app-hero-detail>
    // 指令的事件 myClick
    <div (myClick)="clicked=$event" clickable>click me</div>
    ```
* 双向
    ```
    // 事件与 property
    <input [(ngModel)]="name">
    ```

#### Property 绑定 [property]

##### 单向输入

Property 绑定的值在一个方向上流动，从组件的 Property 变为目标元素的 Property。

最常见的 Property 绑定将元素的 Property 设置为组件的 Property 值。

##### 绑定目标

包裹在方括号中的元素属性名标记着目标属性。

下列代码中的目标属性是 image 元素的 src 属性。
```
<img [src]="itemImageUrl">
```
还有一种使用 bind- 前缀的替代方案：
```
<img bind-src="itemImageUrl">
```

元素属性可能是最常见的绑定目标，但 Angular 会先去看这个名字是否是某个已知指令的属性名，就像下面的例子中一样：

```
<p [ngClass]="classes">[ngClass] binding to the classes property making this blue</p>
```

##### 返回正确的类型

模板表达式的计算结果应该是目标属性所需要的值类型。

##### 传入对象

##### 别忘了方括号

方括号 [] 告诉 Angular 计算该模板表达式。如果省略括号，Angular 会将字符串视为常量，并使用该字符串初始化目标属性。

##### 一次性字符串初始化

当满足下列条件时，应该省略括号：

* 目标属性接受字符串值。
* 字符串是一个固定值，你可以直接将其放入模板中。
* 这个初始值永不改变。

##### 属性绑定与插值

通常得在插值和属性绑定之间做出选择。 下列这几对绑定做的事情完全相同：

```
<p><img src="{{itemImageUrl}}"> is the <i>interpolated</i> image.</p>
<p><img [src]="itemImageUrl"> is the <i>property bound</i> image.</p>

<p><span>"{{interpolationTitle}}" is the <i>interpolated</i> title.</span></p>
<p>"<span [innerHTML]="propertyTitle"></span>" is the <i>property bound</i> title.</p>
```

在许多情况下，插值是属性绑定的便捷替代法。当要把数据值渲染为字符串时，虽然可读性方面倾向于插值，但没有技术上的理由偏爱一种形式。但是，**将元素属性设置为非字符串的数据值时，必须使用属性绑定**。

#### attribute、class 和 style 绑定

##### attribute 绑定

可以直接使用 Attribute 绑定设置 Attribute 的值。一般来说，绑定时设置的是目标的 Property，而 Attribute 绑定是唯一的例外，它创建和设置的是 Attribute。

Attribute 绑定的语法类似于 Property 绑定，但其括号之间不是元素的 Property，而是由前缀 attr、点（ . ）和 Attribute 名称组成。

##### 类绑定

##### 样式绑定

#### //todo 事件绑定

