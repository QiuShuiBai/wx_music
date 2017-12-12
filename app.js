//app.js
App({
  onLaunch: function () {
      wx.request({
          url:"https://www.easy-mock.com/mock/5a2ac29a0d73d175e0478566/music/info",
          success: (response) => {
              this.globalData.music =  response.data;
              this.globalData.nowMusic = response.data.music;
          }
      })
  },
  globalData: {
    running: 0,
    music:'',
    i:0,
    data:0,
    num:-1,
    nowMusic:''
  }
})