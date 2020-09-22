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

#### 事件绑定

Angular 的事件绑定语法由等号左侧带圆括号的目标事件和右侧引号中的模板语句组成。 

##### 目标事件

```
<button (click)="onSave($event)">Save</button>
```

带 `on-` 前缀的备选形式，称之为**规范形式**：

```
<button on-click="onSave($event)">on-click Save</button>
```

元素事件可能是更常见的目标，但 Angular 会先看这个名字是否能匹配上已知指令的事件属性:

```
<h4>myClick is an event on the custom ClickDirective:</h4>
<button (myClick)="clickMessage=$event" clickable>click with myClick</button>
{{clickMessage}}
```

##### $event 和事件处理语句

绑定会通过名叫 `$event` 的事件对象传递关于此事件的信息（包括数据值）。

事件对象的形态取决于目标事件。如果目标事件是原生 DOM 元素事件， `$event` 就是 DOM 事件对象，它有像 `target` 和 `target.value` 这样的属性。

```
<input [value]="currentItem.name"
       (input)="currentItem.name=$event.target.value" >
without NgModel
```

##### 使用 EventEmitter 实现自定义事件

通常，指令使用 Angular `EventEmitter` 来触发自定义事件。 指令创建一个 `EventEmitter` 实例，并且把它作为属性暴露出来。 指令调用 `EventEmitter.emit(payload)` 来触发事件，可以传入任何东西作为消息载荷。 父指令通过绑定到这个属性来监听事件，并通过 `$event` 对象来访问载荷。

#### 双向绑定 [(...)]

##### 双向绑定的基础知识

双向绑定会做两件事：

* 设置特定的元素属性
* 监听元素的变更事件

`[()]` 语法很容易想明白：该元素具有名为 `x` 的可设置属性和名为 `xChange` 的相应事件。

双向绑定语法实际上是属性绑定和事件绑定的语法糖。

##### 表单中的双向绑定

#### 内置指令

Angular 提供了两种内置指令：属性型指令和结构型指令。

**内置属性型指令**

属性型指令会监听并修改其它 HTML 元素和组件的行为、Attribute 和 Property。

* NgClass —— 添加和删除一组 CSS 类
* NgStyle —— 添加和删除一组 HTML 样式
* NgModel —— 将数据双向绑定添加到 HTML 表单元素

通过分别绑定到 `<input>` 元素的 `value` 属性和 `input` 事件，可以达到同样的效果：

```
<label for="without">without NgModel:</label>
<input [value]="currentItem.name" (input)="currentItem.name=$event.target.value" id="without">
```

为了简化语法，`ngModel` 指令把技术细节隐藏在其输入属性 `ngModel` 和输出属性 `ngModelChange` 的后面：

```
<label for="example-change">(ngModelChange)="...name=$event":</label>
<input [ngModel]="currentItem.name" (ngModelChange)="currentItem.name=$event" id="example-change">
```

单独的 ngModel 绑定是对绑定到元素的原生属性方式的一种改进，但你可以使用 `[(ngModel)]` 语法来通过单个声明简化绑定：

```
<label for="example-ngModel">[(ngModel)]:</label>
<input [(ngModel)]="currentItem.name" id="example-ngModel">
```

此 `[(ngModel)]` 语法只能设置数据绑定属性。如果你要做得更多，可以编写扩展表单。例如，下面的代码将 `<input>` 值更改为大写：

```
<input [ngModel]="currentItem.name" (ngModelChange)="setUppercaseName($event)" id="example-uppercase">
```

**内置结构型指令**

结构型指令的职责是 HTML 布局。 它们塑造或重塑 DOM 的结构，这通常是通过添加、移除和操纵它们所附加到的宿主元素来实现的。

* NgIf —— 从模板中创建或销毁子视图
* NgFor —— 为列表中的每个条目重复渲染一个节点
* NgSwitch —— 一组在备用视图之间切换的指令

#### 模板引用变量（ #var ）

使用井号（`#`）声明模板引用变量。

```
<input #phone placeholder="phone number" />
```

可以在组件模板中的任何位置引用模板引用变量。

```
<input #phone placeholder="phone number" />

<!-- lots of other elements -->

<!-- phone refers to the input element; pass its `value` to an event handler -->
<button (click)="callPhone(phone.value)">Call</button>
```

也可以用 `ref-` 前缀代替 `#`。

#### 输入和输出属性

`@Input()` 和 `@Output()` 允许 Angular 在其父上下文和子指令或组件之间共享数据。`@Input()` 属性是可写的，而 `@Output()` 属性是可观察对象。

##### 如何使用 `@Input()`

在子组件中

要在子组件类中使用 `@Input()` 装饰器，首先导入 `Input`，然后使用 `@Input()` 来装饰一个属性：

```
import { Component, Input } from '@angular/core'; // First, import Input
export class ItemDetailComponent {
  @Input() item: string; // decorate the property with @Input()
}
```

在父组件中

在父组件的模板中绑定该属性。

首先，使用子组件的选择器作为父组件模板中的指令。然后，使用属性绑定将子组件中的属性绑定到父组件中的属性。

```
<app-item-detail [item]="currentItem"></app-item-detail>
```

接下来，在父组件类 `app.component.ts` 中，为 `currentItem` 指定一个值：

```
export class AppComponent {
  currentItem = 'Television';
}
```

方括号 `[] `中的目标是子组件中带有 `@Input()` 装饰器的属性。绑定源（等号右边的部分）是父组件要传给内嵌组件的数据。

关键是，当要在父组件中绑定到子组件中的属性（即方括号中的内容）时，必须在子组件中使用 `@Input()` 来装饰该属性。

##### 如何使用 `@Output()`

在子组件或指令中使用 `@Output()`装饰器，允许数据从子级流出到父级。

通常应将 `@Output()` 属性初始化为 Angular `EventEmitter`，并将值作为事件从组件中向外流出。

像 `@Input()` 一样，也要在子组件的属性上使用 `@Output()`，但其类型为 `EventEmitter`。

`@Output()`将子组件中的属性标记为一扇门，数据可以通过这扇门从子组件传到父组件。 然后，子组件必须引发一个事件，以便父组件知道发生了某些变化。为了引发事件，`@Output()`要和 `EventEmitter` **配合使用**，`EventEmitter` 是 `@angular/core` 中的一个类，用于发出自定义事件。

在子组件中

首先，确保在子组件类中导入 `Output` 和 `EventEmitter` ：

```
import { Output, EventEmitter } from '@angular/core';
```

接下来，仍然在子组件中，使用组件类中的 `@Output()` 装饰属性。下面例子中的 `@Output()` 名叫 `newItemEvent`，其类型是 `EventEmitter`，这表示它是一个事件。

```
@Output() newItemEvent = new EventEmitter<string>();
```

接下来，在同一个组件类中创建一个 `addNewItem()` 方法：

```
export class ItemOutputComponent {

  @Output() newItemEvent = new EventEmitter<string>();

  addNewItem(value: string) {
    this.newItemEvent.emit(value);
  }
}
```

`addNewItem()` 函数使用 `@Output()` `newItemEvent` 引发一个事件。

```
<label>Add an item: <input #newItem></label>
<button (click)="addNewItem(newItem.value)">Add to parent's list</button>
```

在父组件中

在父组件的模板中，将父组件的方法绑定到子组件的事件。

```
<app-item-output (newItemEvent)="addItem($event)"></app-item-output>
```

事件绑定 `(newItemEvent)='addItem($event)'` 告诉 Angular 将子组件的 `newItemEvent` 事件连接到父组件中的方法 `addItem()`，以及将子组件通知父组件的事件作为 `addItem()` 的参数。

`$event` 包含用户在子模板 UI 中键入到 `<input>` 中的数据。

#### `@Input()` 和 `@Output()` 在一起

```
<app-input-output [item]="currentItem" (deleteRequest)="crossOffItem($event)"></app-input-output>
```

目标 `item` 是子组件类中的 `@Input()` 属性，它从父组件的属性 `currentItem` 中接收值。当你单击删除时，子组件将引发事件 `deleteRequest`，它携带的值将作为父组件的 `crossOffItem()` 方法的参数。

#### `@Input()` 和 `@Output()` 声明

还可以在指令元数据的 `inputs` 和 `outputs` 数组中标出这些成员，而不是使用 `@Input()` 和 `@Output()` 装饰器来声明输入和输出。

```
// tslint:disable: no-inputs-metadata-property no-outputs-metadata-property
inputs: ['clearanceItem'],
outputs: ['buyEvent']
// tslint:enable: no-inputs-metadata-property no-outputs-metadata-property
```

#### 为输入和输出指定别名

##### 元数据中的别名

要在元数据中为输入和输出指定别名，使用冒号分隔`（:）`的字符串，其左边是属性名，右边是别名：

```
// tslint:disable: no-inputs-metadata-property no-outputs-metadata-property
inputs: ['input1: saveForLaterItem'], // propertyName:alias
outputs: ['outputEvent1: saveForLaterEvent']
// tslint:disable: no-inputs-metadata-property no-outputs-metadata-property
```

##### 使用 `@Input()` / `@Output()` 装饰器指定别名

可以通过将别名传给 `@Input()` / `@Output()` 装饰器来为属性名指定别名。其内部名称保持不变。

```
@Input('wishListItem') input2: string; //  @Input(alias)
@Output('wishEvent') outputEvent2 = new EventEmitter<string>(); //  @Output(alias) propertyName = ...
```

#### 模板表达式中的运算符

* 管道
* 安全导航运算符
* 非空断言运算符

##### 管道运算符（ `|` ）

管道是简单的函数，它们接受输入值并返回转换后的值。使用管道运算符（`|`）。还可以通过多个管道串联表达式。

`json` 管道对调试绑定特别有用：

```
<p>Item json pipe: {{item | json}}</p>
```

生成的输出如下所示：

```
{ "name": "Telephone",
  "manufactureDate": "1980-02-25T05:00:00.000Z",
  "price": 98 
}
```

> 管道运算符的优先级比三元运算符（ ?: ）高，这意味着 a ? b : c | x 将被解析为 a ? b : (c | x)。

##### 安全导航运算符（ `?` ）和空属性路径

安全导航运算符 `?` 可以对在属性路径中出现 null 和 undefined 值进行保护。

```
<p>The item name is: {{item?.name}}</p>
```

没有安全导航运算符，并且 `item` 为 `null`，会引发空指针错误并中断的渲染过程。

##### 非空断言运算符（`!`）

#### 内置模板函数

##### 类型转换函数 `$any()`

#### 模板中的 SVG

可以将 SVG 用作 Angular 中的有效模板。

当你使用 SVG 作为模板时，就可以像 HTML 模板一样使用指令和绑定。意味着能够动态生成交互式图形。

### 用户输入

当用户点击链接、按下按钮或者输入文字时，这些用户动作都会产生 `DOM` 事件。

#### 绑定到用户输入事件

使用 Angular 事件绑定机制来响应任何 DOM 事件。要绑定 DOM 事件，把 `DOM 事件`的名字包裹在`圆括号`中，然后用放在`引号`中的`模板语句`对它赋值。

```
<button (click)="onClickMe()">Click me!</button>
```

绑定时，需要知道模板语句的`执行上下文`，出现在模板语句中的每个标识符都属于`特定的上下文对象`。这个对象通常都是控制此模板的 Angular 组件。

#### 通过 `$event` 对象取得用户输入

代码监听 `keyup` 事件，并将整个`事件载荷 ($event)` 传给组件的事件处理器。

```
<input (keyup)="onKey($event)">
<p>{{values}}</p>
```

Angular 在 `$event` 变量提供一个相应的 `DOM 事件对象`。`$event` 对象的属性取决于 `DOM 事件的类型`。

所有`标准 DOM 事件对象`都有一个 `target` 属性， 引用触发该事件的元素。 在本例中，`target` 是`<input>` 元素， `event.target.value` 返回该元素的当前内容。

##### `$event`的类型

`$event` 转换为 `any` 类型。 这样简化了代码，但是有成本。

##### 传入 `$event` 是靠不住的做法

反对把整个 `DOM` 事件传到方法中，因为这样组件会知道太多模板的信息。 只有当它知道更多它本不应了解的 HTML 实现细节时，它才能提取信息。 这就违反了模板（用户看到的）和组件（应用如何处理用户数据）之间的`分离关注原则`。

#### 从一个模板引用变量中获得用户输入

 在标识符前加上井号 (`#`) 就能声明一个模板引用变量。

 > 除非绑定一个事件，否则这将完全无法工作。

组件代码从视图中获得了干净的数据值。不用了解 `$event` 变量及其结构。

#### 按键事件过滤（通过 `key.enter`）

绑定到 Angular 的 `keyup.enter` 模拟事件。只有当用户敲回车键时，Angular 才会调用事件处理器。

失去焦点事件 `(blur)`

```
<input #newHero
      (keyup.enter)="addHero(newHero.value)"
      (blur)="addHero(newHero.value); newHero.value='' ">

```

保持模板语句简单 — `(blur)` 事件被绑定到两个 JavaScript 语句。 第一句调用 `addHero`。第二句 `newHero.value=''` 在添加新英雄到列表中后清除输入框。

### 属性型指令

属性型指令用于改变一个 DOM 元素的外观或行为。

#### 指令概览

* 组件 — 拥有模板的指令
* 结构型指令 — 通过添加和移除 DOM 元素改变 DOM 布局的指令
* 属性型指令 — 改变元素、组件或其它指令的外观和行为的指令

属性型指令至少需要一个带有 `@Directive` 装饰器的控制器类。

```
ng generate directive highlight
```

这里导入的 `Directive` 符号提供了 Angular 的 `@Directive` 装饰器。

```
import { Directive } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  constructor() { }
}
```

方括号(`[]`)表示它的属性型选择器。 Angular 会在模板中定位每个拥有名叫 `appHighlight` 属性的元素，并且为这些元素加上本指令的逻辑。

紧跟在 `@Directive` 元数据之后的就是该指令的`控制器类`，名叫 `HighlightDirective`，它包含了该指令的逻辑（目前为空逻辑）。

在指令的构造函数中使用 `ElementRef` 来注入`宿主 DOM 元素`的引用，也就是你放置 `appHighlight` 的那个元素。

`ElementRef` 通过其 `nativeElement` 属性给你了直接访问`宿主 DOM 元素`的能力。

#### 使用属性型指令

```
<p appHighlight>Highlight me!</p>
```

#### 响应用户引发的事件

使用 `HostListener` 装饰器添加两个事件处理器，会在鼠标进入或离开时进行响应。

```
@HostListener('mouseenter') onMouseEnter() {
  this.highlight('yellow');
}

@HostListener('mouseleave') onMouseLeave() {
  this.highlight(null);
}

private highlight(color: string) {
  this.el.nativeElement.style.backgroundColor = color;
}
```

#### 使用 `@Input` 数据绑定向指令传递值

```
@Input() highlightColor: string;
```

##### 绑定到 `@Input` 属性

```
<p appHighlight highlightColor="yellow">Highlighted in yellow</p>
<p appHighlight [highlightColor]="'orange'">Highlighted in orange</p>
```

##### 绑定到 `@Input` 别名

```
@Input('appHighlight') highlightColor: string;
```

在指令内部，该属性叫 `highlightColor`，在外部，你绑定到它地方，它叫 `appHighlight`。

#### 为什么要加`@Input`？

`@Input` 装饰器都告诉 Angular，该属性是`公共`的，并且能被父组件绑定。 如果没有 `@Input`，Angular 就会拒绝绑定到该属性。

 Angular 把组件的模板看做从属于该组件的。 组件和它的模板默认会相互信任。 意味着组件自己的模板可以绑定到组件的任意属性，无论是否使用了 `@Input` 装饰器。

 但组件或指令不应该盲目的信任其它组件或指令。 因此组件或指令的属性默认是不能被绑定的。 

 从 Angular 绑定机制的角度来看，它们是`私有`的，而当添加了 `@Input` 时，Angular 绑定机制才会把它们当成公共的。 只有这样，它们才能被其它组件或属性绑定。

 可以根据属性名在绑定中出现的位置来判定是否要加 `@Input`:

 * 当它出现在等号右侧的模板表达式中时，它属于模板所在的组件，不需要 `@Input` 装饰器。
 * 当它出现在等号左边的方括号（`[ ]`）中时，该属性属于其它组件或指令，它必须带有 `@Input` 装饰器。

 ```
 <p [appHighlight]="color">Highlight me!</p>
 ```

 * `color` 属性位于右侧的绑定表达式中，它属于模板所在的组件。 该模板和组件相互信任。因此 `color` 不需要 `@Input` 装饰器。
 * `appHighlight` 属性位于左侧，它引用了 `HighlightDirective` 中一个带别名的属性，它不是模板所属组件的一部分，因此存在信任问题。 所以，该属性必须带 `@Input` 装饰器。

 










