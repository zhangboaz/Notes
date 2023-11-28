## 1. 入门案例
* MyBatisPlus(简称MP)是基于MyBatis框架基础上开发的增强型工具，旨在简化开发，提高效率
1. 创建新模块，选择Spring初始化，并配置模块相关基础信息
2. 选择当前模块需要的技术集（仅保留JDBC）
3. 手动添加mp依赖
   ```xml
   <dependency>
       <groupId>com.baomidou</groupId>
       <artifactId>mybatis-plus-boot-starter</artifactId>
       <version>3.5.3.1</version>
   </dependency>
   ```
4. 设置JDBC参数（application.yml）
   ```yml
    spring:
    datasource:
        driver-class-name: com.mysql.cj.jdbc.Driver
        url: jdbc:mysql://localhost:3306/mybatisplus
        username: root
        password: 123456
        type: com.alibaba.druid.pool.DruidDataSource
   ```
5. 制作实体类与表结构（类名与表名对应，属性名与字段名对应）
6. 定义数据接口，继承BaseMapper<>
   ```java
    @Mapper
    public interface UserDao extends BaseMapper<User> {
    }
   ```
## 2. 标准数据层开发
### 2-1. 标准数据层CRUD功能

### 2-2. 分页查询
1. 设置分页拦截器作为Spring管理的bean
   ```java
   @Configuration
   public class MpConfig {
      @Bean
      public MybatisPlusInterceptor pageInterceptor(){
         MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
         interceptor.addInnerInterceptor(new PaginationInnerInterceptor());
         return interceptor;
      }
   }
   ```
2. 执行分页查询
   ```java
   Page page = new Page(1, 2);
   userDao.selectPage(page,null);
   System.out.println("当前页码：" + pagegetCurrent());
   System.out.println("每页数据量：" + pagegetSize());
   System.out.println("总页数：" + page.getPage());
   System.out.println("数据总量：" + pagegetTotal());
   System.out.println("当前页数据：" + pagegetRecords());
   ```
* 开启日志
  ```yml
   mybatis-plus:
   configuration:
      log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
  ```
## 3. DQL编程控制
### 3-1. 条件查询
* MyBatisPlus将书写复杂的SQL查询条件进行了封装，使用编程的形式完成查询条件的组合