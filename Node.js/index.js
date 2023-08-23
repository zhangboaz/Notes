// console.log("hello");
// console.log(__dirname);
// const { log } = require('console');
// const path = require('path')
// path.join(__dirname)
// console.log(path)
//加载http模块，创建web服务对象
const path = require('path')
const fs = require('fs')
const http = require('http')
const server = http.createServer()
// 监听request请求事件，设置请求头和响应头
server.on('request', (req, res) => {
    if(req.url === '/index.html')
    fs.readFile(path.join(__dirname,'../web前端/index.html'),(err, data) =>{
        if(err){
            console.log(err)
        } else{
            res.setHeader('Content-Type', 'text/html;charset=utf-8')
            res.end(data.toString())
        }
    })
})
// 配置端口号并启动web服务
server.listen(3000, ()=> {
    console.log('web 服务已启动')
})

