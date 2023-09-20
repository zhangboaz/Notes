## 1. Spring简介
Spring是分层的Java SE/EE应用full-stack轻量级开源框架，以loC（反转控制）和AOP（面向切面编程）为内核
### 1-1. Spring 优势
1. 方便解耦，简化开发
2. AOP编程的支持
3. 声明式事务的支持
4. 方便程序的测试
5. 方便集成各种优秀框架
6. 降低 JavaEE API 的使用难度
7. Java源码是经典学习典范
### 1-2. Spring 体系结构

<img src="D:\User\Pictures\Screenshots\Snipaste_2023-09-18_23-55-51.png" alt="Snipaste_2023-09-18_23-55-51"  />

### 1-3. 核心概念
* IoC(Inversion of Control)控制反转
  * 使用对象时，由主动new产生对象转换为由外部提供对象，此过程中对象创建控制权由程序转移到外部，此思路称为控制反转
* Spring技术对IoC思想进行了实现
  * Spring提供了一个容器，称为IoC容器，用来充当IoC思想中的“外部”
  * IoC容器负责对对象的创建，初始化等一系列工作，被创建或被管理的对象在IoC容器中统称为`bean`
* DI(Dependency Injection)依赖注入
  * 在容器中建立bean与bean之间依赖关系的整个过程，称为依赖注入
* 目标：充分解耦
  * 使用IoC容器管理bean（IoC）
  * 在IoC容器内将有依赖关系的bean进行关系绑定（DI）
* 最终效果
  * 使用对象时不仅可以直接从IoC容器中获取，并且获取到的bean已经绑定了所有的依赖关系
## 2. Spring快速入门
### 2-1. IoC入门案例
1. 导入Spring坐标
   ```xml
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-context</artifactId>
        <version>5.2.10.RELEASE</version>
    </dependency>
   ```
2. 定义Spring管理的类（接口）
3. 创建Spring核心配置文件（applicationContext.xml）
4. 在Spring配置文件中配置
   ```xml
    <bean id="userService" class="com.beyond.serviceimpl.UserServiceImpl"/>
   ```
5. 初始化IoC容器（Spring核心容器/Spring容器），通过容器获取bean
   ```java
    public class UserController {
        public static void main(String[] args) {
            ApplicationContext ctx = new    ClassPathXmlApplicationContext("applicationContext.xml");
            UserService userService = (UserService) ctx.getBean ("userService");
            userService.save();
        }
    }
   ```
### 2-1. DI入门案例
1. 提供依赖对象对应的setter方法
   ```java
    public class UserServiceImpl implements UserService {

    private UserDao userDao;

    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }

    public void save() {
        userDao.save();
    }
    }
   ```
2. 配置service与dao之间的关系
   ```xml
    <bean id="userDao" class="com.beyond.dao.implUserDaoImpl"></bean>
    <bean id="userService" class="com.beyond.serviceimpl.UserServiceImpl">
        <property name="userDao" ref="userDao"></property> // name为set方法名
    </bean>
   ```
## 3. bean配置
### 3-1. bean基础配置
#### 属性
* `id` bean的id，使用容器可以通过id值获取对应的bean，在一个容器中id值唯一
* `class` bean的类型，即配置的bean的全路径类名
#### 功能
定义Spring核心容器管理的对象
### 3-2. bean别名配置
#### 属性
* `name`
#### 功能
定义bean的别名，可定义多个，使用逗号，分号或空格分隔
### 3-2. Bean作用范围配置
#### 属性
* `scope` 指对象的作用范围定义bean的作用范围
#### 取值
* `singleton` 默认值
  * bean的实例化个数：1个
  * bean实例化时机：当Spring核心文件被加载时，实例化配置的bean实例
  * bean生命周期
    1. 对象创建：当应用加载，创建容器时，对象就被创建了
    2. 对象运行：只要容器在对象一直活着
    3. 对象销毁：当应用卸载，销毁容器时，对象就被销毁了 
* `prototype`
  * bean的实例化个数：多个
  * bean实例化时机：当调用`getBean()`方法时，实例化配置的bean实例
  * bean生命周期
    1. 对象创建：当使用对象时，创建新的对象实例
    2. 对象运行：只要对象在使用中，就一直活着
    3. 对象销毁：当对象长时间不用时，被Java的垃圾回收器回收了
### 3-3. Bean生命周期控制
* `init-method` 指定类中的初始化方法名称
* `destroy-method` 指定类中销毁方法名称（容器关闭前触发）
* 接口控制：实现`InitializingBean`,`DisposableBean`接口
>> 关闭容器方式
>> * 手动关闭容器
>>   `ClassPathXmlApplicationContext`接口`close()`操作
>> * 注册关闭钩子，在虚拟机推出前先关闭容器再退出虚拟机
>>   `ClassPathXmlApplicationContext`接口`registerShutdownHook()`操作
## 4. bean实例化
bean本质上就是对象，创建bean使用构造方法完成
### 实例化bean的三种方式
#### 1. 构造方法
* 提供可访问的构造方法
  ```java
  public class UserServiceImpl implements   UserService {

      public UserServiceImpl() {
      }

      public void save() {
          userDao.save();
      }
  }
  ```
* 配置
  ```xml
        <bean id="userService" class="com.beyond.service.impl.UserServiceImpl">
        </bean>
  ```
#### 2. 静态工厂
#### 3. 实例工厂
#### 4. FactoryBean
## 5. 依赖注入方式
### 5-1. 注入方式
#### set方法
**set方法注入**
1. 在Service层设置set方法
     ```java
     private UserDao userDao;
     public void setUserDao(UserDao userDao) {
         this.userDao = userDao;
     }
     ```
2. 在Spring配置文件中配置
     ```xml
     <bean id="userDao" class="com.beyond.dao.impl.UserDaoImpl"></bean>
     <bean id="userService" class="com.beyond.service.impl.UserServiceImpl">
         <property name="userDao" ref="userDao"></property> // name为set方法名
     </bean>
     ```
**P命名空间注入**
P命名空间注入本质也是set方法注入，但比上述set方法更加方便，主要体现在配置文件中
1. 需要引入P命名空间
   ```
    xmlns:p="http://www.springframework.org/schema/p"
   ```
2. 修改注入方式
   ```xml
    <bean id="userService" class="com.beyond.service.impl.UserServiceImpl" p:userDao-ref="userDao"/>
   ```
#### 构造方法
1. 在Service层设置构造方法
   ```java
    private UserDao userDao;

    public UserServiceImpl(UserDao userDao) {
        this.userDao = userDao;
    }

    public UserServiceImpl() {}
   ```
2. 在Spring配置文件中配置
   ```xml
    <bean id="userService" class="com.beyondservice.impl.UserServiceImpl">
        <constructor-arg name="userDao" ref="userDao"></constructor-arg>
    </bean>
   ```
### 5-2. 注入的数据类型
上述都是注入的引用Bean，除了对象的引用可以注入，普通数据类型，集合等都可以在容器中进行注入
* 引用数据类型
* 普通数据类型（set方法）
  1. 给普通数据类型设置set方法
    ```java
    private String name;
    private int age;

    public void setName(String name) {
        this.name = name;
    }

    public void setAge(int age) {
        this.age = age;
    }
    ```
  2. 在Spring配置文件中配置
    ```xml
    <bean id="userDao" class="com.beyond.dao.impl.UserDaoImpl">
        <property name="name" value="张三"></property>
        <property name="age" value="18"></property>
    </bean>
    ```
* 集合数据类型（set方法）
  1. 给集合数据类型设置set方法
    ```java
    private List<String> strList;
    private Map<String, User> userMap;
    private Properties properties;

    public void setStrList(List<String> strList) {
        this.strList = strList;
    }

    public void setUserMap(Map<String, User> userMap) {
        this.userMap = userMap;
    }

    public void setProperties(Properties properties) {
        this.properties = properties;
    }
    ```
  2. 在Spring配置文件中配置
    ```xml
    <bean id="userDao" class="com.beyond.dao.impl.UserDaoImpl">
        <property name="strList">
            <list>
                <value>aaa</value>
                <value>bbb</value>
                <value>ccc</value>
            </list>
        </property>
        <property name="userMap">
            <map>
                <entry key="user1" value-ref="user1"></entry>
                <entry key="user2" value-ref="user2"></entry>
            </map>
        </property>
        <property name="properties">
            <props>
                <prop key="p1">ppp1</prop>
                <prop key="p2">ppp2</prop>
            </props>
        </property>
    </bean>
    ```
### 5-3. 依赖注入方式选择
1. 强制依赖使用构造器进行，使用setter注入有概率不进行注入导致nu11对象出现
2. 可选依赖使用setter注入进行，灵活性强
3. Spring框架倡导使用构造器，第三方框架内部大多数采用构造器注入的形式进行数据初始化，相对严谨
4. 如果有必要可以两者同时使用，使用构造器注入完成强制依赖的注入，使用setter注入完成可选依赖的注入
5. 实际开发过程中还要根据实际情况分析，如果受控对象没有提供setter方法就必须使用构造器注入
6. 自己开发的模块推荐使用setter注入
### 5-4. 依赖自动装配
IoC容器根据bean所依赖的资源在容器中自动查找并注入到bean中的过程称为自动装配
#### 自动装配方式
1. 按类型
2. 按名称
3. 按构造方法
4. 不启用自动装配
#### 自动装配配置
配置中使用`bean`标签`autowire`属性设置自动装配的类型
```xml
<bean id="userDao" class="com.beyond.dao.implUserDaoImpl"/>
<bean id="userService" class="com.beyondservice.impl.UserServiceImpl"autowire="byType"/>
```
#### 自动装配注意事项
* 自动装配用于引用类型依赖注入，不能对简单类型进行操作
* 使用按类型装配时( byType )必须保障容器中相同类型的bean唯一，推荐使用
* 使用按名称装配时( byName )必须保障容器中具有指定名称的bean，因变量名与配置合，不推荐使用
* 自动装配优先级低于setter注入与构造器注入，同时出现时自动装配配置失效
## 6. 加载properties文件
1. 开启context命名空间
   ```xml
    <beans xmlns="http://www.springframework.org/   schema/beans"
           xmlns:xsi="http://www.w3.org/2001/   XMLSchema-instance"
           xmlns:context="http://www.springframework.   org/schema/context"
           xsi:schemaLocation="
           http://www.springframework.org/schema/beans
           http://www.springframework.org/schema/beans/ spring-beans.xsd
           http://www.springframework.org/schema/   context
           http://www.springframework.org/schema/   context/spring-context.xsd">
    </bean>
   ```
2. 使用context命名空间，加载指定properties文件
   ```xml
    <context:property-placeholder location="jdbc.properties"/>
   ```
3. 使用${}读取加载的属性值
   ```xml
    <property name="username" value="${jdbc.username}"/>
   ```
* 不加载系统属性
  ```xml
    <context:property-placeholder location="jdbc.properties" system-properties-mode="NEVER"/>
  ```
* 加载多个properties文件
  ```xml
    <context:property-placeholder location="jdbc.properties,msg.properties"/>
  ```
* 加载所有properties文件
  ```xml
    <context:property-placeholder location="*.properties"/>
  ```
* 加载properties文件标准格式
  ```xml
    <context:property-placeholder location="classpath:*.properties"/>
  ```
* 从类路径或jar包中搜索并加载properties文件
  ```xml
    <context:property-placeholder location="classpath*:*.properties"/>
  ```
## 7. 容器
### 7-1. 创建容器
1. 类路径加载配置文件
   ```java
    ApplicationContext ctx = new ClassPathXmlApplicationContext("applicationContext.xml");
   ```
2. 文件路径加载配置文件
   ```java
    ApplicationContext ctx = new FileSystemXmlApplicationContext("D:\\applicationContext.xml");
   ```
3. 加载多个配置文件
    ```java
    ApplicationContext ctx = new ClassPathXmlApplicationContext("bean1.xml", "bean2.xml");
   ```
### 7-2. 获取bean
1. 使用bean名称获取
   ```java
    UserService userService = (UserService) app.getBean("userService");
   ```
2. 使用bean名称获取并指定类型
   ```java
    UserService userService =app.getBean("userService", UserService.class);
   ```
3. 使用bean类型获取
   ```java
    UserService userService =app.getBean(UserService.class);
   ```