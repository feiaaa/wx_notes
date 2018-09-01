//index.js
//获取应用实例
const app = getApp()
var API = require('../../utils/indexApi.js');
Page({
  data: {
    
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,

    tuijianUrls: null,
  },
  
 
  onLoad: function () {
    var self=this;
    //使用mockjs
    API.ajax('', function (res) {
      //这里既可以获取模拟的res
      console.log(res)
      self.setData({
        tuijianUrls: res.data
      })
    });

    console.log(this.data.tuijianUrls)
   
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
  
})
