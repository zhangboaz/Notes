# Buffer(缓冲区)
## 1. 概念
Buffer是一个类似于数组的对象，用来表示固定长度的字节序列
Buffer本质是一段内存空间，专门用来处理二进制数据
## 2. 特点
1. Buffer大小固定且无法调整
2. Buffer性能较好，可以直接对计算机内存进行操作
3. 每个元素的大小为1字节（byte）
## 3. 使用
### 3-1. 创建Buffer
1. alloc 创建时清零
   `let buf = Buffer.alloc(10)`
2. allocUnsafe 速度快但会包含旧的内存数据
   `let buf = Buffer.allocUnsafe(10)`
3. from
   `let buf = Buffer.from('hello')`
### 3-2. Buffer与字符串的转换
使用`tostring`方法将Buffer转为字符串
```javascript
let buf = Buffer.from([105, 108, 111, 118, 101, 121, 111, 117])
console.log(buf.toString());
```
>> toString默认按照`utf-8`编码方式进行转换的
### 3-3. Buffer的读写
Buffer可以直接通过`[]`的方式对数据进行处理
```javascript
// 读取
console.log(buf[1])
// 修改
buf[3] = 97 t
// 查看字符串结果
console.log(buf.toString())
```
>> 注意：
>> 1. 如果修改的数值超过255，则超过八位数据会被舍弃
>> 2. 一个utg-8的字符一般占3个字节