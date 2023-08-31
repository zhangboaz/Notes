## 什么是Node.js
Node.js是一个跨平台Javascript运行环境，使开发者可以搭建服务器端的Javascript应用程序
* 浏览器能执行JS代码，依靠的是内核中的V8引擎（C++程序）
* Node.js是基于Chrome V8引擎进行封装（运行环境）
* 都支持ECMAScript标准语法，Node.js有独立的API
* Node.js环境没有DOM和BOM等
### 作用
* 编写数据接口，提供网页资源浏览功能等等
* 前端工程化
## 前端工程化
开发项目直到上线，过程中集成的所有工具和技术
### 工具
* 压缩工具
* 格式化工具
* 转换工具
* 打包工具
* 脚手架工具
* ......
## fs模块-读写文件
封装了与本机文件系统进行交互的方法/属性
### 语法
1. 加载fs模块函数
   ```javascript
   const fs = require('fs') // fs是模块标识符：模块的名字
   ```
2. 写入文件内容
   ```javascript
   fs.writeFile('文件路径', '写入路径', err => {
    // 写入后的回调函数
   })
   ```
3. 读取文件内容
   ```javascript
   fs.readFile('文件路径', (err, data) => {
    // 读取后的回调函数
    // data 是文件内容的 Buffer 数据流
   })
   ```   
## path模块-路径处理
* 在Node.js代码中，使用绝对路径
* __dirname内置变量（获取当前模块目录-绝对路径）
* path.join()会使用特定于平台的分隔符，作为定界符，将所有给定的路径片段连接在一起
### 语法
1. 加载path模块
   ```javascript
   const path = require('path')
   ```
2. 使用path.join方法，拼接路径
   ```javascript
   path.join('路径1', '路径2', '路径3' ...)
   ```
## 压缩html
1. 读取源html文件内容
2. 正则替换字符串
3. 写入新的html文件中
## URL中的端口号
URL：统一资源定位符，简称网址，用于访问服务器里面的资源
端口号：标记服务器里不同功能的服务程序
端口号范围：0-65535之间的任意整数
* http协议，默认访问80端口
web服务程序：用于提供网上信息浏览功能
## http模块-创建Web服务
1. 加载http模块，创建Web服务对象
2. 监听request请求事件，设置响应头和响应体
3. 配置端口号并启动Web服务
4. 浏览器请求http://localhost:3000测试（localhost：固定代表本机的域名）
```javascript
const http = require('http')
const server = http.createServer()
// 监听request请求事件，设置请求头和响应头
server.on('request', (req, res) => {
    //设置响应头：
    res.setHeader('Content-Type', 'text/plain;charset=utf-8')
    // 设置响应内容，结束本次响应和请求
    res.end('您好，欢迎使用 node.js 创建的 Web 服务')
})
// 配置端口号并启动web服务
server.listen(3000, ()=> {
    console.log('web 服务已启动')
})
```
## 模块化
在Node.js中，每个文件都被视为一个单独的模块
* CommonJS标准语法（默认）
* ECMAScript标准语法
#### 概念
项目是由多个模块文件组成的
#### 好处
提高代码的复用性，按需加载，独立作用域
#### 使用
需要标准语法导出和导入使用
导出：`module.exports = {}`
导入：`require('模块名或路径')`
## ECMAScript标准-默认导出和导入
导出：`export default{}`
导入：`import 变量名 from '模块名或路径'`
需要新建package.json文件，并设置{"type":"module"}
## ECMAScript标准-命名导出和导入
导出：`export 修饰定义语句`
导入：`import {同名变量} from '模块名或路径'`
## 包
将模块，代码，其他资料聚合成一个文件夹
### 分类
* 项目包：主要用于编写项目和业务逻辑
* 软件包：封装工具和方法进行使用
* 根目录中，必须要有`package.json`文件（记录包的清单信息）
* 导入软件包时，引入的默认是`index.js`模块文件/main属性指定的模块文件
## npm-软件包管理器
### 使用
1. 初始化清单工具：`npm init -y`(得到package.json文件，有则略过此命令)
2. 下载软件包：`npm i 软件包名称`
3. 使用软件包
4. 删除软件包：`npm uni 软件包名称`
### 安装所有依赖
`npm i`:下载package.json中记录的所有软件包
### 全局软件包 nodemon
替代node命令，检测代码更改，自动重启程序
1. 安装：`npm i nodemon -g`(-g代表安装到全局环境中)
2. 运行：`nodemon 待执行的目标js文件`
