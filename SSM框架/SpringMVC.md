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
### 2-2. SpringMVC解决Post请求中文乱码问题
```java
// 乱码处理
@Override
protected Filter[]getServletFilters() {
    CharacterEncodingFilter filter = new CharacterEncodingFilter();
    filter.setEncoding("UTF-8");
    return new Filter[]{filter};
}
```
### 2-3. 请求参数
1. 普通参数：url地址传参，地址参数名与形参变量名相同，定义形参即可接收参数
   * 请求参数名与形参变量名不同，使用@RequestParam绑定参数关系
2. POJO参数：请求参数名与形参对象属性名相同，定义POJO类型形参即可接收参数
3. 数组传参：请求参数名与形参对象属性名形同且请求参数为多个，定义数组类型形参即可接收参数
4. 集合保存普通参数：请求参数名与形参集合对象名相同且请求参数为多个，@RequestParam绑定参数关系
### 2-4. 请求参数（传递json数据）
1. 添加json数据转换相关坐标
   ```xml
    <dependency>
      <groupId>com.fasterxml.jackson.core</groupId>
      <artifactId>jackson-databind</artifactId>
      <version>2.14.2</version>
    </dependency>
   ```
2. 设置发送json数据（请求body中添加json数据）
3. 开启自动转换json数据的支持
   ```java
  @Configuration
  @ComponentScan("com.beyond.controller")
  @EnableWebMvc
  public class SpringMvcConfig {
  }
   ```
4. 设置接收json数据
```java
@RequestMapping("/jsondemo")
@ResponseBody
public String jsondemo(@RequestBody List<String> likes){
    System.out.println(likes);
    return "yes";
}
```
### 2-5. 日期类型参数传递
接收形参时，根据不同的日期格式设置不同的接收方式
```java
@RequestMapping("/dateParam")
@ResponseBody
public String dateParam(Date date,
                        @DateTimeFormat(pattern = "yyyy-MM-dd") Date date1,
                        @DateTimeFormat(pattern = "yyyy/MM/dd HH:mm:ss") Date date2){
    System.out.println("date => " + date);
    System.out.println("date(yyyy-MM-dd) => " + date1);
    System.out.println("date(yyyy/MM/dd HH:mm:ss) => " + date2);
    return "{'module':'dataParam'}";
}
```
### 2-6. 响应
* 响应页面
  ```java
  @RequestMapping("/toPage")
  public String toPage(){
      return "page.jsp";
  }
  ```
* 响应文本数据
  ```java
  @RequestMapping("/toText")
  @ResponseBody
  public String toPage(){
      return "response text";
  }
  ```
* 响应json数据（对象转json）
  ```java
  @RequestMapping("/toJsonPOJO")
  @ResponseBody
  public User toJsonPOJO(User user){
      return user;
  }
  ```
## 3. REST风格
### 3-1. REST简介
* REST（Representational State Transfer）：表现形式状态转换
* 优点
  * 隐藏资源的访问行为，无法通过地址得知对资源是何种操作
  * 书写简化
* 按照REST风格访问资源时使用行为动作区分对资源进行了何种操作
  * GET（查询）
  * POST（新增/保存）
  * PUT（修改/更新）
  * DELETE（删除）
* 根据REST风格对资源进行访问称为RESTful
### 3-2. 入门案例
1. 设定http请求动作（动词）
   ```java
  @RequestMapping(value = "/users", method =RequestMethod.POST)
  @ResponseBody
  public String save(@RequestBody User user){
      System.out.println("user save ..." + user);
      return "{'module':'user save'}";
  }

  @RequestMapping(value = "/users", method =RequestMethod.PUT)
  @ResponseBody
  public String update(@RequestBody User user){
      System.out.println("user update ..." + user);
      return "{'module':'user update'}";
  }
   ```
2. 设置请求参数（路径变量）
  ```java
  @RequestMapping(value = "/users/{id}", method =RequestMethod.DELETE)
  @ResponseBody
  public String delete(@PathVariable Integer id){
      System.out.println("user delete ..." + id);
      return "{'module':'user delete'}";
  }
  ```
#### @RequestBody @RequestParam @PathVariable
* 区别
  * @RequestParam用于接收url地址传参或表单传参
  * @RequestBody用于接收json数据
  * @PathVariable用于接收路径参数，使用（参数名称）描述路径参数
* 应用
  * 后期开发中，发送请求参数超过一个时，以json格式为主，@RequestBody应用较广
  * 如果发送非json格式数据，选用@RequestParam接收请求参数
  * 采用RESTful进行开发，当参数数量较少时，例如一个，可以采用@PathVariable接收请求路径变量，通常用于传递id值
### 3-3. RESTful快速开发
1. @RestController
   * 位置：基于SpringMVC的RESTful开发控制器类定义上方
   * 作用：设置当前控制器类为RESTful风格，等同于@Controller与@ResponseBody两个注解组合开发
2. @GetMapping @PostMapping @PutMapping @DeleteMapping
   * 位置：基于SpringMVC的RESTful开发控制器方法定义上方
   * 作用：设置当前控制器方法请求访问路径与请求动作，每种对应一个请求动作

### 3-4. 设置静态资源的访问放行
```java
public class SpringMvcSupport extends WebMvcConfigurationSupport {
    @Override
    protected void addResourceHandlers(ResourceHandlerRegistry registry) {
        //当访问/pages/????时候，走/pages目录下的内容
        registry.addResourceHandler("/pages/**").addResourceLocations("/pages/");
        registry.addResourceHandler("/js/**").addResourceLocations("/js/");
        // ......
    }
}
```