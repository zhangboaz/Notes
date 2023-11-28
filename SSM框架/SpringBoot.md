## 1. 入门案例
* SpringBoot是由Pivotal团队提供的全新框架，其设计目的是用来简化Spring应用的初始搭建以及开发过程
1. 创建新模块，选择Spring初始化，并配置模块相关基础信息
2. 选择当前模块需要使用的技术集
3. 开发控制器类
4. 运行自动生成的Application类
* 最简SpringBoot程序所包含的基础文件
  * pom.xml文件
  * Application类
#### SpringBoot项目快速启动
1. 对SpringBoot项目打包（执行Maven构建指令package）
2. 执行启动指令
   ```java -jar springboot.jar```
* 打包之前确保有对应maven插件
  ```xml
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
  ```
## 2. SpringBoot简介
### 2-1. SpringBoot起步依赖
* starter
  * SpringBoot中常见项目名称，定义了当前项目使用的所有项目坐标，以达到减少依赖配置的目的
* parent
  * 所有SpringBoot项目要继承的项目，定义了若干个坐标版本号（依赖管理，而非依赖），以达到减少依赖冲突的目的
  * spring-boot-starter-parent(2.5.0)与spring-boot-parent(2.4.6)共有57处坐标版本不同
* 实际开发
  * 使用任意坐标时，仅书写GAV中额G和A，V由SpringBoot提供
  * 如发生坐标错误，再指定version（要小心版本冲突）
### 2-2. SpringBoot程序启动
* 启动方式
  ```java
  @SpringBootApplication
  public class Spring01QuickstartApplication {

      public static void main(String[] args) {
          SpringApplication.run(Spring01QuickstartApplication.class, args);
      }

  }
  ```
* SpringBoot在创建项目时，采用jar的打包方式
* SpringBoot的引导类是项目的入口，运行main方法就可以启动项目
## 3. 基础配置
### 3-1. 配置格式
SpringBoot提供了多种属性配置方式（优先级从高到低）
* application.properties
* application.yml
* application.yaml
### 3-2. yaml
* YAML，一种数据序列化格式
* 优点：
  * 容易阅读
  * 容易与脚本语言交互
  * 以数据为核心，重数据轻格式
* YAML文件扩展名
  * .yml（主流）
  * .yaml
### 3-3. yaml数据读取
* 使用@Value读取单个数据，属性名引用方式：${一级属性名.二级属性名...}
  ```java
  @Value("${lesson}")
  private String lesson;
  @Value("${server.port}")
  private String port;
  @Value("${enterprise.subject[0]}")
  private String subject01;
  ```
* 封装全部数据到Environment对象
  ```java
  @Autowired
  private Environment env;
  ```
  ```java
  System.out.println(env.getProperty("lesson"));
  System.out.println(env.getProperty("server.port"));
  System.out.println(env.getProperty("enterprise.subject[0]"));
  ```
* 自定义对象封装指定数据
  ```java
  @Component
  @ConfigurationProperties(prefix = "enterprise")
  public class Enterprise {
      private String name;
      private Integer age;
      private String[] subject;
  }
  ```
  ```java
  @Autowired
  private Enterprise enterprise;
  ```
### 3-4. 多环境配置
```yml
# 设置启用的环境
spring:
  profiles:
    active:  pro

---
# 开发
spring:
  config:
    activate:
      on-profile: dev
server:
  port: 80
---
# 生产
spring:
  config:
    activate:
      on-profile: pro
server:
  port: 81
---
# 测试
spring:
  config:
    activate:
      on-profile: test
server:
  port: 82
```
#### properties文件多环境启动
* 主启动配置文件application.properties
  ```properties
  spring.profiles.active=pro
  ```
* 环境分类配置文件application-pro.properties
  ```properties
  server.port=80
  ```
* 环境分类配置文件application-dev.properties
  ```properties
  server.port=81
  ```
* 环境分类配置文件application-test.properties
  ```properties
  server.port=82
  ```
### 3-5. 多环境启动命令格式
* 带参数启动SpringBoot
  ```cmd
  java -jar springboot.jar --spring.profiles.active=test
  ```
  ```cmd
  java -jar springboot.jar --server.port=88
  ```
  ```cmd
  java -jar springboot.jar --server.port=88 --spring.profiles.active=test
  ```
### 3-6. 多环境开发控制
Maven与SpringBoot多环境兼容
1. Maven中设置多环境属性
   ```xml
    <profiles>
        <profile>
            <id>dev_env</id>
            <properties>
                <profile.active>dev</profile.active>
            </properties>
            <activation>
                <activeByDefault>true</activeByDefault>
            </activation>
        </profile>
        <profile>
            <id>pro_env</id>
            <properties>
                <profile.active>pro</profile.active>
            </properties>
        </profile>
        <profile>
            <id>test_env</id>
            <properties>
                <profile.active>test</profile.active>
            </properties>
        </profile>
    </profiles>
   ```
2. SpringBoot中引用Maven属性
   ```yml
    # 设置启用的环境
    spring:
      profiles:
        active: ${profile.active}

    ---
    # 开发
    spring:
      config:
        activate:
          on-profile: dev
    server:
      port: 80
    ---
    # 生产
    spring:
      config:
        activate:
          on-profile: pro
    server:
      port: 81
    ---
    # 测试
    spring:
      config:
        activate:
          on-profile: test
    server:
      port: 82

   ```
4. 对资源文件开启对默认占位符的解析
   ```xml
   <plugin>
       <groupId>org.apache.maven.plugins</groupId>
       <artifactId>maven-resources-plugin</artifactId>
       <version>3.3.1</version>
       <configuration>
           <encoding>UTF-8</encoding>
           <useDefaultDelimiters>true</useDefaultDelimiters>
       </configuration>
   </plugin>
   ```
### 3-7. 配置文件分类
* SpringBoot中4级配置文件
  1. file:config/application.yml（最高）
  2. file:application.yml
  3. classpath:config/application.yml
  4. classpath:application.yml（最低）
* 作用：
  * 1级与2级留作系统打包后设置通用属性
  * 3级与4级用于系统开发阶段设置通用属性
## 4. 整合第三方技术
### 4-1. 整合Junit
```java
@SpringBootTest
class Springboot04IntegrateApplicationTests {

    @Autowired
    private BookService bookService;

    @Test
    void contextLoads() {
        bookService.save();
    }

}
```
### 4-2. 整合Mybatis
1. 创建新模块，选择Spring初始化，并设置模块相关基础信息
2. 选择当前模块需要使用的技术集（mybatis,mysql）
3. 设置数据源参数
   ```yml
    spring:
      datasource:
        driver-class-name: com.mysql.cj.jdbc.Driver
        url: jdbc:mysql://localhost:3306/mybatis
        username: root
        password: 123456
        type: com.alibaba.druid.pool.DruidDataSource
   ```
4. 定义数据层接口与映射配置
   ```java
    @Mapper
    public interface BookDao {

        @Select("select * from tb_book where id = #{id}")
        public Book getById(Integer id);

    }
   ```
### 4-3. SpringBoot的SSM整合
