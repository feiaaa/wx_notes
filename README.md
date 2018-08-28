# wx_notes
>该文档是根据视频教程《微信小程序 从基础到实战 by 杨福海》做出的笔记心得。包括了代码和笔记。
>除了可以看readMe，文件夹里也有word文档可供翻阅。
>为了美观使用了weui
>
### 目录
-------------------

[TOC]

### 相关学习资料
[B站教学视频连接](https://www.bilibili.com/video/av9085879)
[官方api手册](https://developers.weixin.qq.com/miniprogram/dev/framework/MINA.html)

### 备注
以下简称wa（wxapp，微信小程序）

### 文件夹的目录结构
![小程序文件夹目录结构](http://bbs.html51.com/data/attachment/forum/201701/15/134125sjw9txtelw1lu5dl.jpg)
> app.js定义项目的启动路口，app.json定义项目的每个页面和配置；
> 每个页面（所在文件夹）包含了一个js，js调用一个配置方法，配置方法里有配置信息。
> 加上html文件和样式文件，就是项目的整体结构

### 视图层
#### 循环
wx:for={{list}}
{{item}}表示一项数据 
wx:for等价与wx:for-items是循环数组用的；而wx:for-item则是给列表赋别名用的 ；wx:for-index 给索引起别名

#### 模板template
>[文档连接](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/template.html)或者视频P6 第25分钟
>把页面中相同的内容提出来，需要的页面引入。
在src内开一个template文件夹，建立模板页面wxml

##### 引入：
【法1】如果模板页面没有用template标签
```
<include src='../template/xxx' />  /** 记得闭合标签，不加的话模板不显示 */
```
【法2】用了template标签
【模板页】
```
<template name="templateName">....</template>
```
【引入方法】
```
<import src='../template/xxx' /> /** 引入模板位置 */
<template is="templateName" data="{{...item}}" /> /** is指定模板的名字 （一个模板页里可以有多个模板）*/ 
```
【tip】如果模板套着模板，最顶级的那个爷爷组件没有引入孙子模板，那是无效的

【题外话】带数据的模板
除了上面引入item，page页也要把data引入
【eg】
【模板页】wxml
```
<template name="templateName">
footer-{{ tempstr}}
</template>
```
【父页引入】wxml
```
<import src="../../template/template"/>
<template is="templateName" data="{{...item}}" />
```
【父页引入】js
```
data：{
item: { tempstr:'strinf111'},
}
```
【eg】（见小程序 index 2.3.1）


#### 事件
>[文档连接](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/event.html)
> 一种用户行为：例如click，drag
> 一种通讯方式：点击ui层以后，产生的逻辑行为
>【科普】对于冒泡，捕获一脸懵逼的请先看这个[《看懂此文，不再困惑于javascript中的事件绑定、事件冒泡、事件捕获和事件执行顺序》](https://blog.csdn.net/aitangyong/article/details/43231111)，其中**执行顺序是面试题**
>####类别：
点击事件，长按事件，触摸事件（touchstart，touchend…………），其他

#####冒泡：
>冒泡事件：**点击子元素的事件，会触发父元素的事件**  （上述类别中，点击，长按，触摸都是冒泡事件）
>非冒泡事件： 当一个组件上的事件被触发后，该事件不会向父节点传递 （上述类别中，其他 是非冒泡事件）

#####绑定：
>bind事件绑定不会阻止冒泡事件向上冒泡，catch事件绑定可以阻止冒泡事件向上冒泡。（原文）
>bind：点子元素出父元素，爷爷元素……的点击事件 ```bindtap="clickfunc"```
>catch：点子元素只出子元素的点击事件```catchtap="clickfunc"```

#####事件对象：
>currentTarget： 当前组件的一些属性值集合 （点击事件的view，绑定事件的view）
>target： 触发事件的组件的一些属性值集合 （目标的view，触发事件的view，目标的view）

>target在事件流的**目标阶段**；currentTarget在事件流的**捕获，目标及冒泡阶段**。但事件流处于目标阶段，target与currentTarget指向一样， 而当处于捕获和冒泡阶段的时候，target指向被单击的对象而currentTarget指向当前事件活动的对象。

>（所以平级的两个值是一样的；如果要做出两个值不一样的情况，首先，必须是父子嵌套，另外，父子都要有事件能够被带出来）


【eg】冒泡（见小程序 index 2.3.2）
【wxml】
```
<view id='clickView1' bindtap='clickEvents2'style='background:green'>
{{show}}shows
<button bindtap='clickEvents' id='clickBtn1'>click</button>
</view>
```
【js】
```
clickEvents:function(event){
this.setData({
show:true
})
console.log(event,'event1');
},
clickEvents2: function (event) {
console.log(event, 'event2');
},
```

### 逻辑层
####全局配置app.json
>Q:tabbar有时候写了页面出不来？
>A:顺序问题，在page里面，要优先排在最前面

##### 网络超时配置
```
"networkTimeout": {
"request": 10000,
"downloadFile": 10000
},
```
【tips】
每个配置各司其职，见下表（文档有）
| 属性      |    类型 | 必填  | 默认值  | 说明  |
| :-------- | --------:| :--: | :--: | :--: |
| request  | Number|  否   | 60000  | wx.request 的超时时间，单位毫秒。     |
| connectSocket     | Number|  否   | 60000  | wx.connectSocket 的超时时间，单位毫秒。  |
| uploadFile     | Number|  否   | 60000  | wx.uploadFile 的超时时间，单位毫秒。  |
| downloadFile     | Number|  否   | 60000  | wx.downloadFile 的超时时间，单位毫秒。  |


##### debug
只有true和false。
开启后显示页面的注册和路由状态，像这样

【ps】还有其他字段，见api文档

#### 页面配置index.json
目的： 覆盖全局配置（例如标题，颜色）。内容和全局配置的**window**属性一致，但没有全局类的设置字段可以修改（例如顶部底部窗口颜色。导航栏 颜色）

全局中的超时，debug当然也不能覆盖。

全局样式app.wxss和页面样式wxss
同理也是页面样式覆盖app

####App生命周期
[文档连接](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/page.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%9E%E8%B0%83%E5%87%BD%E6%95%B0)

- **onLaunch();** 小程序刚好初始化完成之后的回调函数,(这个时候还没有数据！)
- **onShow();**当页面处于前台
- **onHide();**当页面处于后台


下面这张图。是页面的，page.js里面的周期
![page的生命周期](https://developers.weixin.qq.com/miniprogram/dev/image/mina-lifecycle.png)


绿色部分是在页面上看到的。（开始-初始化，等初始数据，展示。发送数据-展示数据的循环。结束）
蓝色部分是小程序的周期。

####页面的生命周期（来自官方文档）
- **onLoad(Object query)**：页面加载时触发。**一个页面只会调用一次**
- **onShow()** :当页面处于前台（自己正在使用中）
- **onReady()**：页面初次渲染完成时触发。**一个页面只会调用一次，代表页面已经准备妥当，可以和视图层进行交互**。
- **onHide()**：当页面处于后台（例如突然电话进来，通话页面在最顶层，小程序页面在后面）
- **onUnload()**：页面卸载时触发。如```redirectTo```或```navigateBack```到其他页面时。（ps：navigateTo不会用到）（跳转页面的区别后面讲）

当切换路由的时候，使用哪些生命周期，见[这里](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/route.html)



>综上，整体顺序：
>app onlaunch;app onshow ；从app.json注册页面；查找路由首页；load首页，show首页，ready首页（首次渲染完成，可以开始交互）

和debug组合，输出如下
```
App: onLaunch have been invoked
=======onlaunch app===========
App: onShow have been invoked
=======onshow app===========
Register Page: pages/index/index
Register Page: pages/logs/logs
Register Page: pages/kuaidi/kuaidi
On app route: pages/index/index 
Update view with init data 
pages/index/index: onLoad have been invoked
onload page==============
pages/index/index: onShow have been invoked
onshow page==============
Invoke event onReady in page: pages/index/index
pages/index/index: onReady have been invoked
```
####App 对象使用
```
const app = getApp() //获取app实例。（app.js里面的东西）
```
【eg】获取app.js里的数据
```
app.globalData.userInfo
```

【eg】调用app.js里的方法
```
app.getUserInfo(function (userInfo) {
 //代码块
}
```
【eg】写一个功能，点击index的按钮，调用到app里的公用方法。
【index】【wxml】
```
<button bindtap='clickPublicFunc' class="weui-btn" type="primary" size="mini">获取app方法</button>
{{showAppDatas}}
```
【index】【js】
（写page外面）
```
const app = getApp()
clickPublicFunc: function (){
var that = this;
//调用应用实例的方法获取全局数据
app.showDataFunc(function (appDatas) {
// 更新数据，页面自动渲染
that.setData({
showAppDatas: appDatas
})
})
}
```
【app.js】
```
showDataFunc:function(cb){  
//参数为cb,类型为函数
//return this.showData.appDatas;
var that=this;
cb & cb(that.showData.appDatas)  
//执行cb,获取数据
},
showData:{
appDatas:'hello 2333'  
//要被执行的数据
}
```
【效果】见3.2.1


【拓展阅读】
- [微信小程序前端源码逻辑和工作流](https://www.cnblogs.com/dupd/p/5905880.html)
####底层实现的原理（面试题）
 [微信小程序weapp的底层实现原理](https://blog.csdn.net/ListenToSennTyou/article/details/53258163)

【摘录】
>**wa的运行环境有3个平台**
- IOS的webkit（苹果开源的浏览器内核）
- Android的X5(QQ浏览器内核)
- 开发时用的nw.js（C++实现的web转桌面应用）（即开发工具——微信开发者工具）；


>**微信小程序是一个用react包装出来的，富单页面web应用。（整套逻辑都基于react.js）**


>**不能使用大部分库（jQuery,zepto）**
原因：
【官方说法】页面的脚本逻辑是在JsCore中运行，JsCore是一个没有窗口对象的环境。所以不能使用bom相关的对象（浏览器对象模型）。而依赖bom的常用的比如说jQuery就无能为力了。
【拆包以后的说法】
在webpack打包的过程中，下列关键字被屏蔽
window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket
其中window对象代表浏览器窗口。屏蔽掉的几个关键字和window有关。
也就是说，window相关的方法也不能用。例如试试alert，报错。
```
thirdScriptError
alert is not a function;at pages/index/index XXX function;at api operateWXData success callback function
TypeError: alert is not a function
```


【参考文献】
- [BOM、DOM与JS中的事件](http://www.php.cn/js-tutorial-360445.html)
- [微信小程序剖析 | 运行机制及框架原理](https://ask.seowhy.com/article/17423)



####【实例】用户登录
[文档](https://developers.weixin.qq.com/miniprogram/dev/api/api-login.html)
**从通过wx.login获得到临时code，到后台拿到用户信息的流程图**
![流程图](https://developers.weixin.qq.com/miniprogram/dev/image/api-login.jpg)





###常用问答：
- [微信小程序怎么修改本地目录](https://segmentfault.com/q/1010000015069306/a-1020000015122732)

