## 什么是Node.js
Node.js是一个跨平台Javascript运行环境，使开发者可以搭建服务器端的Javascript应用程序
* 浏览器能执行JS代码，依靠的是内核中的V8引擎（C++程序）
* Node.js是基于Chrome V8引擎进行封装（运行环境）
* 都支持ECMAScript标准语法，Node.js有独立的API
* Node.js环境没有DOM和BOM的API，可以使用console和定时器API
* Node.js中的顶级对象为global,也可以用globalThis访问顶级对象
## Node.js作用
1. 开发服务器应用
2. 开发工具类应用 (Webpack, Vite, Babel 都是借助Node.js开发的)
3. 开发桌面端应用 (VSCode, Figma, Postman 都是由electron框架借助Node.js开发的)
## Node.js下载安装
官网：`https://nodejs.org/`
检测安装：`node -v`
## Node.js初步使用
运行js代码:`node js文件`