Page({
  data: {
    myrich: ""
  },
  onShow: function () {
    const that = this;
    var myrich = '<p>中新网客户端北京8月30日电 在乐清女孩乘顺风车被杀后的第4天，滴滴28日再次道歉，这次出面的是滴滴创始人兼CEO程维和滴滴总裁柳青，但民愤并没有平息。面对滴滴存在的问题，各地相继出手，5天至少14城约谈并责令滴滴进行整改。</p><p><img src="https://t1.huanqiu.cn/5ee789d7b86f93a71c430de852adb11a.jpg"></p><p>资料图：滴滴顺风车某次发布会。中新网吴涛 摄</p><p><strong>道歉被指“模板化”、无诚意</strong></p><p>滴滴再次道歉时表示，顺风车业务模式将重新评估，在安全保护措施没有获得用户认可之前，无限期下线。</p><p>从网友微博反馈来看，滴滴的道歉并不能完全平息舆论风波。该道歉被指存在“模板式”痕迹：滴滴此前在空姐</p>';
    myrich=myrich.replace(/<img src/g, '<img class="img" src');
    that.setData({ myrich: myrich });
  }
})
