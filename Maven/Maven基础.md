## Maven简介
Maven的本质是一个项目管理工具，将项目开发和管理过程抽象成一个项目对象模型（POM）
### 作用
* 项目构建：提供标准的、跨平台的自动化项目构建方式
* 依赖管理：方便快捷的管理项目依赖的资源（jar包），避免资源间的版本冲突问题
* 统一开发结构：提供标准的、统一的项目结构
## Maven基础概念
### 仓库
用于存储资源，包含各种jar包
#### 分类
* 本地仓库：自己电脑上存储资源的仓库看，连接远程仓库获取资源
* 远程仓库：非本机电脑上的仓库，为本地仓库提供资源
  * 中央仓库：Maven团队维护，存储所有资源的仓库
  * 私服：部门/公司范围内存储资源的仓库，从中央仓库获取资源
>> 私服的作用
>> * 保存具有版权的资源，包含购买或者自主研发的jar包 
>>   * 中央仓库的jar都是开源的，不能存储具有版权的资源 
>> * 一定范围内共享资源，仅对内部开放，不对外共享
### 坐标
Maven中的坐标用于描述仓库中资源的位置
#### Maven坐标主要组成
* groupId：定义当前Maven项目隶属组织名称
* artifactId：定义当前Maven名称
* version：定义当前项目版本号
#### Maven坐标的作用
使用唯一标识，唯一性定位资源位置，通过该标识可以将资源的识别和下载工作交由机器完成
## Maven项目构建
### Maven工程目录结构
### Maven常用项目构建指令
`mvn compile` 编译
`mvn clean` 清理
`mvn test` 测试
`mvn package` 打包
`mvn install` 安装到本地仓库
## 依赖管理
### 依赖配置
依赖指当前项目运行所需要的jar包，一个项目可以设置多个依赖
```xml
<!--设置当前项目所依赖的所有jar-->
<dependencies>
    <!--设置具体的依赖-->
    <dependency>
        <!--依赖所属群组id-->
        <groupId>junit</groupId>
        <!--依赖所属项目id-->
        <artifactId>junit</artifactId>
        <!--依赖版本号-->
        <version>3.8.1</version>
    </dependency>
</dependencies>
```
### 依赖传递
依赖具有传递性
* 直接依赖：在当前项目中通过依赖配置建立的依赖关系
* 间接依赖：被资源的资源如果依赖其他资源，当前项目间接依赖其他资源
#### 依赖传递冲突问题
* 路径优先：当依赖中出现相同的资源时，层级越深，优先级越低，层级越浅，优先级越高
* 声明优先：当资源在相同层级被依赖时，配置顺序靠前的覆盖配置顺序靠后的
* 特殊优先：当同级配置了相同资源的不同版本，后配置的覆盖先配置的
#### 可选依赖
可选依赖指对外隐藏当前所依赖的资源--不透明
```xml
<dependency>
    <!--依赖所属群组id-->
    <groupId>junit</groupId>
    <!--依赖所属项目id-->
    <artifactId>junit</artifactId>
    <!--依赖版本号-->
    <version>3.8.1</version>
    <!--可选依赖-->
    <optional>true</optional>
</dependency>
```
#### 排除依赖
排除依赖指主动断开依赖的资源，被排除的资源无需指定版本--不需要
```xml
<dependency>
    <!--依赖所属群组id-->
    <groupId>junit</groupId>
    <!--依赖所属项目id-->
    <artifactId>junit</artifactId>
    <!--依赖版本号-->
    <version>3.8.1</version>
    <!--排除依赖-->
    <exclusions>
      <exclusion>
        <groupId>org.hamcrest</groupId>
        <artifactId>hamcrest-core</artifactId>
      </exclusion>
    </exclusions>
</dependency>
```
### 依赖范围
依赖的jar默认情况可以在任何地方使用，可以通过`scope`标签设定其作用范围
#### 作用范围
* 主程序范围有效（main文件夹范围内）`compile` `provided`
* 测试程序范围有效（test文件夹范围内）`compile` `test` `provided`
* 是否参与打包（package指令范围内）`compile` `runtime`
#### 依赖范围传递性
带有依赖范围的资源在进行传递时，作用范围将受到影响
## 生命周期与插件
### 项目构建生命周期
>> Maven构建生命周期描述的是一次构建过程经历了多少个事件
Maven对项目构建的生命周期划分为3套
* `clean`：清理工作
* `default`：核心工作，例如编译，测试，打包，部署等
* `site`：产生报告，发布站点等
### 插件
* 插件与生命周期内的阶段绑定，在执行到对应生命周期时执行对应的插件功能
* 默认maven在各个生命周期上绑定有预设的功能
* 通过插件可以自定义其他功能
- [ ]