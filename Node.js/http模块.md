# http模块
## 1. 创建http模块
1. 导入http模块
   ```javascript
    const http = require('http')
   ```
2. 创建服务对象
   ```javascript
    const server = http.createServer((request, response) => {
        response.setHeader('content-type', 'text/html;charset=utf-8') // 设置响应头
        response.end('Hello HTTP Server') // 设置响应体
    })
   ```
3. 监听端口，启动服务
   ```javascript
    server.listen(9000, () => {
    console.log('服务已经启动');
    })
   ```
4. 停止服务
当前命令行`ctrl + c`
## 2. 获取请求头和请求行
```javascript
    // 获取请求的方法
    console.log(request.method)
    //获取请求的URL
    console.log(request.url)
    // 获取HTTP协议的版本号
    console.log(request.httpVersion)
    // 获取HTTP请求头
    console.log(request.headers)
    // 获取请求行中的单独一个
    console.log(request.headers.host)
```
## 3. 提取HTTP请求报文
