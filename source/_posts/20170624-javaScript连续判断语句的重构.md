---
title: javaScript连续判断语句的重构
date: 2017-06-24 09:59:46
categories:
---

## 主题
由if else、switch case探讨重构，旨在抛砖引玉。

## 现象
有人认为：if else多就多呗，只要可读性强，维护起来方便。这句话本身就存在矛盾。

## 举个例子
假使后台接口返回这种数据：

fruit: 0 // 0：苹果，1：香蕉，2：梨…

你需要根据fruit判断对应的水果名称

用if else写会是这样的：

```js
let currentFruit = ''
if(fruit === 0) {
    currentFruit = '苹果'
} else if(fruit === 1) {
    currentFruit = '香蕉'
} else if(fruit === 2) {
    currentFruit = '梨'
}
```

如果多增加几种水果，就要多写几条判断，这个时候就要考虑优化了。同样使用switch case也是复杂的，接下来我们看另一种实现：

```js
const _f = ['苹果','香蕉','梨']
const currentFruit = _f[fruit]
```

这种方法叫做表格驱动法，也叫hash表法。即字典、数据库。

## 优化分析

1. 优化if逻辑

把最可能出现的条件放在前面，把最不可能出现的条件放在后面，这样程序执行时总会按照条件的先后顺序逐一检测所有的条件，直到发现匹配的条件才会停止继续检测。if 中的条件体应该总是按照从最大概率到最小概率排列，以保证理论速度最快。

2. 关于switch case

switch和if else在性能上貌似是没有什么区别的，主要还是根据需求进行分析和选择。

- 如果条件较小的话选用if else比较合适。
- 相反，条件数量较大的话，就建议选用switch。

在大多数情况下，switch的性能不会比if else低。switch的确在实质上跟if else if 完全一样的效果，不过在很多情况下，使用switch要比if else方便不少。比如经典的值等分支，匹配一些状态常量的时候，比if else结构方便许多，不用反复写xx == yy。
