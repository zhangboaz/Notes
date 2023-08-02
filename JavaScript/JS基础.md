## JavaScript
是一种运行在**客户端**（浏览器）的编程语言，实现人机交互效果
## JavaScript作用
* 网页特效
* 表单验证
* 数据交互
## JavaScript组成
* ECMAScript：规定了js基础语法核心知识
* Web APIs
    * DOM：操作文档
    * BOM：操作浏览器
## JavaScript书写位置
#### 内部JavaScript
直接写在html文件里，用script标签包住
**规范**：script标签写在</body>上面（浏览器按照顺序加载）
*扩展*：alert('你好，JavaScript') 页面弹出警告对话框
#### 外部JavaScript
代码写在以.js结尾的文件里
**语法**：通过script标签，引入到html页面中
```html
<script src="">//中间不写代码，会被忽略</script>
```
#### 内联JavaScript
js代码写在标签内部
```html
<button onclick="alert('你好，js')"></button>
```
## JavaScript注释
* 单行注释 **ctrl + /**
```html
<script>
    //单行注释
    //一次只注释一行
</script>
```
* 多行注释 **shift + alt + a**
```html
<script>
    /* 
      多行注释
      可注释多行
    */
</script>
```
## JavaScript结束符
* 使用英文的 ; 结束
* 可写可不写
* 要么都写，要么都不写
## JavaScript输入输出语法
#### 输出语法
**语法1**
```javascript
document.write('Hello javascript!')
document.write('<h1>Hello javascript!</h1>')
```
* 向body输出内容
* 如果有标签，会被解析成网页元素

**语法2**
```javascript
alert('你好，JavaScript')
```
* 页面弹出警告对话框

**语法3**
```javascript
console.log('控制台打印')
```
* 控制台输出语法，程序员调试使用
#### 输入语法
```javascript
prompt('请输入您的姓名：')
```
* 显示一个对话框，包含一条文字信息，用来提示用户输入文字
* 获取的数据默认是字符串类型
## 字面量
**在计算机科学中，字面量（literal）是在计算机中描述 事/物**
数字字面量，字符串字面量，[] 数组字面量，{} 对象字面量等等
## 变量
**计算机中用来存储数据的容器**
#### 变量命名规范
* 不能用关键字（let var if for等）
* 只能用下划线，字母，数字，$组成，且数字不能开头
* 字母区分大小写
* 小驼峰命名法：第一个单词首字母小写，后面每个单词首字母大写，例如：userName
#### 声明变量
```javascript
let 变量名
```
#### 变量赋值
```javascript
变量名 = 数据
```
#### 变量初始化
```javascript
let 变量名 = 数据
```
#### 声明多个变量
```javascript
let name = '张三', age = 20
```
#### let 和 var 区别
var 声明
* 可以先使用在声明（不合理）
* 声明过的变量可以重复声明（不合理）
* 比如变量提升，全局变量，没有块级作用域等等

**let解决了这些问题，声明变量使用let**
#### 数组
```javascript
let 数组名 = [数据1,数据2, ...,数据n]
console.log(数组名[0])//0, 1, 2, ..., n
console.log(数组名.length)//数组长度
```
* 新增 
  * push() 在数组末尾添加，返回该数组的新长度
  ```数组.push(要添加的元素)```
  * unshift() 在数组开头添加，返回该数组的新长度
  ```数组.unshift(要添加的元素)```
* 删除
  * pop() 删除数组最后一个元素，返回该元素的值
  ```数组.pop()```
  * shift() 删除数组第一个元素，返回该元素的值
  ```数组.shift()```
  * splice() 删除指定元素
  ```arr.splice(起始位置, 删除几个元素)```
  如果不写删除几个元素，会删除后面所有元素
* 排序
  ```arr.sort()```
* 遍历
  * ```javascript
    for (let k in 数组名){
      console.log(k)
    }   
    ```
* map()方法 迭代数组
  * map可以遍历数组处理数据，并且返回新的数组
  ```javascript
  arr.map(function(ele, index) {
        console.log(ele) // 数组元素
        console.log(index) // 索引号
        return ele + '颜色'
    })
  ```
* join()方法
  * join可以将数组中的数据连接成一个字符串
  ```javascript
  arr.join('')
  ```
## 常量
```javascript
const 常量名 = 数值
```
* 常量值永远不会改变
* 声明时必须赋值（初始化）
* 常量不允许重新赋值
## 数据类型
**javascript是弱数据类型语言**赋值之后才知道是什么数据类型
* 基本数据类型
  * number 数字型
  * string 字符串型
  * boolean 布尔型
  * undefined 未定义型
  * null 空类型
* 引用数据类型
  * object 对象
#### 数字型（number）
##### 算数运算
加 +，减 -，乘 *，除 /，取余 %
> 优先级高先被执行

##### NaN
NaN-Not a Number
* 代表一个计算错误
* 任何对NaN的操作都会返回NaN
#### 字符串型（string）
通过单引号（''），双引号（""）和反引号（``）包裹的数据都叫字符串，推荐使用单引号
> 使用转义符 \，输出单引号或者双引号

##### 字符串拼接
使用 + ，进行拼接
* 数字使用 +，相加
* 输出时可以拼接字符串与数字
##### 模板字符串
* 拼接字符串和变量
* 简化拼接变量
* **外面用 ``，里面用 ${变量名}**
```javascript
    let name = 'boaz'
    let age = 20
    document.write('我叫' + name + '今年' + age + '岁了')//普通拼接
    document.write(`我叫${name}今年${age}岁了`)//模板字符串
```
#### 布尔型（boolean）
* 表示肯定或者否定
* 只有两个固定的值true和false
#### 未定义型（undefined）
* 只声明变量，不赋值的情况下，变量默认值为 undefined
* 表示没有赋值
#### 空类型（null）
* null仅是一个代表无或者空的特殊值
* 表示赋值了，但是内容为空
* 作为尚未创建的对象
#### 检测数据类型
typeof 运算符可以返回被检测的数据类型
* 作为运算符：typeof x（常用的写法）
* 函数形式：typeof(x)
#### 类型转换
##### 隐式转换
* '+'号两边只要有一个是字符串，都会把另一个转成字符串
* 除了'+'以外的算术运算符，比如'- * /'都会把数据转成数字类型
* 缺点：转换类型不明确
* '+'号作为正号解析可以转换成数字型 +'123'是number型
* 任何数据和字符串相加结果都是字符串
##### 显式转换
* 转换成数字型
  ```javascript
  Number(数据)//转换为数字型，如果有非数字，结果为NaN
  parseInt(数据)//只保留整数
  parseFloat(数据)//可以保留小数
  ```
## 运算符
#### 赋值运算符
对变量进行赋值的运算符
=，+=，-=，*=，/=，%=
#### 一元运算符
* 正负号
* 自增 i++ / ++i
* 自减 i-- / --i
#### 比较运算符
* 比较两个数据大小，是否相等
* 基本的比较运算符
* == 左右两边的值是否相等
* === 左右两边是否类型和值都相等
* !== 左右两边是否不全等
#### 逻辑运算符
* && 逻辑与
* || 逻辑或
* ! 逻辑非
## 语句
#### 程序三大流程控制语句
* 顺序结构（从上往下依次执行）
* 分支结构
* 循环结构
#### 分支语句
* if
  ```javascript
  if (条件1) {
            条件1成立执行的语句
        } else if (条件2) {
            条件2成立执行的语句
        } else {
            都不成立执行的语句
        }
  ```
* 三元运算符
  ```javascript
  条件 ? 满足条件执行的语句 : 不满足条件执行的语句
  ```
* switch
  ```javascript
  switch (数据) {
      case 值1:
          代码1
          break
      case 值2:
          代码2
          break
      default:
          代码n
          break
  }
  ```
#### 循环语句
##### for循环
```javascript
for(变量起始值; 终止条件; 变量变化量){
     //循环体
}
```
##### while循环
```javascript
while(循环条件){
    循环体
}
```
while循环需要具备三要素
* 变量起始值
* 终止条件
* 变量变化量
##### 循环退出
* break：退出循环
* continue：结束本次循环，继续下次循环
## 函数
#### 声明
```javascript
function 函数名(){
  函数体
}
```
#### 调用
```javascript
函数名()
```
#### 函数传参
```javascript
function 函数名(参数列表){
  函数体
}
```
#### 函数返回值
```javascript
function 函数名(参数列表){
  函数体
  return 返回值
}
```
#### 匿名函数
##### 函数表达式
将匿名函数赋值给一个变量，并且通过变量名称进行调用，称这个为函数表达式
```javascript
let 变量名 = function () {
            函数体
        }
变量名() // 调用
```
##### 立即执行函数
```javascript
(function (形参) { 函数体 })(实参);
(function (形参) { 函数体 }(实参));
```
## 对象
#### 什么是对象
* 对象（object）：javascript里的一种数据类型
* 可以理解为一种无序的数据集合
* 用来描述某个事物
#### 对象使用
##### 对象声明
  ```javascript
  let 对象名 = {}
  let 对象名 = new Object()
  ```
* 对象由属性和方法组成
##### 属性
  ```javascript
  属性名:值
  ```
  多个属性之间使用英文 , 分割
##### 使用
* 查
  ```javascript
  对象名.属性
  对象名['属性']
  ```
* 改
  ```javascript
  对象名.属性 = 新值
  ```
* 增
  ```javascript
  对象名.新属性 = 新值
  ```
* 删
  ```javascript
  delete 对象名.属性
  ```
##### 方法
  ```javascript
  方法名: function() {

  }
  ```
##### 遍历对象
```javascript
for (let k in 对象名){
  console.log(k) // 打印属性名
  console.log(对象名[k]) // 打印属性值
}
```
#### 内置对象
Javascript内部提供的对象，包含各种属性和方法给开发者调用
##### Math
* random 生成0~1之间的随机数，包含0不包含1
  * 生成0~n的随机数
    ```Math.floor(Math.random() * (n + 1)) // ```
  * 生成N~M之间的随机数
    ```Math.floor(Math.random() * (M -N + 1)) + N```
* ceil 向上取整
* floor 向下取整
* round 四舍五入
* max 找最大值
* min 找最小值
* pow 幂运算
* abs 绝对值