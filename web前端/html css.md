## 在新窗口打开页面
```css
target="_blank"
```
## 音频标签
```html
<audio src="" controls loop autoplay></audio>
```
> 在html 5里面，如果属性名与属性值相同，可简写为一个单词
* controls：显示音频控制面板
* loop：循环播放
* autoplay：自动播放
## 视频标签
```html
<video src="" controls loop muted autoplay></video>
```
* controls：显示视频控制面板
* loop：循环播放
* muted：静音播放
* autoplay：自动播放
## 表格
```html
<table>
    <thead>
        <tr>
            <th></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td></td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td></td>
        </tr>
    </tfoot>
</table>
```
#### 合并单元格
* 保留最左最上的单元格
* 跨行合并 rowspan（合并行）
* 跨列合并 colspan（合并列）
* 不能跨结构标签合并
## 表单
#### 单选框
```html
<input type="radio" name="gender" checked>
```
* name - 一组单选框一个name
* checked - 默认选中
#### 上传文件
```html
<input type="file" multiple>
```
* multiple - 同时上传多个文件
#### 下拉菜单
```html
<select>
    <option selected></option>
</select>
```
* option - 选项
* selected - 默认显示
#### 文本域
```html
<textarea></textarea>
```
#### label标签
1.写法一
* label标签只包裹内容，不包裹表单控件
* 设置label的for属性与表单控件的id属性相同
  ```html
  <input type="radio" id="man"><label for="man">男</label>
  ```
2.写法二
* 使用lanbel标签包裹文字和表单控件，不需要属性
  ```html
  <label><input type="radio">女</label>
  ```
## 字符实体
* 空格 - ```&nbsp;```
* 小于号 - ```&lt;```
* 大于号 - ```&gt;```
## 文字修饰线
属性名：text-decoration
* none：无
* underline：下划线
* line-through：删除线
* overline：上划线
## 复合选择器
#### 1.后代选择器
* 选中某元素的后代元素
* 写法：父选择器 子选择器 {CSS 属性}
#### 2.子代选择器
* 选中某元素的子代元素（最近的子集）
* 写法：父选择器 > 子选择器 {CSS 属性}
#### 3.并集选择器
* 选中多组标签设置相同样式
* 写法：选择器1, 选择器2, 选择器N {CSS 属性}
#### 4.交集选择器
* 选中同时满足多个条件的元素
* 写法：选择器1选择器2{CSS 属性}
* 如果交集选择器中由标签选择器，要写在最前面
#### 5.伪类选择器
* 伪类表示元素状态，选中元素的某个状态设置样式
* 鼠标悬停状态：选择器:hover{CSS 属性}
* 伪类-超链接
  * :link 访问前
  * :visited 访问后
  * :hover 鼠标悬停
  * :active 点击时（激活）
  * 必须按照 LVHA 的顺序书写
#### 6.结构伪类选择器
* 根据元素的结构关系查找元素
* 写法：
  * E:first-child 查找第一个 E 元素
  * E:last-child 查找最后一个 E 元素
  * E:nth-child(N) 查找第 N 个 E 元素（第一个元素 N 值为1）
* :nth-child(公式)
  * 2n 偶数标签
  * 2n+1;2n-1 奇数标签
  * n+5 找到第五个以后的标签
  * -n+5 找到第五个以前的标签
#### 7.伪元素选择器
* 创建虚拟元素（伪元素），用来摆放装饰性的内容
* 写法：
  * E::before 在 E 元素里面最前面添加一个伪元素
  * E::after 在 E 元素最后面添加一个伪元素
* 必须设置 content:" " 属性，用来设置伪元素的内容，如果没有内容，则引号留空即可
* 伪元素默认是行内显示模式
* 权重和标签选择器相同
## CSS特性
#### 继承性
子级默认继承父级的文字控制属性
#### 层叠性
* 相同的属性会覆盖：后面的CSS属性会覆盖前面的CSS属性
* 不同的属性会叠加：不同的CSS属性都生效
#### 优先级
* 当一个标签使用了多种选择器是优先级高的生效
* 优先级（选中标签的范围越大，优先级越低）：!important > 行内样式 > id选择器 > 类选择器 > 标签选择器 > 通配符选择器
* 叠加计算规则
  * 行类样式 > id选择器个数 > 类选择器个数 > 标签选择器个数
  * 从左到右依次比较个数，同一级个数高的优先级高，如果个数相同，则向后比较
  * !important 权重最高
  * 继承权重最低
## Emmet写法
* HTML
  * 选择器：标签名#id名.类名
  * 同级标签：标签名+标签名
  * 父子级标签：父标签>子标签
  * 多个相同标签：标签名*数量
  * 有内容的标签：标签名{内容}
* CSS
  * 属性名首字母跟数值
  * 多个属性简写之间用+
## 背景属性
#### 背景色
```html
background-color: ;
```
#### 背景图
```html
background-image: url();
```
#### 背景图平铺方式
```html
background-repeat: no-repeat;
```
* no-repeat 不平铺
* repeat 平铺
* repeat-x 水平方向平铺
* repect-y 垂直方向平铺
#### 背景图位置
```html
background-position: ;
```
* 属性值：水平方向位置 垂直方向位置
* 关键字
  * left 左侧
  * right 右侧
  * center 居中
  * top 顶部
  * bottom 底部
* 坐标：数字+px 正负都可以
* 坐标与关键字可以混写
* 只写一个另一个默认居中
#### 背景图缩放
```html
background-size: ;
```
* cover 等比例缩放背景图片以完全覆盖背景区
* contain 等比例缩放背景图片以完全装入背景区
* 百分比 根据盒子尺寸计算图片大小
* 数字+单位（例 px）
#### 背景图固定
```html
background-attachment: ;
```
属性值：fixed 固定
#### 背景复合属性
```html
background: ;
```
* 属性值：背景色 背景图 背景图平铺方式 背景图位置/背景图缩放 背景图固定
* 空格隔开各个属性，不区分顺序
## 显示模式
标签的显示方式
#### 块级元素
* 独占一行
* 宽度默认是父级的100%
* 添加宽度属性生效
#### 行内元素
* 一行显示多个
* 设置宽度属性不生效
* 宽度尺寸由内容撑开
#### 行内块元素
* 一行显示多个
* 设置宽度属性生效
* 宽度尺寸也可以由内容撑开
#### 转换显示模式
```html
display: ;
```
属性值
* block 块级
* inline-block 行内块
* inline 行内
## 盒子模型
#### 组成部分
* 内容区域 width & height
* 内边距 padding
* 边框线 border
* 外边距 margin
* 方位名词 top bottom left right
#### 边框线
* 属性名 border-方位名词
* 属性值 粗细 线条样式 颜色
* 线条样式
  * soild 实线
  * dashed 虚线
  * dotted 点线
#### padding margin 多值写法
* 一个值 四个方向
* 两个值 上下 左右
* 三个值 上 左右 下
* 四个值 上 右 下 左
#### 尺寸计算
* 盒子大小 = 内容尺寸 + boder尺寸 + 内边距大小
* 手动做减法 减掉boedre/padding的尺寸
* 內减模式 ```box-sizing: border-box;```
#### 版心居中
```margin: 0 auto;```
#### 清除默认样式
##### 默认的内外边距
```css
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
} 
```
##### 列表的项目符号
```css
li {
    list-style: none;
}
```
#### 元素溢出
* 控制溢出元素的内容的显示方式
* 属性名 overflow
* 属性值
  * hidden 溢出隐藏
  * scroll 溢出滚动（无论是否溢出，都显示滚动条位置）
  * auto 溢出滚动（溢出才显示滚动条位置）
#### 外边距问题-合并现象
* 垂直排列的兄弟元素，上下margin会合并
* 取两个margin中的较大值生效
#### 外边距问题-塌陷问题
* 父子级的标签，子级的添加上外边距会产生塌陷问题
* 导致父级一起向下移动
* 解决方法
  * 取消子级margin，父级设置padding
  * 父级设置 overflow:hidden
  * 父级设置 border-top
#### 行内元素=内外边距问题
* 行内元素添加 margin 和 padding，无法改变元素垂直位置
* 给行内元素添加 line-height 可以改变垂直位置
#### 圆角
* 设置元素的外边框为圆角
* 属性名 border-radius
* 属性值 数字+px / 百分比
* 可以使用多值写法
#### 阴影
* 给元素设置阴影效果
* 属性名 box-shadow
* 属性值 x轴偏移量 y轴偏移量 模糊半径 扩散半径 颜色 内外阴影
* x y 轴偏移量必须写
* 默认是外阴影，内阴影需要添加 inset
## 标准流
* 标准流也叫文档流
* 指的是标签在页面中默认的排布规则
## 浮动
* 让块元素水平排列
* 属性名:```float```
* 属性值
  * ```left```:左对齐
  * ```right```:右对齐
* 浮动后脱离标准流控制
#### 清除浮动-清除浮动带来的影响
浮动元素会脱标，如果父级没有高度，子级无法撑开父级高度
* 方法一：额外标签法
  在父元素内容的最后添加一个块级元素，设置CSS属性```clear:both;```
* 方法二：单伪元素法
  ```css
  .clearfix::after {
    content:"";
    display:block;
    clear:both;
  }
  ```
* 方法三：双伪元素法（推荐）
  ```css
  .clearfix::before, // 解决外边框塌陷问题
  .clearfix::after {
      content: "";
      display: table;
  }
  .clearfix::after{
      clear: both;
  }
  ```
* 方法四：overflow
  父元素添加CSS属性```overflow:hidden```
## Flex 布局
* Flex 也叫弹性布局
* 不会产生浮动布局的脱标现象
* 布局网页更简单、更灵活
#### 组成
##### 设置方式
给父元素设置```display:flex;```，子元素可以自动挤压或拉伸
##### 组成部分
* 弹性容器
* 弹性盒子
* 主轴：默认在水平方向
* 侧轴/交叉轴：默认在垂直方向
#### 语法
##### 创建flex容器 ```display:flex```
##### 主轴对齐方式 ```justify-content: ;```
* ```flex-start``` 默认值，弹性盒子从起点开始依次排列
* ```flex-end``` 弹性盒子从终点开始依次排列
* ```center``` 弹性盒子沿主轴居中排列
* ```space-between``` 弹性盒子沿主轴均匀排列，空白间距均分弹性盒子之间
* ```space-around``` 弹性盒子沿主轴均匀排列，空白间距均分弹性盒子两侧
* ```space-evenly``` 弹性盒子沿主轴均匀排列，弹性盒子与容之间间距相等
##### 侧轴对齐方式 ```align-items: ;```
* ```stretch``` 弹性盒子沿侧轴线被拉伸至铺满容器
* ```center``` 弹性盒子沿侧轴居中排列
##### 某个弹性盒子侧轴对齐方式 ```align-self: ;```
##### 修改主轴方向 ```flex-direction: ;```
* ```row``` 水平方向，从左向右（默认）
* ```column``` 垂直方向，从上向下
* ```row-reverse``` 水平方向，从右向左
* ```column-reverse``` 垂直方向，从下向上
##### 弹性伸缩比 ```flex: ;```
* 控制弹性盒子的主轴方向的尺寸
* 属性值为整数数字，表示占用父级剩余尺寸的份数
##### 弹性盒子换行 ```flex-wrap: ;```
* 弹性盒子可以自动挤压或拉伸，默认情况下，所有弹性盒子都在一行显示
* ```wrap``` 换行
* ```nowrap``` 不换行（默认）
##### 行对齐方式 ```align-content```
* 属性值与主轴对齐方式相同
## Logo设置技巧
#### Logo功能
* 单击跳转到首页
* 搜索引擎优化：提升网站百度搜索排名
#### 方法
* 标签结构：h1 > a > 网站名称（搜索关键字）
* CSS样式：设置背景照片，将文字大小设置为0
## 定位
#### 作用
灵活改变盒子在网页中的位置
#### 实现
1.定位模式：position
2.边偏移：设置盒子的位置
  * left
  * right
  * top
  * bottom
#### 相对定位
* position:relative
* 改变位置的参照物是自己原来的位置
* 不脱标，占位
* 标签显示模式特点不变
#### 绝对定位
* position:absolute
* 子级绝对定位，父级相对定位
* 脱标，不占位置
* 参照物：先找最近的已经定位的祖先元素，如果所有祖先元素都没有定位，参照浏览器可视区改位置
* 显示模式特点改变：宽高生效（具备了行内块的特点）
#### 定位居中
##### 实现步骤
* 绝对定位
* 水平、垂直边偏移为50%
* 子级向左，上移动自身尺寸的一半
  * 左，上的外边距为 -尺寸的一半
  * transform:translate(-50%,-50%)
#### 固定定位
* position:fixed
* 元素的位置在网页滚动时不会改变
* 脱标，不占位
* 参照物：浏览器窗口
* 显示模式特点：具备行内块特点
#### 堆叠层级 z-index
##### 默认效果
* 按照标签书写顺序
* 后来者居上
##### 作用
* 设置定位元素的层级顺序
* 改变定位元素的显示顺序
##### 使用
* 取值是整数
* 默认是0
* 取值越大显示顺序越大
## CSS精灵
* 也叫CSS Sprites，是一种网页图片应用处理方式
* 把网页中的一些背景图片整合到一张图片文件中，再```background-position```精确的定位出背景图片的位置
* 减少服务器被请求的次数，减轻服务器的压力，提高页面加载速度
#### 实现步骤
1.创建盒子，盒子尺寸与小图尺寸相同
2.设置盒子背景图为精灵图
3.添加```background-position```属性，改变背景图位置
  * 测量小图片左上角坐标
  * 取负数坐标为```background-position```属性值（向左上移动图片位置）
## 字体图标
* 展示的是图标，本质是字体
* iconfont图标库
## 垂直对齐方式 vertical-align
* baseline 基线对齐
* top 顶部对齐
* middle 居中对齐
* bottom 底部对齐
## 过渡 transition
#### 作用
* 可以为一个元素在不同状态之间切换的时候添加过渡效果
#### 属性名
* transition（复合属性）
#### 属性值
* 过渡的属性 花费时间（s）
* 过渡的属性可以是具体的CSS属性
* 也可以是all（两个状态属性值不同的所有属性，都产生过渡效果）
* transition设置给元素本身
## 透明度 opacity
#### 作用
* 设置整个元素的透明度（包括背景和内容）
#### 属性值 0-1
* 0：完全透明（元素不可见）
* 1：不透明
* 0-1之间小数：半透明
## 光标类型 cursor
#### 作用
* 鼠标悬停在元素上时指针显示样式
#### 属性值
* ```default``` 默认值。通常是箭头
* ```pointer``` 小手效果，提示用户可以点击
* ```text``` 工字型，提示用户可以选择文字
* ```move``` 十字光标，提示用户可以移动    
## 项目搭建
#### images文件夹
* 存放固定使用的图片素材，例如：logo、样式修饰图等等
#### uploads文件夹
* 存放非固定使用的图片素材，例如：商品图、宣传图需要上传的图片
#### iconfont文件夹
* 字体图标素材
#### css文件夹
* base.css 基础公共样式
* common.css 各个网页相同模板的重复样式，例如：头部、底部
* index.css 首页css样式
#### index.html 
* 首页HTML文件
## SEO 三大标签
#### SEO
* 搜索引擎优化
* 提升网站百度搜索排名
#### 提升SEO的常见方法
* 竞价排名
* 将网页制作成html后缀
* 标签语义化（在合适的位置使用合适的标签）
#### 网页头部SEO标签
* title 网页标题标签
  ```<title></title>```
* description 网页描述
  ```<meta name="description" content="">```
* keywords 网页关键词
  ```<meta name="keywords" content="">```
## Favicon 图标
* 网页图标，出现在浏览器标题栏，增加网站辨识度
* 图标：favicon.ico，一般存放在网站的根目录里面
  ```html
  <!-- link:favicon -->
  <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
  ```