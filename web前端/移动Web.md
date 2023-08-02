## 平面转换
#### 作用
* 为元素添加动态效果，一般与过渡配合使用
#### 概念
* 改变盒子在平面内的形态（位移、旋转、缩放、倾斜）
#### 平移
##### 属性
```css
transform: translate(X轴移动距离,Y轴移动距离);
```
##### 取值
* 像素单位数值
* 百分比（参照盒子自身尺寸计算）
* 正负均可
##### 技巧
* ```translate()```只写一个字，表示沿着X轴移动
* 单独设置X或Y轴移动距离：```translateX()```或```translateY()```
#### 旋转
##### 属性
```css
transform: rotate(旋转角度);
```
  * 角度单位是 deg
##### 技巧
* 取值正负均可
* 取值为正，顺时针旋转
* 取值为负，逆时针旋转
#### 改变转换原点
##### 默认情况下，转换原点是盒子中心点
##### 属性
```css
transform-origin:水平原点位置 垂直原点位置;
```
##### 取值
* 方位名词（left top right bottom center）
* 像素单位数值
* 百分比
#### 多重转换
##### 多重转换技巧
* 先平移再旋转
  ```css
  transform: translate() rotate();
  ```
* 层叠性
#### 缩放
##### 属性
```css
transform: scale(缩放倍数);
transform: scale(X轴缩放倍数, X轴缩放倍数);
```
##### 技巧
* 通常，只为```scale()```设置一个值，表示X轴和Y轴等比例缩放
* 取值大于1表示放大，取值小于1表示缩小
#### 倾斜
##### 属性
```css
transform: skew();
```
##### 取值
* 角度度数deg
#### 渐变
* 渐变是多个颜色逐渐变化的效果，一般用于设置盒子背景
##### 分类
* 线性渐变
* 径向渐变
##### 线性渐变
* 属性
  ```css
  background-image: linear-gradient(
    渐变方向,
    颜色1 终点位置,
    颜色2 终点位置,
    ······        
    );
  ```
* 渐变方向：可选
  * to 方位名词
  * 角度度数
* 终点位置：可选
  * 百分比
##### 径向渐变
* 属性
  ```css
  background-image: radial-gradient(
    半径 at 圆心位置,
    颜色1 终点位置,
    颜色2 终点位置,
    ······        
    );
  ```
* 取值
  * 半径可以是2条，则为椭圆
  * 圆心位置取值：像素单位数值/百分比/方位名词
## 空间转换
* 是从坐标角度定义的X、Y和Z三条坐标轴构成了一个立体空间，Z轴位置与视线方向相同
* 空间转换也叫3D转换
* 属性：```transfrom```
#### 平移
##### 属性
  ```css
  transform: translate3d(x, y, z);
  transform: translateX();
  transform: translateY();
  transform: translateZ();
  ```
##### 取值（正负均可）
* 像素单位数值
* 百分比（参照盒子自身尺寸计算结果）
#### 视距
##### 作用
* 指定了观察者与z=0平面的距离，为元素添加透视效果
##### 透视效果
* 近大远小，近实远需
##### 属性
* ```css
  perspective: 视距;
  ```
* 添加给父级，取值范围800~1200
#### 旋转
* 沿Z轴旋转
  ```css
  transform: rotateX(值);
  ```
* 沿X轴旋转
  ```css
  transform: rotateZ(值);
  ```
* 沿Y轴旋转
  ```css
  transform: rotateY(值);
  ```
* ```css
  transform: rotate3D(X, Y, Z, 角度度数);
  ```
  * 用来设置自定义旋转轴的位置及旋转的角度
  * x, y, z取值为0~1之间的数字
## 立体呈现
#### 作用
* 设置元素的子元素是位于3D空间还是平面中
#### 属性名
```css
transform-style
```
#### 属性值
* ```flat``` 子级处于平面中
* ```preserve-3D``` 子级处于3D空间
#### 呈现立体图形步骤
1.父元素添加```transform-style:preserve-3D;```
2.子级定位
3.调整盒子的位置（位移或旋转）
#### 缩放
##### 属性
  ```css
  transform: scale3d(x, y, z);
  transform: scaleX();
  transform: scaleY();
  transform: scaleZ();
  ```
## 动画 animation
* 过渡：实现两个状态间的变化过程
* 动画：实现多个状态间的变化过程，动画过程可控（重复播放、最终画面、是否暂停）
#### 实现步骤
1.定义动画
  ```css
  @keyframes 动画名称 {
      from {}
      to {}
  }
  @keyframes 动画名称 {
      0% {}
      10% {}
      ······
      100% {}
  }
  ```
2.使用动画
```css
animation: 动画名称 动画花费时长
```
#### animation
```css
animation: 动画名称 动画时长 速度曲线 延迟时间 重复次数 动画方向 执行完毕时状态;
```
* 动画名称和时长必须赋值
* 取值不分先后顺序
* 如果有两个时间值，第一个时间表示动画时长，第二个时间表示延迟时间
* 动画名称 ```animation-name```
* 动画时长 ```animation-duration```
* 延迟时间 ```animation-delay```
* 速度曲线 ```animation-timing-function```
  * linear 匀速
  * steps() 分步动画，配合精灵图实现精灵动画 
* 重复次数 ```animation-iteration-count``` 
  * 数字 重复播放次数
  * infinite 无限循环
* 动画方向 ```animation-direction```
  * alternate 反向
* 执行完毕时状态 ```animation-fill-mode```
  * forwards 停在结束位置
  * backwords 停在开始状态
* 暂停动画 ```animation-play-state```
  * ```paused```为暂停，通常配合```:hover```使用
#### 走马灯效果（无缝动画）
* 原理：复制开头图片到结束位置（图片累加宽度=显示区域宽度）
#### 逐帧动画
##### 核心原理
1. ```staps()```逐帧动画
2. CSS精灵图
##### 步骤
1. 准备显示区域
  * 盒子尺寸与一张精灵图尺寸相同
2. 定义动画
  * 移动背景图（移动距离=精灵图宽度）
3. 使用动画
  * ```steps(N)```，N与精灵小图个数相同
#### 多组动画
```css
animation:
  动画1,
  动画2,
  动画N;
```
## 视口
* 显示HTML网页的区域，用来约束HTML尺寸
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
* ```width=device-width``` 视口宽度 = 设备宽度
* ```initial-scale=1.0``` 缩放1倍（不缩放）
## 二倍图
* 设计稿里面每个元素的尺寸的倍数
* 防止图片在高分辨率屏幕下模糊失真
## 适配方案
#### 宽度适配-宽度自适应
* 百分比布局
* Flex布局
#### 等比适配-宽高等比缩放
* rem
* vw
## rem适配方案
#### rem
* rem单位，是相对单位
* rem单位是相对于HTML标签的字号计算结果
* 1rem = 1HTML字号大小
* 目前rem布局方案中，将网页等分成10份，HTML标签的字号为视口宽度的1/10
#### 媒体查询
* 媒体查询能够检测视口的宽度，然后编写差异化的CSS样式
* 当某个条件成立，执行对应的CSS样式
```css
@media (媒体特征) {
    选择器 {
        CSS属性
    }
}
```
#### flexible.js
* flexible.js是一个用来适配移动端的js库
* 核心原理是根据不同的视口宽度给网页中html根节点设置不同的font-size
## Less
#### 注释
* 单行注释
  * 语法：```//注释内容```
  * 快捷键：```ctrl```+```/```
* 块注释
  * 语法：```/*注释内容*/```
  * 快捷键：```Shift```+```Alt```+```A```
#### 运算
* 加、减、乘直接写计算表达式
* 除法需要添加小括号或者使用```./```符号
#### 嵌套
* 快速生成后代选择器
```less
.父级选择器 {
    // 父级样式
    .子级选择器 {
        // 子级样式
    }
}
```
* & 表示当前选择器，写到谁的大括号里面就表示谁，不会生成后代选择器
#### 变量
* 定义变量
  ```less 
  @变量名:数据;
  ```
* 使用变量 
  ```less 
  CSS属性: @变量名;
  ```
#### 导入
* 导入less公共样式文件
* 导入：
  ```less
  @import "文件路径";
  ```
* 如果是less文件可以省略后缀
#### 导出
* 在less文件的第一行添加
  ```less
  // out:存储URL
  ```
* 文件夹名称后面添加 /
* 禁止导出
  ```less
  // out:false
  ```
## vw适配方案
* 相对单位
* 相对视口的尺寸计算结果
* vw: viewport width
  * 1vw = 1/100视口宽度
* vh: viewport height
  * 1vh = 1/100视口高度
* vw单位的尺寸 = px单位数值 / （1/100视口宽度）
## 响应式网页
#### 媒体查询
```css
@media (条件) {
    //对应css
}
```
* ```max-width``` 最大宽度 从大到小
* ```min-width``` 最小宽度 从小到大
```css
@media 关键词 媒体类型 and (媒体特性) {
    //css代码
}
```
##### 关键词/逻辑操作符
* and
* only
* not
##### 媒体类型
* screen 屏幕
* print 打印预览
* speech 阅读器
* all 不区分类型
##### 媒体特性
* width、height 视口的宽和高
* max-width、max-height 视口最大宽和高
* min-width、min-height 视口最小宽和高
* orientation 屏幕方向
  * portrait 竖屏
  * landscape 横屏
##### 外部CSS
```html
<link rel="stylesheet" media="逻辑符 媒体类型 and (媒体特性)" href="xx.css">
```