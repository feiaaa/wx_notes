let API_HOST = "http://xxx.com/xxx";
let DEBUG = true;//切换数据入口
var Mock = require('mock.js')
function ajax(data = '', fn, method = "get", header = {}) {
  if (!DEBUG) {
    wx.request({
      url: config.API_HOST + data,
      method: method ? method : 'get',
      data: {},
      header: header ? header : { "Content-Type": "application/json" },
      success: function (res) {
        fn(res);
      }
    });
  } else {
    // 模拟数据
    var res = Mock.mock({
      'error_code': '',
      'error_msg': '',
      'data|6': [{
        'id|+1': 1,
        'url': 'https://ask-fd.zol-img.com.cn/t_s800x800/g5/M00/00/03/ChMkJ1lxnDuIZ_mWAAOIWoU5lBUAAe8OwAhuvgAA4hy911.jpg',//"@image('500x400', '#4A7BF7','#fff','pic')",
        'title': '@ctitle(3,8)',
        'content': "@ctitle(35,50)",
      }]
    })
    // 输出结果
    // console.log(JSON.stringify(res, null, 2))
    fn(res);
  }
}
module.exports = {
  ajax: ajax
}