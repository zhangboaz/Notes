// console.log("hello");
// console.log(__dirname);
// const { log } = require('console');
// const path = require('path')
// path.join(__dirname)
// console.log(path)
//加载http模块，创建web服务对象
// const path = require('path')
// const fs = require('fs')
// const http = require('http')
// const server = http.createServer()
// // 监听request请求事件，设置请求头和响应头
// server.on('request', (req, res) => {
//     if(req.url === '/index.html')
//     fs.readFile(path.join(__dirname,'../web前端/index.html'),(err, data) =>{
//         if(err){
//             console.log(err)
//         } else{
//             res.setHeader('Content-Type', 'text/html;charset=utf-8')
//             res.end(data.toString())
//         }
//     })
// })
// // 配置端口号并启动web服务
// server.listen(3000, ()=> {
//     console.log('web 服务已启动')
// })
// // 读取
// console.log(buf[1])
// // 修改
// buf[3] = 97
// // 查看字符串结果
// console.log(buf.toString())
const http = require('http')
const server = http.createServer((request, response) => {
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
    response.end('Hello HTTP Server') // 设置响应体
})
server.listen(9000, () => {
    console.log('服务已经启动');
})