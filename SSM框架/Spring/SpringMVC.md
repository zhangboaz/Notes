## 1. SpringMVC概述
* SpringMVC是一种基于Java实现MVC模型的轻量级Web框架
* 优点
  * 使用简单，开发便捷（相比于Servlet）
  * 灵活性强
## 2. SpringMVC入门案例
1. 使用SpringMVC技术需要先导入SpringMVC坐标与Servlet坐标
   ```xml
    <dependency>
        <groupId>javax.servlet</groupId>
        <artifactId>javax.servlet-api</artifactId>
        <version>3.1.0</version>
        <scope>provided</scope>
    </dependency>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-webmvc</artifactId>
        <version>5.2.10.RELEASE</version>
    </dependency>
   ```
2. 创建SpringMVC控制器类（等同于Servlet功能）
   ```java
    @Controller
    public class UserController {
        @RequestMapping("/save")
        @ResponseBody
        public String save(){
            System.out.println("user save ...");
            return "{'info':'springmvc'}";
        }
    }
   ```
3. 初始化SpringMVC环境（同Spring环境），设定SpringMVC加载对应的bean
   ```java
    @Configuration
    @ComponentScan("com.beyond.controller")
    public class SpringMvcConfig {
    }
   ```
4. 初始化Servlet容器，加载SpringMVC环境，并设置SpringMVC技术处理的请求
   ```java
    public class ServletContainersInitConfig extends AbstractDispatcherServletInitializer {
        @Override
        protected WebApplicationContext createServletApplicationContext() {
            AnnotationConfigWebApplicationContext ctx = new AnnotationConfigWebApplicationContext();
            ctx.register(SpringMvcConfig.class);
            return ctx;
        }

        @Override
        protected String[] getServletMappings() {
            return new String[]{"/"};
        }

        @Override
        protected WebApplicationContext createRootApplicationContext() {
            return null;
        }
    }
   ```
* tomcat
  ```xml
    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.tomcat.maven</groupId>
                <artifactId>tomcat7-maven-plugin</artifactId>
                <version>2.1</version>
                <configuration>
                    <port>80</port>
                    <path>/</path>
                </configuration>
            </plugin>
        </plugins>
    </build>
  ```
#### 启动服务器初始化过程
1. 服务器启动，执行ServletContainersInitConfig类，初始化web容器
2. 执行createServletApplicationContext类，创建了WebApplicationContext对象
3. 加载SpringMvcConfig
4. 执行@ComponentScan加载对应的bean
5. 加载UserController，每个@RequestMapping的名称对应一个具体的方法
6. 执行getServletMappings方法，定义所有的请求都通过SpringMVC
#### 单次请求过程
1. 发送请求localhost/save
2. web容器发现所有请求都经过SpringMVC，将请求交给SpringMVC处理
3. 解析请求路径/save
4. 由/save匹配执行对应的方法save()
5. 执行save()
6. 检测到有@ResponseBody直接将save()方法的返回值作为响应请求体返回给请求方
#### Controller加载控制与业务bean加载控制
* SpringMVC相关bean（表现层bean）
* Spring控制的bean
  * 业务bean（Service）
  * 功能bean（DataSource等）
* SpringMVC相关bean加载控制
  * SpringMVC加载的bean对应的包均在com.beyond.controller包内
* Spring相关bean加载控制
  * 方式一：Spring加载的bean设定扫描范围为com.beyondm，排除controller包内的bean
    ```java
    @ComponentScan(value = "com.beyond",
        excludeFilters = @ComponentScan.Filter(
                type = FilterType.ANNOTATION,
                classes = Controller.class
        ))
    ```
  * 方式二：Spring加载的bean设定扫描范围为精准范围，例如service包、dao包等 
    ```java
    @ComponentScan({"com.beyond.service","com.beyond.dao"})
    ```
  * 方式三：不区分Spring与SpringMVC的环境，加载到同一个环境中
## 2. 请求与响应
### 2-1. 请求映射路径
* 名称：`@RequestMapping`
* 类型：方法注解 类注解
* 位置：SpringMVC控制器方法定义上方
* 作用：设置当前控制器方法请求访问路径，如果设置在类上统一设置当前控制器方法请求访问路径前缀
* 范例：
  ```java
  @Controller
  @RequestMapping("/user")
  public class UserController {
      @RequestMapping("/save")
      @ResponseBody
      public String save(){
          System.out.println("user save ...");
          return "{'info':'springmvc'}";
      }
  }
  ```
* 属性
  * value（默认）：请求访问路径，或访问路径前缀
### 2-2.