# 字节直通车复习大纲

## 1. Css

   1. 常用的Css属性的值及含义
      - position：relative absolute fixed static sticky(粘性定位)
      - display：none block inline-block table table-cell flex grid
      - float：right left none 
      - padding：padding-right padding-left padding-top padding-bottom
      - margin
      - border
      - overflow： hidden  visible(默认) inherit(继承父元素的属性值) auto scroll
      - transform：translate rotate
      - background
      - width：fit-content(宽度以内容宽度为准)、min-content(宽度以盒子中最小内容宽度为准)、max-content(宽度以盒子中最大内容宽度为准)、fill-available(默认属性，自动充满剩余空间)
      
   2. 垂直水平居中布局实现

      - ```css
        <div class="divF">
          <div class="divS"></div>
        </div>
        .divF {
            display: flex;
            justify-content: center;
            align-items: center;
         }
        ```
        
      - ```css
        .divF {
            display: grid;
            justify-content: center;
            align-items: center;
            /*place-content: center center*/
        }
        ```

      - ```css
        .divF {
        	position: relative;
        }
        .divS {
        	position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%)
        }
        ```

      - ```css
        .divF {
        	position: relative;
        }
        .divS {
            height: 50%; // 高度必须声明
        	position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
        }
        ```

   3. Padding、Margin百分比取值依据

      直接父元素的宽度

   4. 为什么Margin 不能纵向取Auto

      块级元素在垂直方向上不能填充剩余空间，因此无法做到垂直居中

   5. BFC(block formatting context )块级格式化上下文

      - 概念：形成一个完全独立的空间，使当前盒子不会影响到页面中其他元素的布局

      - 触发方式：

        1. overflow属性不为visible
        2. display属性为inline-block、table-cell
        3. position属性为absolute、fixed
        4. float属性不为none

      - 处理问题

        1. 高度塌陷

           ```html
           <!--问题案例--> 
           <div class="divF">
               <div class="divS">子元素</div>
               <div class="divS">子元素</div>
               <div class="divS">子元素</div>
               <div class="divS">子元素</div>
             </div>
             
             <style>
               .divF {
                 background-color: red;
               }
               .divS {
                 width: 49%;
                 height: 10vh;
                 color: #ffffff;
                 text-align: center;
                 float: left;
                 background-color: green;
                 margin-bottom: 2%;
               }
               .divS:nth-child(2n) {
                 margin-left: 2%;
               }
             </style>
           ```
         ```
        
         处理方式：
        
           ```css
           /*父元素添加overflow*/
           .divF {
             background-color: red;
             overflow: hidden;
           }
           /*父元素添加display:inline-block*/
           .divF {
             background-color: red;
             display: inline-block;
             width: 100%;
           }
         ```
        
      2. margin垂直方向重叠
        
           ```html
           <!--问题案例-->  
           <style>
               .divF {
                 background-color: red;
                 overflow: hidden;
               }
               .divS {
                 width: 49%;
                 height: 10vh;
                 color: #ffffff;
                 text-align: center;
                 background-color: green;
                 margin-bottom: 2%;
                 margin-top: 2%;
               }
               .divS:nth-child(2n) {
                 margin-left: 2%;
               }
             </style>
           <body>
             <div class="divF">
               <div class="divS">子元素</div>
               <div class="divS">子元素</div>
               <div class="divS">子元素</div>
               <div class="divS">子元素</div>
             </div>
         </body>
         ```

           给每个子元素包裹一个div，并设置div的overflow:hidden

        3. 清除浮动
        
           - 父元素overflow：hidden；（触发了BFC）
           - 父元素设置float可清除浮动，但会影响父元素相邻元素布局
           - 添加一个子元素到末尾并对其设置值为clear：both，但可能影响父元素相邻设置了float属性的元素，且添加了一个空元素，不太友好。
           - 父元素添加一个伪类元素，设置clear：both
           - 父元素添加双伪类元素，设置display:block;clear:both（推荐）
           - 已知高度固定的情况下，给父元素固定高度，前提要高度固定且已知
      4. 两栏布局、三栏布局
        
           - 两栏
           
             ```html
             <style>
               .left {
                 background-color: red;
                 width: 100px;
                 height: 50vh;
                 float: left;
               }
               .right {
                 height: 100vh;
                 background-color: green;
                 margin-left: 1vw;
                 /*overflow触发BFC*/
                 /*overflow: hidden*/
               }
             </style>
             <body>
               <div class="left">左边栏</div>
             <div class="right">右边栏</div>
             </body>
             ```
        ```
             
        - 三栏
             
             ```html
             <!--中间的content盒子必须放在最后，如果放在第一或第二，导致它在文档流中是最上方的一块，会出现覆盖问题-->
             <style>
               .left {
                 width: 100px;
                 height: 50vh;
                 background-color: red;
                 float: left;
               }
               .right {
                 width: 100px;
                 height: 50vh;
                 background-color: green;
                 float: right;
               }
               .content {
                 height: 100vh;
                 background-color: #cccccc;
                 /*触发BFC*/
                 overflow: hidden;
               }
             </style>
             <body>
             <div class="left">左边栏</div>
               <div class="right">右边栏</div>
            <div class="content">中间内容</div>
             </body>
        ```

      ​       

   6. 两端固定，中间自适应充满布局

   7. 手写 **圣杯** 和 **双飞翼** 布局

      - 双飞翼

      ```html
      <div class="left">左侧边栏</div>
      <div class="right">右侧边栏</div>
      <div class="content">内容自适应</div>
      
      <style>
        /*1.触发BFC*/
        .left, .right {
          width: 300px;
          height: 80vh;
          background-color: #cccccc;
        }
        .left {
          float: left;
        }
        .right {
          float: right;
        }
        .content {
          overflow: hidden;
          height: 100vh;
          background-color: green;
        }
          
        /*2.内容区用margin撑开*/
       .left, .right {
          width: 300px;
          height: 80vh;
          background-color: #cccccc;
        }
        .left {
          float: left;
        }
        .right {
          float: right;
        }
        .content {
          margin: 0 300px;
          height: 100vh;
          background-color: green;
        }
        
        /*3.弹性布局flex，外部包裹一层父盒子div，且元素按正常顺序摆放：左侧栏 内容 右侧栏*/
        .divF { /*父元素盒子*/
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        .left, .right {
          flex-basis: 300px;
          height: 80vh;
          background-color: green;
        }
        .content {
          flex: 1; /*填充剩余空间*/
          height: 100vh;
          background-color: #cccccc;
        }
          
        /*4.grid栅格布局，类似flex*/
       .divF { /*父元素盒子*/
          display: grid;
          /* grid-template-columns: 300px 1fr 300px;  */ /*1fr表示占比，当两端固定时内容使用占比属性，相当于填充剩余空间*/
          grid-template-columns: 300px auto 300px; /* auto属性就表示填充剩余空间 */
        }
        .left, .right {
          height: 80vh;
          background-color: green;
        }
        .content {
          height: 100vh;
          background-color: #cccccc;
        }
        
        /*5.position定位，中间内容用margin撑开*/
        .divF {
          height: 80vh;
          position: relative;
        }
        .left, .right {
          width: 300px;
          position: absolute;
          top: 0;
          bottom: 0;
          background-color: green;
        }
        .left {
          left: 0;
        }
        .right {
          right: 0;
        }
        .content {
          height: 100vh;
          margin: 0 300px;
          background-color: #cccccc;
        }
        
        /*6.position定位，中间内容也用position定位*/
        .divF {
          height: 80vh;
          position: relative;
        }
        .left, .right {
          width: 300px;
          position: absolute;
          top: 0;
          bottom: 0;
          background-color: green;
        }
        .left {
          left: 0;
        }
        .right {
          right: 0;
        }
        .content {
          position: absolute;
          top: 0;
          left: 300px;
          right: 300px;
          height: 100vh;
          background-color: #cccccc;
        }
      </style>
      ```

      - 圣杯：比双飞翼布局多一个头部和尾部，中间区域布局方式与双飞翼相似，需要考虑到中间区域的高度自适应


      ```html
      <header>这是头部</header>
        <div class="container">
          <div class="left">左侧边栏</div>
          <div class="content">内容自适应</div>
          <div class="right">右侧边栏</div>
        </div>
      <footer>这是脚部</footer>
      
      <style>
        /*1.position布局,content盒子也可以用margin撑开，缺点是随时都要注意高度的设定*/
        html, body {
          height: 100%
        }
        header, footer {
          height: 100px;
          background-color: blue;
        }
        .container {
          height: calc(100% - 200px);
          position: relative;
        }
        .left, .right {
          width: 300px;
          position: absolute;
          top: 0;
          bottom: 0;
          background-color: green;
        }
        .left {
          left: 0;
        }
        .right {
          right: 0;
        }
        .content {
          /* position: absolute;
          top: 0;
          bottom: 0;
          left: 300px;
          right: 300px; */
          margin: 0 300px;
          height: 100%;
          background-color: #cccccc;
        }
          
        /*2.float,可以触发BFC，也可以直接用margin撑开，需要把content盒子放在最后一列，否则发生覆盖坍塌*/
        html, body {
          height: 100%
        }
        header, footer {
          height: 100px;
          background-color: blue;
        }
        .container {
          height: calc(100% - 200px);
        }
        .left, .right {
          width: 300px;
          height: 100%;
          background-color: green;
        }
        .left {
          float: left;
        }
        .right {
          float: right;
        }
        .content {
          /* margin: 0 300px; */
          overflow: hidden;
          height: 100%;
          background-color: #cccccc;
        }
          
        /*3.flex布局*/
        body, html {
          height: 100%;
        }
        header, footer {
          height: 100px;
          background-color: blue;
        }
        .container {
          height: calc(100% - 200px);
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        .left, .right {
          width: 300px;
          height: 100%;
          background-color: green;
        }
        .content {
          flex: 1;
          height: 100%;
          background-color: #cccccc;
        }
          
        /*4.grid布局，只在container上设置grid*/
        body, html {
          height: 100%;
        }
        header, footer {
          height: 100px;
          background-color: blue;
        }
        .container {
          height: calc(100% - 200px);
          display: grid;
          grid-template-columns: 300px auto 300px;
        }
        .left, .right {
          height: 100%;
          background-color: green;
        }
        .content {
          height: 100%;
          background-color: #cccccc;
        } 
          
        /*5.在body元素和container上设置gird，在兼容要求不特别严格情况下强烈推荐，代码最简洁*/
        html, body {
          height: 100%;
        }
        body {
          display: grid;
          grid-template-rows: 100px auto 100px; /*自动撑满剩余空间*/
        }
        header, footer {
          background-color: blue;
        }
        .container {
          display: grid;
          grid-template-columns: 300px auto 300px;
        }
        .left, .right {
          background-color: green;
        }
        .content {
          background-color: #cccccc;
        }
      </style>
      ```


​      

## 2. 正则

## 3. 算法

   - [ ] 排序：冒泡、快排、归并、插入排序、选择排序

   2. 01背包、动态规划、分治法
   3. [牛客 - 剑指OFFER-传送门](https://www.nowcoder.com/ta/coding-interviews)

## 4. 设计模式

   1. 发布订阅
   2. 观察者模式
   3. 工厂模式
   4. 单例模式（Es5\Es6）
   5. 代理模式
   6. 适配器模式
   7. 装饰器模式

## 5. Es6、Es7

   - Var, let, const
   - for of \ for in 的区别
   - 可迭代对象
- js proxy 和 Object.defineProperty
  
## 6. 异步

  1. Promise

     - 手写实现
     - then
     - catch
     - 链式写法
     - race、all及其应用
  2. generator
  3. async await

## 7. 手撕代码

   - [ ] call、bind、apply
   - [ ] 手撕 promise
   - [ ] 节流、防抖
   - [ ] 深拷贝
   - [ ] 数组拍平、去重
   - [ ] 数组高阶函数API手写

## 8. 网络知识

   - 缓存
     1. 强缓存
     2. 协商缓存
   - 常见请求头

   + HTTP版本与特点
   + HTTPS和HTTP区别
   + TCP/IP（传输控制协议/网际协议）
   + UDP
   + 网络模型
   + 状态码
   + 拥塞控制
   + XSS Csrf DDos 攻防手段

## 9. - [x] 进程、线程、进程间通信
     - 进程是操作系统资源分配调度的最小单位
     - 线程是进程的实体，是cpu分配调度的最小单位，没有自己的内存资源，
     - 进程间的通信 
       - 无名管道半双工： 父进程开辟 子进程使用
       - 具名管道半双工： 任意进程都可使用，有名字
       - Socket
       - 信号量
       - 共享内存
       - 消息队列

## 10. Vue Vuex 生命周期钩子函数 SSR中生命周期不同 VueNext

## 11. vue 生命周期

    beforeCreate

    created

    beforeMount

    mounted

    beforUpdate

    updated

    beforDestoryed

    destoryed

## 12. SSR： clientEntry.js  serverEntry.js

## 13. - [ ] 对称加密非对称加密

      1. 公钥加密、私钥解密

## 14. Https链接过程

    - 客户端从服务端获取CA证书和公钥，并鉴定证书（鉴定存在问题则警告）

    - 客户端生成随机密码串，并用公钥加密发送给服务端

    - 服务端收到加密后的随机密码串用私钥进行解密得到随机密码

    - 客户端用约定好的Hash算法得到握手信息摘要并用随机密码串加密摘要和握手信息。

    - 服务端收到加密后的握手信息和摘要，用得到的随机密码串解密得到摘要和握手信息，对握手进行哈希计算得到摘要和收到的摘要进行比对，发现计算得到的摘要和发送来的摘要相同，说明信息没有被篡改, 完成握手

      

## 15. 可迭代对象 迭代器

## 16. For of   for in 

## 17. - [ ] jsWorker

## 18. - [ ] Node子进程

     ```
     const fork = require('child_process').fork
     fork('./xxxx.js')
     ```


## 20. TCP 拥塞控制

## 21. vue3.0新增了什么

## 22. - [ ] js宽松模式和严格模式区别

23. - [ ] 手写封装Ajax

24. - [ ] 最大连续子序列

25. - [ ] 进程和线程

      1. 进程是操作系统资源分配的最小单位，进程有自己的内存
      2. 线程是进程的实体，是cpu分配的最小单位，没有自己的内存地址，线程间共享内存

