## 1. SSM整合流程
### 1-1. 创建工程
1. 创建Maven webapp过程
2. 导入相关坐标
   * `spring-mvcapp`
   * `spring-jdbc`
   * `spring-test`
   * `mybatis`
   * `mybatis-spring`
   * `mysql-connector-java`
   * `druid`
   * `junit`
   * `servlet-api`
   * `jackson-databind`
3. 导入tomcat插件
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
### 1-2. SSM整合
* Spring
  * SpringConfig
* MyBatis
  * MybatisConfig
  * JdbcConfig
  * jdbc.properties
* SpringMVC
  * ServletConfig
  * SpringMvcConfig
### 1-3. 功能模块
* 表与实体类
* dao（接口+实现类）
* servlet（接口+实现类）
  * 业务层接口测试（整合Junit）
* controller
  * 表现层接口测试（PostMan）
#### 项目结构
```
ssm/
|-- src/
|   |-- main/
|   |   |-- java/
|   |   |   |-- com/
|   |   |   |   |-- beyond/
|   |   |   |   |   |-- config/
|   |   |   |   |   |-- controller/
|   |   |   |   |   |-- dao/
|   |   |   |   |   |-- domain/
|   |   |   |   |   |-- service/
|   |   |   |   |   |   |-- impl
|   |   |   |-- resources/
|   |-- test/
|-- webapp/
|   |-- WEB-INF/
|-- target/
|-- pom.xml
```
## 2. 表现层数据封装
* 设置统一数据返回结果类
  ```java
  public class Result {
      private Integer code;
      private Object data;
      private String msg;
  }
  ```
* 设置统一数据返回结果编码
  ```java
  public class Code {
      public static final Integer SAVE_OK = 20011;
      public static final Integer DELETE_OK = 20021;
      public static final Integer UPDATE_OK = 20031;
      public static final Integer GET_OK = 20041;

      public static final Integer SAVE_ERR = 20010;
      public static final Integer DELETE_ERR = 20020;
      public static final Integer UPDATE_ERR = 20030;
      public static final Integer GET_ERR = 20040;
  }
  ```
* 根据情况设定合理的Result
  ```java
  @GetMapping("/{id}")
  public Result getByIed(@PathVariableInteger id) {
      Book book = bookService.getById(id);
      Integer code = book != null ? Code.GET_OK : Code.GET_ERR;
      String msg = book != null ? "" : "数据查询失败，请重试！";
      return new Result(code, book, msg);
  }
  ```
## 3. 异常处理器
### 3-1. 出现异常现象的常见位置与常见诱因
* 框架内部抛出的异常:因使用不合规导致
* 数据层抛出的异常:因外部服务器故障导致(例如: 服务器访问超时)
* 业务层抛出的异常:因业务逻辑书写错误导致(例如: 遍历业务书写操作，导致索引异常等)
* 表现层抛出的异常:因数据收集、校验等规则导致(例如:不配的数据类型间导致异常)
* 工具类抛出的异常:因工具类书写不严谨不够健壮导致(例如:必要释放的连接长期未释放等)
### 3-2. 集中的、统一的处理项目中出现的异常
```java
@RestControllerAdvice
public class ProjectExceptionAdvice {
    @ExceptionHandler(Exception.class)
    public Result doException(Exception ex){
        System.out.println("有异常");
        return new Result(666, null);
    }
}
```
### 3-3. 项目异常分类
* 业务异常 `BusinessException`
  * 规范的用户行为产生的异常
  * 不规范的用户行为操作产生的异常
* 系统异常 `SystemException`
  * 项目运行过程中可预计且无法避免的异常
* 其他异常 `Exception`
  * 编程人员未预期到的异常
### 3-4. 项目异常处理方案
* 业务异常 `BusinessException`
  * 发送对应消息传递给用户，提醒规范操作
* 系统异常 `SystemException`
  * 发送固定消息传递给用户，安抚用户
  * 发送特定消息给运维人员，提醒维护
  * 记录日志
* 其他异常 `Exception`
  * 发送固定消息传递给用户，安抚用户
  * 发送特定消息给编程人员，提醒维护（纳入预期范围内）
  * 记录日志
### 3-5. 项目异常处理
1. 自定义项目系统级异常
   ```java
    public class SystemException extends RuntimeException{
        private Integer code;

        public SystemException(Integer code, String message) {
            super(message);
            this.code = code;
        }

        public SystemException(Integer code, String message, Throwable cause) {
            super(message, cause);
            this.code = code;
        }

        public Integer getCode() {
            return code;
        }

        public void setCode(Integer code) {
            this.code = code;
        }
    }
   ```
2. 自定义项目业务级异常
   ```java
    public class BusinessException extends RuntimeException{
        private Integer code;

        public BusinessException(Integer code, String message) {
            super(message);
            this.code = code;
        }

        public BusinessException(Integer code, String message, Throwable cause) {
            super(message, cause);
            this.code = code;
        }

        public Integer getCode() {
            return code;
        }

        public void setCode(Integer code) {
            this.code = code;
        }
    }
   ```
3. 自定义异常编码
   ```java
    public static final Integer SYSTEM_UNKNOW_ERROR = 50001;
    public static final Integer SYSTEM_TIMEOUT_ERROR = 50002;

    public static final Integer PROJECT_VALIDATE_ERROR = 60001;
    public static final Integer PROJECT_BUSINESS_ERROR = 60002;
   ```
4. 触发自定义异常
   ```java
    public Book getById(Integer id) {
        if(id < 0){
            throw new BusinessException(Code.PROJECT_BUSINESS_ERROR, "请勿进行非法操作！");
        }
        return bookDao.getById(id);
    }
   ```
5. 拦截并处理异常
   ```java

   ```