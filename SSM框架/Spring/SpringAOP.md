## 1. AOP简介
* AOP 面向切面编程，一种编程范式，指导开发者如何组织程序结构
* 作用：在不惊动原始设计的基础上为其进行功能增强
## 2. AOP核心概念
* 连接点（JoinPoint）：程序执行过程中的任意位置，粒度为执行方法、抛出异常、设置变量等
  * 在SpringAOP中，理解为方法的执行
* 切入点（Pointcut）：匹配连接点的式子
  * 在SpringAOP中一个切入点可以描述一个具体方法，也可以匹配多个方法
* 通知（Advice）：在切入点处执行的操作，也就是共性功能
  * 在SpringAOP中，功能最终以方法的形式呈现
* 通知类：定义通知的类
* 切面（Aspect）：描述通知与切入点的对应关系
* 目标对象（Target）：原始功能去掉共性功能对应的类产生的对象，这种对象是无法直接完成最终工作的
* 代理（Proxy）：目标对象无法直接完成工作，需要对齐进行功能回填，通过原始对象的代理对象实现
## 3. AOP入门案例
1. 导入AOP相关坐标
   ```xml
    <dependency>
        <groupId>org.aspect j</groupId>
        <artifactId>aspectjweaver</artifactId>
        <version>1.9.4</version>
    </dependency>
   ```
   说明：spring-context坐标依赖spring-aop坐标
2. 定义通知类
   ```java
    public class MyAdvice {
        public void before(){
            System.out.println(System.currentTimeMillis());
        }
    }                             
   ```
3. 定义切入点
   ```java
    public class MyAdvice {
        @Pointcut("execution(void com.beyond.service.UserService.selectall())")
        private void pt(){};
    }
   ```
   * 说明：切入点定义依托一个不具有实际意义的方法进行，即无参数，无返回值，方法体无实际逻辑
4. 绑定切入点与通知关系，并指定通知添加到原始连接点的具体执行位置
   ```java
    public class MyAdvice {

        @Pointcut("execution(void com.beyond.service.UserService.selectall())")
        private void pt(){};

        @Before("pt()")
        public void before(){
            System.out.println(System.currentTimeMillis());
        }
    }
   ```
5. 定义通知类受Spring容器管理，并定义当前类为切面类
   ```java
    @Component
    @Aspect
    public class MyAdvice {
    }
   ```
6. Spring配置类里面添加`@EnableAspectJAutoProxy`
## 4. AOP工作流程
1. Spring容器启动
2. 读取所有切面配置中的切入点
3. 初始化bean，判定bean对应的类中的方法是否匹配到任意切入点
   * 匹配失败，创建对象
   * 匹配成功，创建原始对象（目标对象）的代理对象
4. 获取bean执行方法
   * 获取bean，调用方法并执行，完成操作
   * 获取的bean是代理对象时，根据代理对象的运行模式运行原始方法与增强的内容，完成操作                     
## 5. AOP切入点表达式
* 切入点：要进行增强的方法
* 切入点表达式：要进行增强的方法的描述方法
#### 切入点表达式标准格式
动作关键词(访问修饰符 返回值 包名.类/接口名.方法名(参数)异常名)
* 动作关键词：描述切入点的行为动作，例如execution表示执行到指定切入点
* 访问修饰符：public，private等，可以省略
* 异常名：方法定义中抛出指定异常，可以省略
#### 使用通配符描述切入点，快速描述
* `*` 单个独立的任意符号，可以独立出现，也可以作为前缀或者后缀的匹配符出现
* `..` 多个连续的任意符号，可以单独出现，常用于简化包名与参数的书写
* `+` 专用于匹配子类类型
#### 书写技巧
* 所有代码按照标准规范开发，否则以下技巧全部失效
* 描述切入点通常描述接口，而不描述实现类
* 返回控制修饰符针对接口开发均采用public描述（可省略访问控制修饰符描述）
* 返回值类型对于增删改查使用精准类型加速匹配，对于查询类使用*通配快速描述
* 包名书写尽量不使用..匹配，效率过低，通常使用*做单个包描述匹配，或精准匹配
* 接口名/类名书写名称与模块相关的采用`*`匹配，例如UserService书写成*Service，绑定业务层接口名
* 方法名书写以动词进行精准匹配，名词采用`*`匹配，例如getById书写成getBy*,selectAll书写成selectAll
* 参数规则较为复杂，根据业务方法灵活调整
* 通常不使用异常作为匹配规则
## 6. AOP通知类型
* AOP通知描述了抽取的共性功能，根据共性功能抽取的位置不同，最终运行代码时要将其加入到合理的位置
#### AOP通知分为五种类型
* 前置通知
  `@Before`
* 后置通知
  `@After`
* 环绕通知
  ```java
    @Around("pt()")
    public Object around(ProceedingJoinPoint pjp) throws Throwable {
        System.out.println("around before advice ...");
        Object ret = pjp.proceed();
        System.out.println("around after advice ...");
        return ret;
    }
  ```
  1. 环绕通知必须依赖形参ProceedingJoinPoint才能实现对原始方法的调用，进而实现原始方法调用前后同时添加通知
  2. 通知中如果未使用ProceedingJoinPoin对原始方法进行调用将跳过原始方法的执行
  3. 对原始方法的调用可以不接受返回值，通知方法设置成void即可，如果接收返回值，必须设定为Object类型
  4. 原始方法的返回值如果是void类型，通知方法的返回值类型可以设置成void，也可以设置成Object
  5. 由于无法预知原始方法运行后是否会抛出异常，因此环绕通知方法必须抛出Throwable对象
* 返回后通知
  `AfterReturning`
* 抛出异常后通知
  `AfterThrowing`
## 7. AOP通知获取数据
* 获取切入点方法的参数
  * `JoinPoint`：适用于前置、后置、返回后、抛出异常后通知
  * `ProceedJoinPoint`：适用于环绕通知
* 获取切入点方法返回值
  * 返回后通知
  * 环绕通知
* 获取切入点方法运行异常信息
  * 抛出异常后通知
  * 环绕通知
* JoinPoint对象描述了连接点方法的运行状态，可以获取到原始方法的调用参数
  ```java
  @Before("pt()")
  public void before(JoinPoint jp){
      Object[] args = jp.getArgs();
      System.out.println(Arrays.toString(args));
  }
  ```
* ProceedJoinPoint是JoinPoint的子类
  ```java
  @Around("pt()")
  public Object around(ProceedingJoinPoint pjp)throws Throwable {
      Object[] args = pjp.getArgs();
      System.out.println(Arrays.toString(args));
      Object ret = pjp.proceed();
      return ret;
  }
  ```
* 抛出异常后通知可以获取切入点方法中出现的异常信息，使用形参可以接受对应的异常信息
  ```java
  @AfterThrowing(value = "pt()",throwing = "t")
  public void afterThrowing(Throwable t){
      System.out.println("afterThrowing advice ..." + t);
  }
  ```
* 抛出异常后通知可以获取切入点方法运行的异常信息，使用形参可以接收运行时抛出的异常对象
  ```java
  @Around("pt()")
  public Object around(ProceedingJoinPoint pjp){
      Object ret = null;
      try{
          ret = pjp.proceed();
      } catch (Throwable t){
          t.printStackTrace();
      }
      return ret;
  }
  ```