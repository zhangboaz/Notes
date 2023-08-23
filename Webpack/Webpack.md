## 什么是Webpack
Webpack是一个用于现代Javascript应用程序的静态模块打包工具
### 打包
把静态模块内容，压缩，整合，转译等（前端工程化）
1. 新建并初始化项目，编写业务源代码
2. 下载`webpack webpack-cli`到当前项目中（版本独立），并配置局部自定义命令
   ```cmd
   npm i webpack webpack-cli --save-dev
   ```
   ```javascript
   "scripts":{
    "bulid": "webpack"
   },
   ```
3. 运行打包命令，自动产生dist分发文件夹（压缩和优化后，用于最终运行的代码）
   ```cmd
   npm run bulid
   ```
#### 修改打包出口和入口