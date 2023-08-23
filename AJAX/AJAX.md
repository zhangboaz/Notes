## URL
* 统一资源定位符
* 简称网址
#### 组成
* 协议://域名/资源路径
* 协议：如http协议，规定浏览器和服务器之间传输数据的格式
* 域名：标记服务器在互联网中的方位
* 资源路径：标记资源在服务器下的具体位置
#### 查询参数
* 浏览器提供给服务器的额外信息，让服务器返回浏览器想要的参数
##### 语法
* http://xxxx.com/xxx/xxx?参数名1=值1&参数名2=值2
## axios使用
1. 引入axios.js:https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js
2. 使用axiox函数
   * 传入配置对象
   * 再用.then回调函数接收结果，并做后续处理
   ```javascript
   axios({
      url:'目标资源地址'
   }).then((result) => {
      //对服务器返回的数据做后续处理
   })
   ```
#### axios查询参数
```javascript
axios({
   url:'目标资源地址'
   params:{
      参数名:值
   }
}).then((result) => {
   //对服务器返回的数据做后续处理
})
```
#### 请求设置
* url：请求的url网址
* method：请求的方法，GET可以省略（不区分大小写）
* data：提交数据
#### 错误处理
* 用更直观的方式，给普通用户展示错误信息
##### 语法
* 在then方法的后面，通过点语法调用catch方法，传入回调参数并定义形参
```javascript
axios({
   //请求选项
}),then(result => {
   //处理数据
}).catch(error => {
   //处理错误
})
```
## 常用请求方法
#### 请求方法
对服务器资源，要执行的操作
* GET 获取数据
* POST 提交数据
  * 当数据需要在服务器上保存
* PUT 修改数据（全部）
* DELETE 删除数据
* PATCH 修改数据（部分）
## HTTP协议-报文
#### HTTP协议
* 规定了浏览器发送及服务器返回内容的格式
#### 请求报文
* 浏览器按照HTTP协议要求的格式，，发送给服务器的内容
#### 响应报文
* 服务器按照HTTP协议要求的格式，返回给浏览器的内容
#### 请求报文组成部分
1. 请求行：请求方法，URL，协议
2. 请求头：以键值对的格式携带的附加信息，比如：Content-Type
3. 空行：分割请求头，空行之后的是发送给服务器的资源
4. 请求体：发送的资源
#### 响应报文组成部分
1. 响应行（状态行）：协议、HTTP响应状态码、状态信息
2. 响应头：以键值对的格式携带的附加信息，比如：Content-Type
3. 空行：分割响应头，空行之后的是服务器返回的资源
4. 响应体：返回的资源
#### HTTP响应状态码
* 1xx 信息
* 2xx 成功
* 3xx 重定向信息
* 4xx 客户端错误
* 5xx 服务端错误
## 接口文档
* 描述接口的文章
#### 接口
* 使用AJAX和服务器通讯时，使用的URL，请求方法，以及参数
## form-serialize插件
#### 作用
* 快速收集表单元素的值
#### 语法
```javascript
const form = document.querySelector('form')
const data = serialize(form, {hash: true, empty: true})
const {uname, pwd} = data //对象解构赋值
```
* hash 设置获取数据结构
  * true JS对象
  * false 查询字符串
* empty 设置是否获取空值
  * true 获取空值
  * false 不获取空值
## 图片上传
1. 获取图片文件对象
2. 使用`FormData`携带图片文件
   ```javascript
   const fd = new FormData()
   fd.append(参数名, 值)
   ```
3. 提交表单数据到服务器使用图片url网址
## AJAX原理
### XMLHttpRequest
XMLHttpRequest（XHR）对象用于与服务器交互
* `axios`内部采用`XMLHttpRequest`与服务器交互
#### XMLHttpRequest使用
1. 创建`XMLHttpRequest`对象
2. 配置请求方法和请求url网址
3. 监听`loadend`事件，接收响应结果
4. 发起请求
```javascript
const xhr = new XMLHttpRequest()
xhr.open('请求方法', '请求url网址')
xhr.addEventListener('loadend', () => {
    // 响应结果
    console.log(xhr.response)
})    
xhr.send()
```
#### XMLHttpRequest 查询参数
定义：浏览器提供给服务器的额外信息，让服务器返回浏览器想要的参数
语法：http://xxxx.com/xxx/xxx?参数名1=值1&参数名2
#### XMLHttpRequest 数据提交
1. 请求头设置`Content-Type: application/json`
2. 请求体携带JSON字符串
```javascript
const xhr = new XMLHttpRequest()
xhr.open('请求方法', '请求url网址')
xhr.addEventListener('loadend', () => {
    // 响应结果
    console.log(xhr.response)
})  
// 告诉服务器，我传递的内容类型，是JSON字符串
xhr.setRequestHeader('Content-Type', 'applecation/json')
// 准备数据并转为JSON字符串
const user = {username:'boaz', password:'123456'}
const userStr = JSON.stringify(user)
xhr.send(userStr)  
```
## Promise
`Promise`对象用于表示一个异步操作的最终完成（或失败）及其结果值
**好处:**
1. 逻辑更清晰
2. 了解`axios`函数内部运行机制
3. 能解决回调函数地狱问题
```javascript
// 1.创建Promise对象
const p = new Promise((resolve, reject) => {
    // 2.执行异步任务-并传递结果
    // 成功调用：resole(值) 触发 then() 执行
    // 失败调用：reject(值) 触发 catch() 执行
})
// 3.接收结果
p.then(result => {
    // 成功
}).catch(error => {
    //失败
})
```
### 三种状态
* 待定`pebding`：初始状态，既没有被兑现，也没有被拒绝
* 已兑现`fulfilled`：意味着，操作成功完成
* 已拒绝`rejected`：意味着，操作失败
`Promise`对象一旦被兑现/拒绝就已经敲定了，状态无法再被改变
## 同步异步代码
### 同步代码
逐步执行，需原地等待结果后，才继续向下执行
### 异步代码
调用后耗时，不阻塞代码继续执行（不必原地等待），在将来完成后触发一个回调函数
## 回调函数地狱
在回调函数中嵌套回调函数，一直嵌套下去就形成了回调函数地狱
* 缺点：可读性差，异常无法捕获，耦合性严重，牵一发动全身
## Promise-链式调用
**概念**：依靠`then()`方法会返回一个新生成的`Promise`对象特性，继续串联下一环节任务，直到结束
**细节**：`then()`回调函数中的返回值，会影响新生成的`Promise`对象最终状态和结果
**好处**：通过链式调用，解决回调函数嵌套问题
## 事件循环 EventLoop
执行代码和收集异步任务，在调用栈空闲时，反复调用任务队列里回调函数执行机制
* JS是单线程的，为了不阻塞JS引擎，设计执行代码的模型
#### JS内部代码执行过程
1. 执行同步代码，遇到异步代码交给宿主浏览器环境执行
2. 异步有了结果后，把回调函数放入任务队列排队
3. 当调用栈空闲后，反复调用任务队列里的回调函数
## 宏任务与微任务
宏任务：由浏览器环境执行的异步代码
微任务：由JS引擎环境执行的异步代码
## Promise.all 静态方法
合并多个Promise对象，等待所有同时成功完成（或某一个失败），做后续处理
## token
#### 概念
访问权限的令牌，本质上是一个字符串
#### 创建
正确登陆后，由后端签发并返回
#### 作用
判断是否有登录状态，控制访问权限等
## axios请求拦截器
发起请求之前，触发的配置函数，对请求参数进行额外配置
