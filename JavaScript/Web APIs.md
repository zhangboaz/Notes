## 变量声明
const 优先，尽量使用const
* const语义化更好
* 不会更改的，使用const
* 先给const，如果后面要修改，再改为let
## Web APIs作用和分类
#### 作用
使用Js去操作html和浏览器
#### 分类
* DOM 文档对象模型（操作网页内容）
* BOM 浏览器对象模型
## DOM树
* 将HTML文档以树状结构直观的表现出来，我们称之为文档树或DOM树
* 描述网页内容关系的名词
* 作用：文档树直观的体现了标签与标签之间的关系
## DOM对象
* 浏览器根据html标签生成的JS对象
* 所有标签属性都可以在这个对象上面找到
* 修改这个对象的属性会自动映射到标签身上
* 核心是把网页内容当作对象来处理
## 获取DOM元素
#### 根据CSS选择器来获取DOM元素
* 获取匹配的第一个元素
  * 返回一个对象
    ```javascript
    document.querySelector('CSS选择器')
    ```
* 获取匹配的所有元素
  * 返回一个伪数组
    ```javascript
    document.querySelectorAll('CSS选择器')
    ```
#### 其他获取方法
* 根据id获取一个元素
  ```javascript
  document.getElementById('id名')
  ```
* 根据标签获取一类元素
  ```javascript
  document.getElementsByTagName('标签名')
  ```
* 根据类名获取元素
  ```javascript
  document.getElementsByClassName('类名')
  ```
## 操作元素内容
#### 对象.innerText 属性
* ```对象.innerText``` 获取文字内容
* 可以更改
* 不解析标签
#### 对象.innerHTML 属性
* ```对象.innerHTML``` 获取文字内容
* 可以更改
* 解析标签
## 操作元素属性
#### 操作元素常用属性
* 常见属性：href title src等
* 语法
  ```javascript
  对象.属性 = 值
  ```
#### 操作元素样式属性
* 语法
  ```javascript
  对象.style.样式属性 = 值
  ```
* 如果属性名之间有 - ，使用小驼峰命名法
##### 通过类名修改样式
```javascript
  对象.className = '类名'
```
* className是新值换旧值，添加或者覆盖当前对象的类名
##### 通过classList修改样式
* 可以通过classList方式追加和删除类名
* ```元素.classList.add('类名')``` 追加一个类
* ```元素.classList.remove('类名')``` 删除一个类
* ```元素.classList.toggle('类名')``` 切换一个类
#### 操作表单元素属性
* 获取值
  ```javascript
  表单元素.value
  ```
* 设置表单的值
  ```javascript
  表单元素.value = 值
  表单元素.type = 值
  ```
* 表单属性中添加有效果，移除没有效果，一律使用布尔值表示
  * 例如 disabled checked selected
    ```javascript
    表单元素.checked = false
    ```
#### 自定义属性
* 在标签上一律以data-开头
* 在DOM对象上一律以dataset对象方式获取
## 定时器-间歇函数
#### 开启定时器
```javascript
setInterval(函数名, 间隔时间)
```
* 每隔一段时间调用这个函数
* 间隔时间单位是毫秒
* 函数名，不加小括号
* 定时器返回一个id数字（唯一的）
#### 关闭定时器
```javascript
let 变量名 = setInterval(函数名, 间隔时间)
clearInterval(变量名) // 要关闭定时器返回的数字
```
## 事件监听
#### 语法
```javascript
元素对象.addEventListener('事件类型',要执行的函数)
```
#### 事件监听三要素
* 事件源：哪个dom元素被事件触发了，要获取dom元素
* 事件类型：用什么方式触发，比如鼠标单击click，鼠标经过mouseover等
* 事件调用的函数：要做什么事
#### 事件类型
##### 鼠标事件
* click 鼠标点击
* mouseenter 鼠标经过
* mouseleave 鼠标离开
##### 焦点事件 表单获得光标
* focus 获得焦点
* blur 失去焦点
##### 键盘事件
* Keydown 键盘按下触发
* Keyup 键盘抬起触发
##### 文本事件
* input 用户输入事件
#### 事件对象
##### 是什么
* 也是个对象，这个对象里面有事件触发时的相关信息
* 例如：鼠标点击事件中，事件对象就存储了鼠标点在哪个位置等信息
##### 使用场景
* 可以判断用户按下的是哪个键
* 可以判断鼠标点击了哪个元素
##### 如何获取
* 在时间绑定的回调函数的第一个参数就是事件对象
* 一般命名为event、ev、e
  ```javascript
  元素.addEventListener('事件类型',function(e){})
  ```
##### 部分常用属性
* type 获取当前的事件类型
* clientyX/clientY 获取光标相对于浏览器可见窗口左上角的位置
* offsetX/offsetY 获取光标相对于当前DOM元素左上角的位置
* key 用户按下的键盘键的值
#### 环境对象
##### 是什么
* 指的是函数内部特殊的变量this
* 它代表着当前函数运行时所处的环境
##### 作用
* 函数的调用方式不同，this指代的对象也不同
* 【谁调用，this指向谁】
#### 回调函数
如果将函数A作为参数传递给函数B时，我们称函数A为回调函数
## 事件流
* 事件流指的是事件完整执行过程中的流动路径
* 捕获阶段和冒泡阶段
#### 事件捕获
* 从DOM的根元素开始去执行对应的事件（从外到里）
```javascript
DOM.addEventListener(事件类型, 事件处理函数, 是否使用捕获机制)
```
* addEventListener第三个参数传入true代表捕获阶段触发（很少使用）
* 若传入false代表冒泡阶段触发，默认是false
#### 事件冒泡
* 当一个元素的事件被触发时，同样的事件将会在该元素的所有祖先元素中依次被触发
* 当一个元素触发事件后，会依次向上调用所有父级元素的同名事件
* 事件冒泡是默认存在的
#### 阻止冒泡
* 问题：因为默认就有冒泡模式的存在，所以容易导致事件影响到父级元素
* 需求：若想把事件就限制在当前元素内，就需要阻止事件冒泡
* 前提：阻止事件冒泡需要拿到事件对象
* 语法：```事件对象.stopPropagation()```
* 注意：此方法可以阻止事件流动传播，不光在冒泡阶段有效，捕获阶段也有效
#### 解绑事件
##### on事件
```javascript
// 绑定事件
btn.onclick = function () {
  alert('点击了')
}
// 解绑事件
btn.onclick = null
```
##### addEventListener
* 必须使用```removeEventListener(事件类型,事件处理函数)```
#### 两种注册事件的区别
##### 传统on注册（L0）
* 同一个对象，后面注册的时间会覆盖前面注册（同一个事件）
* 直接使用null覆盖就可以实现事件的解绑
* 都是冒泡阶段执行的
##### 事件监听注册（L2）
* 语法：```addEvnetListener(事件类型, 事件处理函数[, 是否使用捕获])```
* 后面注册的事件不会覆盖前面注册的事件（同一个事件）
* 可以通过第三个参数去确定是在冒泡或者捕获阶段执行
* 必须使用```removeEnentListener(事件类型, 事件处理函数[, 获取捕获或冒泡阶段])```
* 匿名函数无法被解绑
## 事件委托
* 优点：减少注册次数，可以提高程序性能
* 原理：事件委托其实是利用事件冒泡的特点
  * 给父元素注册事件，当我们触发子元素的时候，会冒泡到父元素身上，从而触发父元素的事件
* 实现：```事件对象.target.tagName```可以获得真正触发事件的元素
## 阻止元素默认行为
```javascript
事件对象.preventDefault()
```
## 页面加载事件
* 加载外部资源（如图片、外联CSS和Javascript等）加载完毕时触发的事件
* 事件名：load
* 监听页面所有资源加载完毕
  * 给window添加load事件
    ```javascript
    // 页面加载事件
    window.addEventListener('load', function () {
      // 执行的操作
    })
    ```
* 不光可以监听整个页面资源加载完毕，也可以针对某个资源绑定load事件
* 当初始的HTML文档被完全加载和解析完成之后，DOMContentLoaded事件被触发，而无需等待样式表、图像等完全加载
  * 事件名：DOMContentLoaded
  * 监听页面DOM加载完毕：给document添加DOMContentLoaded事件
    ```javascript
    document.addEventListener('DOMContentLoaded', function () {
      //执行的操作
    })
    ```
## 元素滚动事件
* 滚动条在滚动的时候持续触发的事件
* 事件名：scroll
* 监听整个页面滚动
  ```javascript
  // 页面滚动事件
  window.addEventListener('scroll', function () {
    //执行的操作
  })
  ```
#### 获取位置
* scrollLeft和scrollTop（属性）
  * 获取被卷去的大小
  * 获取元素内容往左、往上滚出去看不到的距离
  * 这两个值是可读写的
  * ```元素.scrollTop```
* 获取html元素```document.documentElement```
## 页面尺寸事件
* 会在窗口尺寸改变的时候触发事件
  ```javascript
  window.addEventListener('resize', function () {
    //执行的代码
  })
  ```
#### 获取元素宽高
* 获取元素可见部分宽高（不包含边框，margin，滚动条等）
* clientWidth和clientHeight
## 元素的尺寸与位置
#### 获取宽高
* 获取元素的自身宽高、包含元素自身设置的宽高、padding、border
* offsetWidth和offsetHeight
* 获取出来的是数值，方便计算
* 注意：获取的是可视宽高，如果盒子是隐藏的，获取的结果是0
#### 获取位置
* 获取元素距离自己定位父级的左、上距离
* offsetLeft和offsetTop 注意是只读属性
## 日期对象
#### 实例化
##### 获取当前时间
```javascript
const date = new Date()
```
##### 获取指定时间
```javascript
const date = new Date('YYYY-MM-DD HH:MM:SS')
```
#### 日期对象方法
* ```getFullYear()``` 获得四位年份
* ```getMonth()``` 获得0~11月份
* ```getDate()``` 获得月份中的某一天
* ```getDay()``` 获得0~6日期
* ```getHours()``` 获得0~23小时
* ```getMinutes()``` 获得0~59分钟
* ```getSeconds()``` 获得0~59秒
* ```toLocaleString()``` 返回 YYYY/MM/DD HH:MM:SS
* ```toLocaleDateString()``` 返回 YYYY/MM/DD 
* ```toLocaleTimeString()``` 返回 HH:MM:SS
#### 时间戳
* 是指1970年01月01日00时00分00秒起至现在的毫秒数，它是一种特殊的计量时间的方式
##### 算法
1. 将来的时间戳 - 现在的时间戳 = 剩余时间毫秒数
2. 剩余时间毫秒数 转换为 剩余时间的 年月日时分秒 就是 倒计时时间
3. 比如 将来的时间戳 2000ms - 现在的时间戳1000ms = 1000ms
4. 1000ms转换为就是 0小时0分1秒
##### 获取方法
1. ```getTime()``` 需要实例化，能返回指定时间的时间戳
2. ```+new Date()``` 无需实例化，能返回指定时间的时间戳
3. ```Date.now()``` 无需实例化，不能返回指定时间的时间戳
4. 指定时间的时间戳```+new Date('YYYY-MM-DD HH:MM:SS')```
##### 时间戳转换为天 时 分 秒
* ```d = parseInt(总秒数 / 60 / 60 / 24)``` 计算天数
* ```h = parseInt(总秒数 / 60 / 60 % 24)``` 计算小时
* ```m = parseInt(总秒数 / 60 % 60)``` 计算分钟
* ```s = parseInt(总秒数 % 60)``` 计算秒数
## 节点操作
#### DOM节点
* DOM树里每一个内容都称之为节点
##### 节点类型
* 元素节点
  * 所有的标签 比如：body、div
  * html是根节点
* 属性节点
  * 所有的属性 比如href
* 文本节点
  * 所有的文本
* 其他
#### 查找结点
##### 父节点查找
* parentNode属性
* 返回最近一级的父节点，找不到返回null
  ```javascript
  子元素.parentNode
  ```
##### 子节点查找
* childNodes
  * 获得所有子节点，包括文本节点（空格、换行）、注释节点等
* children
  * 仅获得所有元素节点
  * 返回的还是一个伪数组
  ```javascript
  子元素.children
  ```
##### 兄弟节点查找
* 下一个兄弟节点
  ```javascript
  元素.nextElementSibling
  ```
* 上一个兄弟节点
  ```javascript
  元素.previousElementSibling
  ```
#### 增加节点
##### 创建节点
```javascript
document.createElement('标签名')
```
##### 追加节点
* 插入到父元素的最后一个子元素
  ```javascript
  父元素.appendChild(要插入的元素)
  ```
* 插入到父元素中某个子元素的前面
  ```javascript
  父元素.insertBefore(要插入的元素,在哪个元素前面)
  ```
#### 克隆节点
```javascript
元素.cloneNode(布尔值)
```
* 若为true，则代表克隆时会包含后代节点一起克隆
* 若为false（默认），则代表克隆时不包含后代节点
#### 删除节点
* 在Javascript原生DOM操作中，要删除元素必须通过父元素删除
```javascript
父元素.removeChild(要删除的元素)
```
## M端（移动端）事件
#### 触摸事件 touch
* ```touchstart``` 手指触摸到一个DOM元素时触发
* ```touchmove``` 手指在一个DOM元素上滑动时触发
* ```touchend``` 手指从一个DOM元素上移动时触发
## Window对象
#### BOM
* 浏览器对象模型
* window对象是一个全局对象，也就是说是Javascript中的顶级对象
* 像document、alert()、console.log()这些都是window的属性，基本DOM的属性和方法都是window的
* 所有通过var定义在全局作用域中的变量、函数都会变成window对象的属性和方法
* window对象下的属性和方法调用的时候可以省略window
#### 定时器-延时函数
* Javascript内置的一个用来让代码延迟执行的函数，叫setTimeout
* 语法
  ```javascript
  setTimeout(回调函数, 等待的毫秒数)
  ```
* setTimeout仅仅只执行一次，所以可以理解为就是把一段代码延迟执行。平时省略window
* 清除延时函数
  ```javascript
  let timer = setTimeout(回调函数, 等待的毫秒数)
  clearTimeout(timer)
  ```
* 延时器需要等待，所以后面的代码先执行
* 每一次调用延时器都会产生一个新的延时器
##### 两种定时器对比
* 延时函数：执行一次
* 间歇函数：每隔一段时间就执行一次，除非手动清除
#### JS执行机制
* Javascript语言的一大特点就是单线程，也就是说，同一时间只能做一件事
##### 同步
* 前一个任务结束后再执行后一个任务，程序的执行顺序与任务的排列顺序是一致的、同步的
##### 异步
* 在做一件事时。因为这件事会花费很长时间，在做这件事的同时，可以去处理其他的事情
##### 同步与异步的本质区别
* 这条流水线上各个流程的执行顺序不同
##### 同步任务
* 同步任务都在主线程上执行，形成一个执行栈
##### 异步任务
* JS的异步是通过回调函数实现的
* 一般而言，异步任务有以下三种类型
  * 普通事件，如click、resize等
  * 资源加载，如load、error等
  * 定时器，包括setInterval、setTimeout等
* 异步任务相关添加到任务队列中（任务队列也称消息队列）
##### JS执行机制
1. 先执行执行栈中的同步任务
2. 异步任务放入任务队列中
3. 一旦执行栈中的所有同步任务执行完毕，系统就会按次序读取任务队列中的异步任务，于是被读取的异步任务结束等待状态，进入执行栈，开始执行
4. 重复第三步（该过程称为事件循环 event loop）
#### location对象
* location的数据类型是对象，它拆分并保存了URL地址的各个部分组成
##### 常用属性和方法
* href属性获取完整的URL地址，对其赋值时用于地址的跳转
  ```javascript
  // 可以得到当前文件的URL地址
  console.log(location.href)
  // 可以通过js方式跳转到目标地址
  location.href = 'URL'
  ```
* search属性获取地址中携带的参数，符号 ? 后面部分
  ```javascript
  location.search
  ```
* hash属性获取地址中的哈希值，符号 # 后面部分
  ```javascript
  location.hash
  ```
* reload方法用来刷新当前页面，传入参数true时表示强制刷新
  ```javascript
  location.reload()
  ```
#### navigator对象
* navigator的数据类型是对象，该对象下记录了浏览器自身的相关信息
##### 常用属性和方法
* 通过 userAgent 检测浏览器的版本及平台
#### histroy对象
* history的数据类型是对象，主要管理历史记录。该对象与浏览器地址栏的操作相对应，如前进、后退、历史记录等
##### 常用属性和方法
* back() 后退
* forward() 前进
* go(参数) 前进后退，参数为1，前进一个页面，参数为-1，后退一个页面
## 本地存储
#### 本地存储介绍
1. 数据存储在浏览器中
2. 设置、读取方便、甚至页面刷新不丢失数据
3. 容量较大，sessionStorage和localStorage约 5M 左右
#### localStorage
* 可以将数据永久存储在本地（用户的电脑），除非手动删除，否则关闭页面也会存在
* 可以在多窗口（页面）共享（同一浏览器可以共享）
* 以键值对的形式存储使用
##### 语法
* 都要加引号
* 存储的类型都是字符串
* 存储和修改数据
  ```javascript
  localStorage.setItem(key, value)
  ```
* 获取数据
  ```javascript
  localStorage.getItem(key)
  ```
* 删除数据
  ```javascript
  localStorage.removeItem(key)
  ```
#### sessionStorage
##### 特性
* 生命周期为关闭浏览器窗口
* 在同一个窗口（页面）下数据可以共享
* 以键值对的形式存储使用
* 用法跟localStorage基本相同
#### 存储复杂数据类型
1. 先将复杂数据类型转换为JSON字符串，然后存储到本地
   ```javascript
   JSON.stringify(复杂数据类型)
   ```
2. 将取出来的字符串转换为对象
   ```javascript
   JSON.parse(JSON字符串)
   ```
## 正则表达式
* 正则表达式是用于匹配字符串中字符组合的模式
* 在Javascript中，正则表达式也是对象
* 通常用来查找、替换那些符合正则表达式的文本
* 许多语言都支持正则表达式
#### 语法
1. 定义正则表达式语法
   ```javascript
   const reg = /表达式/
   ```
2. 判断是否符合规则的字符串
   ```javascript
   reg.test(被检测的字符串)
   ```
   如果正则表达式与指定的字符串匹配，返回true，否则false
3. 检查（查找）符合规则的字符串
   ```javascript
   reg.exec(被检测的字符串)
   ```
   如果匹配成功，返回一个数组，否则返回null
#### 元字符
* 是一种具有特殊含义的字符，可以极大提高了灵活性和强大的匹配功能
##### 边界符
* 正则表达式中的边界符（位置符）用来提示字符所处的位置
  * ^ 表示匹配行首的文本（以谁开始）
  * $ 表示匹配行尾的文本（以谁结束）
  * 如果 ^ 和 $ 在一起，表示必须是精确匹配
##### 量词
* 量词用来设定某个模式出现的次数
  * $*$ 重复0次或更多次
  * $+$ 重复一次或更多次
  * $?$ 重复0次或一次
  * {n} 重复n次
  * {n,} 重复n次或更多次
  * {n,m} 重复n到m次
##### 字符类
1. [] 匹配字符集合
   后面的字符串只要包含[]中任意一个字符，都返回true，否则返回false
2. 连字符 - 表示一个范围
   * [a-z]表示a到z26个英文都可以
   * [a-zA-Z]表示大小写都可以
   * [0-9]表示0~9的数字都可以
3. []里面加上^取反符号
   * [^a-z]匹配除了小写字母以外的字符
4. . 匹配除换行符之外的任何单个字符
5. 预定义：指的是 某些常见模式的简写方式
   * \d 匹配0~9之间的任一数字，相当于[0-9]
   * \D 匹配0~9以外的任一数字，相当于[^0-9]
   * \w 匹配任意的字母、数字和下划线，相当于[A-Za-z0-9_]
   * \W 除所有字母、数字和下划线以外的字符，相当于[^A-Za-z0-9_]
   * \s 匹配空格（包括换行符、制表符、空格符等），相当于[\t\r\n\v\f]
   * \S 匹配非空格的字符，相当于[^\t\r\n\v\f]
##### 修饰符
* 修饰符约束正则执行的某些细节行为，如是否区分大小写，是否支持多行匹配等
* 语法
  ```javascript
  /表达式/修饰符
  ```
* i 是单词 ignore 的缩写，正则匹配时字母不区分大小写
* g 是单词 global 的缩写，匹配所有满足正则表达式的结果
* replace替换
  ```javascript
  字符串.replace(/正则表达式/,'替换的文本')
  ```