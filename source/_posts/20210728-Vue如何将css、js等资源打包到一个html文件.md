---
title: Vue 如何将 css、js 等资源打包到一个 html 文件
date: 2021-07-28 20:50:02
categories:
  - 技术分享
---

书接上文，{% post_link 20210722-Vue如何压缩打包后的文件大小 %}

某日，后端开发言，
若能将 css、js 等文件打包到一个 `html`便好。

问其原因，
得知由于控制卡限制，后端对前端资源请求做了一层包装，
导致浏览器有时响应超时，页面加载错误。

回想当年，初识编程，页面便是杂糅在一起，不分彼此。
如今，各种工程化、自动化等技术层出不穷，带动整个行业的发展。
不得不感叹技术迭代之迅速！

言回正题，为了在 Vue 中将 css、js 等资源打包到一个 html，
于是找到了 [html-webpack-inline-source-plugin](https://github.com/DustinJackson/html-webpack-inline-source-plugin) 插件，
需要与 [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) 配合使用。

**Show Code**

安装

> yarn add html-webpack-plugin html-webpack-inline-source-plugin --dev

vue.config.js 配置

```js
const HtmlWebpackPlugin = require("html-webpack-plugin")
const HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin")

module.exports = {
  configureWebpack: {
    plugins: [
      new HtmlWebpackPlugin({
        title: "title",
        inlineSource: ".(js|css)$", // 将哪些文件嵌入到 html
        template: "./public/index.html", // 可以提供模板
      }),
      new HtmlWebpackInlineSourcePlugin(), // 直接使用
    ],
  },
}
```

由于插件不同版本之间存在兼容问题，打包会报错，故对插件使用固定版本

- html-webpack-inline-source-plugin: 0.0.10
- html-webpack-plugin: 3.2.0

更多参数可以参考 [html-webpack-inline-source-plugin](https://github.com/DustinJackson/html-webpack-inline-source-plugin)。

配合前文提到的压缩插件使用，输出一个包含 css、js 等资源的 `gzip` 格式 `html` 文件。
