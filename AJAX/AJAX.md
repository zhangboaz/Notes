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