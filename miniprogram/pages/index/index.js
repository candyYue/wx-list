// index.js
// const app = getApp()
const { envList } = require('../../envList.js');

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    active: 0
  },
  onLoad: function() {
    // 查看是否授权
    wx.getSetting({
      success (res){
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              console.log(res.userInfo)
            }
          })
        }
      }
    })
  },
  bindGetUserInfo (e) {
    console.log(e.detail.userInfo)
  },
  changePage(event){
    if(event.detail.name===1){
      // wx.navigateTo({
      //   url:'../../consumption/statistics/statistics' 
      // })
    }
  },
});
