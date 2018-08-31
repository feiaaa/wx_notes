Page({
  data: {
    songList: null,
    current:0,
    poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
    name: '此时此刻',
    author: '许巍',
    src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
    lrc:null,
    currentLrc:"111",
  },
  onReady: function (e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createInnerAudioContext('myAudio')
  },
  onLoad:function(){
    var self=this;
    wx.request({
      url: 'https://api.hibai.cn/api/index/index',
      data: {
        "TransCode": "020112",
        "OpenId": "123456789",
        "Body": {
          "SongListId": "2331394459"
        }
      },
      method:'POST',
      header: { 'content-Type': 'application/json' },
      success: function (res) {
        if (res.data.ErrCode=='OK'){
          self.setData({
            songList: res.data.Body,
            poster: res.data.Body[0].pic,
            name: res.data.Body[0].title,
            author: res.data.Body[0].author,
            src: res.data.Body[0].url
          })
          //设置歌词
          wx.request({
            url: res.data.Body[0].lrc,
            success: function (res) {

              self.setData({
                lrc: res.data
              })
            }
          })
        }
        
      }
    })

  },
  
  changeMusic:function(e){
    var self=this;
    var tmp = self.data.songList[e.currentTarget.id];
    self.setData({
      current:e.currentTarget.id,
      poster: tmp.pic,
      name: tmp.title,
      author: tmp.author,
      src: tmp.url
    })
    // this.audioPlay(); 
    //this.audioCtx.onPlay(()=>{}); 

  },  
  audioPlay: function () {
    console.log('audioplay');
    this.audioCtx.play()
    console.log('audioplay111');
  },
  audioPause: function () {
    this.audioCtx.pause()
  },
  audio14: function () {
    this.audioCtx.seek(14)
  },
  audioStart: function () {
    this.audioCtx.seek(0)
  }
})