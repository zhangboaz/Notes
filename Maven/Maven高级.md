## 1. 分模块开发和设计
### 1-1. 分模块开发意义
* 将原始模块按照功能拆分成若干个子模块，方便模块间的相互调用，接口共享
### 1-2. 分模块开发流程
1. 创建Maven模块
2. 书写模块代码
3. 通过maven指令安装模块到本地仓库（install指令）
   * 团队内部开发需要发布模块功能到团队内部可共享的仓库中（私服）
## 2. 依赖管理
* 依赖指当前项目运行所需的jar，一个项目可以设置多个依赖
* 格式：
  ```xml
  <!--设置当前项目所依赖的所有jar-->
  <dependencies>

      <!--设置具体的依赖-->
      <dependency>
          <!--依赖所属群组id-->
          <groupId>org.springframework</groupId>
          <!--依赖所属项目id-->
          <artifactId>spring-webmvc</artifactId>
          <!--依赖版本号-->            
          <version>5.2.10.RELEASE</version>
      </dependency>
      
  </dependencies>
  ```
### 2-1. 依赖传递
#### 依赖具有传递性
* 直接依赖：在当前项目中通过依赖配置建立的依赖关系
* 间接依赖：被资源的资源如果依赖其他资源，当前项目间接依赖其他资源
#### 依赖传递冲突问题
* 路径优先：当依赖中出现相同的资源时，层级越深，优先级越低，层级越浅，优先级越高
* 声明优先：当资源在相同层级被依赖时，配置顺序靠前的覆盖配置顺序靠后的
* 特殊优先：当同级配置了相同资源的不同版本，后配置的覆盖先配置的
### 2-2. 可选依赖
* 可选依赖指对外隐藏当前所依赖的资源（不透明）
  ```xml
  <dependency>
      <groupId>com.beyond</groupId>
      <artifactId>maven_02_pojo</artifactId>
      <version>1.0-SNAPSHOT</version>
      <!--可选依赖是隐藏当前工程所依赖的资源，隐藏后对应资源将不再具有依赖传递性-->
      <optional>false</optional>
  </dependency>
  ```
### 2-3. 排除依赖
* 排除依赖指主动断开依赖的资源，被排除的资源无需指定版本（不需要）
  ```xml
  <dependency>
      <groupId>com.beyond</groupId>
      <artifactId>maven_03_dao</artifactId>
      <version>1.0-SNAPSHOT</version>
      <!--排除依赖是隐藏当前资源对应的依赖关系-->
      <exclusions>
          <exclusion>
              <groupId>org.mybatis</groupId>
              <artifactId>mybatis</artifactId>
          </exclusion>
      </exclusions>
  </dependency>
  ```
## 3. 继承与聚合
### 3-1. 聚合
* 聚合：将多个模块组织成一个整体，同时进行项目构建的过程称为聚合
* 聚合工程：通常是一个不具有业务功能的“空”工程（有且仅有一个pom文件）
* 作用：使用聚合工程可以将多个文件编组，通过对聚合工程进行构建，实现对所包含的模块进行同步构建
* 当工程中某个模块发生更新（变更）时，必须保障工程中与已更新模块关联的模块同步更新，此时可以使用聚合工程来解决批量模块同步构建的问题
#### 聚合步骤
1. 创建maven工程，设置打包类型为pom
   ```xml
   <packaging>pom</packaging>
   ```
2. 设置当前聚合工程所包含的子模块名称
   ```xml
    <modules>
        <module>../maven_01_ssm</module>
        <module>../maven_02_pojo</module>
        <module>../maven_03_dao</module>
    </modules>
   ```
### 3-2. 继承
* 继承描述的是两个工程间的关系，与java中的继承相似，子工程可以继承父工程中测配置信息，常见于依赖关系的继承
* 作用：
  * 简化配置
  * 减少版本冲突
#### 继承步骤
1. 创建maven模块，设置打包类型为pom
   ```xml
   <packaging>pom</packaging>
   ```
2. 在父工程的pom文件中配置依赖关系（子工程将延用父工程中的依赖关系）
   ```xml
    <dependencies>
        <!--...-->
    </dependencies>
   ```
3. 配置子工程中可选的依赖关系
   ```xml
    <dependencyManagement>
        <dependencies>
            <!--...-->
        </dependencies>
    </dependencyManagement>
   ```
4. 在子工程中配置当前工程所继承的父工程
   ```xml
   <!--定义该工程的父工程-->
   <parent>
       <groupId>com.beyond</groupId>
       <artifactId>maven_00_parent</artifactId>
       <version>1.0-SNAPSHOT</version>
       <!--填写父工程的pom文件-->
       <relativePath>../maven_00_parent</relativePath>
   </parent>
   ```
5. 在子工程中配置使用父工程中可选依赖的坐标(无需提供版本)
   ```xml
    <dependencies>
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>druid</artifactId>
        </dependency>
    </dependencies>
   ```
### 3-3. 继承与聚合的区别
1. 作用
   * 聚合用于快速构建项目
   * 继承用于快速配置
2. 相同点
   * 聚合与继承的pom.xml文件打包方式均为pom，可以将两种关系制作到同一个pom文件中
   * 聚合与继承均属于设计型模块，并无实际的模块内容
3. 不同点
   * 聚合是在当前模块中配置关系，聚合可以感知到参与聚合的模块有哪些
   * 继承是在子模块中配置关系，父模块无法感知哪些子模块继承了自己
## 4. 属性
### 4-1. 属性配置与使用
1. 定义属性
   ```xml
   <!--定义自定义属性-->
   <properties>
       <spring.version>5.2.10.RELEASE</spring.version>        
   </properties>
   ```
2. 引用属性
   ```xml
   <dependency>
       <groupId>org.springframework</groupId>
       <artifactId>spring-webmvc</artifactId>
       <version>${spring.version}</version>
   </dependency>
   ```
### 4-2. 资源文件引用属性
1. 定义属性
   ```xml
    <!--定义自定义属性-->
    <properties>
        <spring.version>5.2.10.RELEASE</spring.version>
        <jdbc.username>root</jdbc.username>
    </properties>
   ```
2. 在配置文件中引用属性
   ```properties
    jdbc.driver=com.mysql.cj.jdbc.Driver
    jdbc.url=jdbc:mysql://localhost:3306/mybatis?useSSL=false
    jdbc.username=${jdbc.username}
    jdbc.password=123456
   ```
3. 开启资源文件目录加载属性的过滤器
   ```xml
    <build>
        <resources>
            <resource>
                <directory>${project.basedir}/src/main/resources</directory>
                <filtering>true</filtering>
            </resource>
        </resources>
    </build>
   ```
### 4-3. 其他属性
### 4-4. 版本管理
#### 工程版本
* SNAPSHOT (快照版本)
  * 项目开发过程中临时输出的版本，称为快照版本
  * 快照版本会随着开发的进展不断更新
* RELEASE (发布版本)
  * 项目开发到进入阶段里程碑后，向团队外部发布较为稳定的版  本，这种版本所对应的构件文件是稳定的，即便进行功能的后续开发，也不会改变当前发布版本内容，这种版本称为发布版本
#### 发布版本
* alpha版
* beta版
* 纯数字版
## 5. 多环境配置与应用
1. 定义多环境
   ```xml
   <!--配置多环境-->
   <profiles>
       <!--开发环境-->
       <profile>
           <id>env_dep</id>
           <properties>
               <jdbd.url>jdbc:mysql://127.1.1.1:3306/mybatis</jdbd.url>
           </properties>
           <!--设置是否为默认启动环境-->
           <activation>
               <activeByDefault>true</activeByDefault>
           </activation>
       </profile>
       <!--生产环境-->
       <profile>
           <id>env_pro</id>
           <properties>
               <jdbd.url>jdbc:mysql://127.2.2.2:3306/mybatis</jdbd.url>
           </properties>
       </profile>
       <!--测试环境-->
       <profile>
           <id>env_test</id>
           <properties>
               <jdbd.url>jdbc:mysql://127.3.3.3:3306/mybatis</jdbd.url>
           </properties>
       </profile>
   </profiles>
   ```
2. 使用多环境（构建过程）
   ```mvn 指令 -p 环境定义id```
   范例 ```mvn install -p pro_env```
#### 跳过测试
```mvn 指令 -D skipTests```
范例 ```mvn install -D skipTests```
* 细粒度控制跳过测试
  ```xml
  <plugin>
      <artifactId>maven-surefire-plugin</artifactId>
      <version>2.22.1</version>
      <configuration>
          <!--设置跳过测试-->
          <skipTests>true</skipTests>
          <!--包含指定的测试用例-->
          <includes>
              <include>**/User*Tests.java</include>
          </includes>
          <!--排除指定的测试样例-->
          <excludes>
              <exclude>**/User*TestCase.java</exclude>
          </excludes>
      </configuration>
  </plugin>
  ```
## 6. 私服
