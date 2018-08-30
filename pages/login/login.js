// pages/login/login.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTopTips: false,
    usrName:'',
    pw:'',
    userInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  console.log("login onload")
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("login onready")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("login onshow")
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("login onhide")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("login onunload")
  },
  showTopTips: function () {
    var that = this;
    if (that.data.usrName == '' || that.data.pw ==''){
      this.setData({
        showTopTips: true
      });
      setTimeout(function () {
        that.setData({
          showTopTips: false
        });
      }, 3000);
    }
    //校验ok以后送到后台


  },
  getUsrName: function (e) {
    this.setData({
      usrName:e.detail.value
    })
  },
  getPw: function (e) {
    this.setData({
      pw: e.detail.value
    })
  },
  getUserInfo:function(){
    var self=this;
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        
      })
      wx.switchTab({
        url: '../me/me',
      })
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
          })
          wx.switchTab({
            url: '../me/me',
          })
        }
      })
    }
  }
})