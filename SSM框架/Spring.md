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


## 2. Spring快速入门
### 2-1. Spring 程序开发步骤
1. 导入Spring开发的基本包坐标
2. 编写Bean
3. 创建Spring核心配置文件（applicationContext.xml）
4. 在Spring配置文件中配置
5. 使用Spring的API获得Bean实例（创建ApplicationContext对象getBean）
## 3. Spring配置文件
### 3-1. Bean标签基本配置
用于配置对象交由Spring来创建
默认情况下它调用的是类中的无参构造函数，如果没有无参构造函数则不能创建成功
#### 基本属性
* `id` Bean实例在Spring容器中的唯一标识
* `class` Bean的全限定名称
### 3-2. Bean标签范围配置
`scope` 指对象的作用范围
#### 取值
* `singleton` 默认值
  * Bean的实例化个数：1个
  * Bean实例化时机：当Spring核心文件被加载时，实例化配置的Bean实例
  * Bean生命周期
    1. 对象创建：当应用加载，创建容器时，对象就被创建了
    2. 对象运行：只要容器在对象一直活着
    3. 对象销毁：当应用卸载，销毁容器时，对象就被销毁了 
* `prototype`
  * Bean的实例化个数：多个
  * Bean实例化时机：当调用`getBean()`方法时，实例化配置的Bean实例
  * Bean生命周期
    1. 对象创建：当使用对象时，创建新的对象实例
    2. 对象运行：只要对象在使用中，就一直活着
    3. 对象销毁：当对象长时间不用时，被Java的垃圾回收器回收了
### 3-3. Bean生命周期配置
* `init-method` 指定类中的初始化方法名称
* `destroy-method` 指定类中销毁方法名称
### 3-4. Bean实例化三种方式
1. 无参构造方法实例化
2. 工厂静态方法实例化
3. 工厂实例方法实例化
### 3-5. Bean的依赖注入
依赖注入：它是Spring框架核心IOC的具体体现
在编写程序时，通过控制反转，把对象的创建交给了Spring，但是代码中不可能出现没有依赖的情况。IOC解耦只是降低他们的依赖关系，但不会消除。例如：业务层仍会调用持久层的方法
#### 注入方式
##### 1. 构造方法
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
##### 2. set方法
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
#### 注入的数据类型
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
### 3-6. 引入其他配置文件（分模块开发）