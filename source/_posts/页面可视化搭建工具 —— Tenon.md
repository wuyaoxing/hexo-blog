---
title: 页面可视化搭建工具 —— Tenon
date: 2019-03-09 10:10:18
tags:
---

## 缘起

目前就职的公司，有项目定制快速开发界面需求，为满足客户，经过1～2年的技术积累，沉淀出了界面设计器（页面可视化搭建工具）。 设计器代码由requirejs + jquery组成，随着业务不断扩展，为满足客户不定性需求，设计器代码越来越臃肿，代码扩展和后续维护都面临着牵一发而动全身的挑战。 在需求不断演进、技术不断革新的同时，用户体验要求也越来越高，因此我们开始了对整个产品线包括设计器在内的重构。

**Tenon** 多半是利用业余时间，经由技术预研和个人想法实践而诞生。
期间踩坑、填坑，不断推翻重来，有难度也有挑战。

## 名称由来

**Tenon**，取自 mortise and tenon（	卯榫）。

由木工卯榫结构（tenon structure）启发，在规则内保持灵活性。  
榫卯作为一种传统工艺是一种文化，也代表着一种工匠精神，更是一种精致的生活体现~

## 需求分类

- 静态页面
- 固定业务逻辑页面
- 定制页面

前端页面需求可以分为这么三类。  
对于定制页面，只要用户支付定制费，我们不吝啬开发，但在业务稳定的情况下界面设计器能极大地提高效率。  
这也是可视化工具的初衷之一。

## 分析问题

**页面构成**

HTML DOM 树：

![HTML DOM Tree](http://www.w3school.com.cn/i/ct_htmltree.gif)

设计器的操作对象是页面。  

页面是一份 HTML 文档。  
HTML 使用一种树形结构来表示页面。  
树的每个节点为一个页面元素或文本节点。  
一个页面元素可以包含多个页面元素节点或文本节点。  
页面元素通常称为标签。  
标签类型由 HTML 规范定义。

![页面构成](/images/tenon/page.png)

- page = HTML Tree + Data + Dynamic Logic（动态逻辑）

HTML Tree 是页面元素的树形结构，  
Data 是页面元素的属性或文本节点，  
Dynamic Logic是使用js对页面修改和控制。

组件化时代 Component Tree 相当于 HTML Tree。

代码编辑器（IDE）本质上是对HTML Tree, Data 和 Dynamic Logic增删和修改。

设计器是不要求使用者具有编程基础，使用可视化交互的方式通过拖拉、填表或编写代码实现页面可视化编辑的软件工具（可视化IDE）。

**四个维度**

- HTML Tree 编辑
    - 布局灵活，高度自由（元素、结构、样式、数据）
    - 交互简单
    - 不涉及业务逻辑
- Component Tree 编辑
    - 以组件为核心，快速迭代开发
    - 业务逻辑强耦合，复用程度高
- 页面 Data 编辑
    - 样式、图片url、文本以及组件提供的属性等
- Dynamic Logic 编辑
    - 可编写代码，实现复杂业务逻辑

设计器提供的能力是编辑页面组成部分之一或多部分。

**编辑自由度**

- html元素
    - 可编辑的元素丰富
    - 页面结构灵活
    - 可视化编辑效率较低
    - 业务逻辑封装度较低
- 组件
    - 可编辑的元素依赖设计器提供的组件
    - 可视化编辑效率较高
    - 业务逻辑封装度较高

编辑自由度, 是指页面可编辑单元的粒度。

**布局方式**

- 定位布局
    - 页面结构单一
    - 组件位置固定，不容易支持自适应布局
- 嵌套布局
    - 页面结构灵活
    - 支持自适应展示布局

关于设计器的实现，有嵌套和无嵌套两种布局方案。  
在满足其业务需求的前提下，无论哪种实现，都是革命性的突破。  
若是将两者结合，并遵循**所见即所得**的设计方式，或许是一种新的思路。

定位布局是一种无嵌套布局，只需父元素设置`position: relation`属性便能实现拖拽组件生成页面。

要满足嵌套布局，需要有嵌套布局容器组件。  
嵌套布局容器组件（NestedLayoutContainer）是一个支持嵌套布局的组件。可插入特定组件（嵌套布局容器组件、定位布局容器组件、导航组件、视图组件等），并支持特定组件排序和属性设置（高度、宽度、对齐方式等）。

要支持定位布局嵌入嵌套布局，需要有定位布局容器组件。  
定位布局容器组件（PositionLayoutContainer）是一个支持无嵌套定位布局、且支持插入嵌套布局容器组件的组件。可插入无嵌套组件并限制最大拖动范围，即定位布局容器组件是无嵌套组件的父级。

## 架构设计

**愿景**

- 内容可配置，页面结构可配置，逻辑可配置
- what you see is what you get

**定位**

- 目标
    - 快速搭建页面
    - 降低门槛
    - 提高效率
    - 便于后期实施人员维护
- 体验
    - 易用性
    - 高效性
    - 可维护性
    - 页面呈现一致性

**平台支持**

- pc
- iPad
- mobile

开发自适应组件以支持不同平台展示，没必要为不同平台单独定制项目。

**视图布局**

![项目](/images/tenon/project.png)

**核心理念**

![核心理念](/images/tenon/idea.png)

**组件**

![组件中心](/images/tenon/component.png)

组件是对HTML元素、样式布局、业务逻辑的封装。

**数据**

- 配置数据
    - css级别
        - 字体属性
        - 文本属性
        - 背景属性
        - 容器属性
        - 边框属性
        - 列表属性
        - 定位属性
        - 鼠标属性
    - 组件级别

对配置数据的描述，使用JSON格式，并遵循 [JSON Schema](https://json-schema.org/) 规范。


例如对边框属性的描述JSON Schema为：

```
const borderSchema = {
    title: 'border',
    type: 'object',
    properties: {
        borderWidth: {
            description: '边框宽度',
            type: 'number',
            minimum: 0,
            format: 'number',
        },
        borderRadius: {
            description: '边框圆角',
            type: 'number',
            minimum: 0,
            format: 'number',
        },
        borderStyle: {
            description: '边框样式',
            type: 'string',
            enum: [
                {
                    text: 'none',
                    value: 'none'
                },
                {
                    text: 'solid',
                    value: 'solid'
                },
                {
                    text: 'dashed',
                    value: 'dashed'
                },
                {
                    text: 'dotted',
                    value: 'dotted'
                },
                {
                    text: 'double',
                    value: 'double'
                },
            ],
            format: 'select',
        },
        borderColor: {
            description: '边框颜色',
            type: 'string',
            format: 'color',
        },
    },
}
```
使用 [JSON Schema](https://json-schema.org/) 描述组件有以下几点好处：

- 配置数据校验，避免编辑错误
- 生成属性编辑区域
- 组件与配置数据解耦
- 组件与设计器解耦
- 数据趋于标准化，降低后期维护的差异性

组件可以按照JSON Schema规范描述其支持的配置数据。  
此时组件是一个独立的整体，可在任何地方使用。

**解析器**

- 页面数据结构

![页面数据结构](/images/tenon/page-data.png)

- 解析引擎

![解析引擎](/images/tenon/engine.png)

**简单流程原理示意图**

![简单流程原理示意图](/images/tenon/sketch-map.png)

**事件机制**

- 组件A -> emit -> EventCenter -> on -> 组件B

**复合组件**

使用已有组件创建新的组件。

**Dynamic Logic**

组件级别，可编写代码，实现业务逻辑。

## 展望未来

## 结语

时常思考这样几个问题

- 为什么要做设计器以及做设计器的初衷是什么
- 谁是使用者
- 产品的定位和发展方向

也许正如知乎网友所言：做的到可视化工具，做好可视化工具很难。

## References

- 页面可视化搭建工具前生今世（https://github.com/CntChen/cntchen.github.io/issues/15）
- json-schema（https://json-schema.org/）
- pipeline（https://github.com/page-pipepline）
- VvvebJs（http://www.vvveb.com/vvvebjs/editor.html）

## 快速体验

![tenon-designer](/images/tenon/tenon-designer.png)

**[Tenon](https://wuyaoxing.github.io/tenon)**

----
