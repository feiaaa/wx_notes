//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,

    tuijianUrls: [{ 'title': 'titles111111', 'url': 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg' }, { 'title': 'titles111121', 'url': 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg' }, { 'title': 'titles111311', 'url': 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg' },{ 'title': 'titles111411', 'url': 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg' }],
  },
  
 
  onLoad: function () {
   
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
