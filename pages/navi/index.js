//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    
    item: { tempstr:'copyright 2018'},
    show:false,
    showAppDatas:"1111",
    testId:1
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  clickEvents:function(event){
    this.setData({
      show:true
    })
    console.log(event,'event1');
  },
  clickEvents2: function (event) {
    console.log(event, 'event2');
  },
 
  onLoad: function () {
    console.log("onload page==============");
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onShow:function(){
    console.log("onshow page==============");
  },
  onHide: function () {
    console.log("onhide page==============");
  },
  onUnload:function(){
    console.log("onunload page==============");
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  clickPublicFunc: function (){
    var that = this;
    //调用应用实例的方法获取全局数据
    app.showDataFunc(function (appDatas) {
      // 更新数据，页面自动渲染
      that.setData({
        showAppDatas: appDatas
      })
    })
  },
  jumpToRequest:function(){
    wx.navigateTo({
      url: '../kuaidi/kuaidi',
    })
  },
  jumpToNavigate:function(e) {
    wx.navigateTo({
      url: '../kuaidi/kuaidi?id=' + e.currentTarget.id,
    })
  }
  
})
