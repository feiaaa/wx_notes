Page({
  data: {
    postid: "",
    resInfo:null
  },
  chaxun:function(){
    var self=this;
    wx.request({
      url: 'https://nfhh.site/cat/WordsPc',
      method:'get',
      data: { 
        'page': this.data.postid,
         
      },
      
      header: { 'content-Type':'application/x-www-form-urlencoded'},
      success:function(res){
        console.log(res);
        if (res.data.result){
          self.setData({
            resInfo: res.data.result
          })
        }
        
      }
    })
  },
  input:function(e){
    this.setData({
      postid:e.detail.value
    })
  },
  onLoad: function (options) {
    console.log(options,'options');
    if(options.id)
    {
      this.setData({
        postid: options.id,
      })
      this.chaxun();
    }
    
  }
})