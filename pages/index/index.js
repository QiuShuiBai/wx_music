//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    currentTab: 0,
    autoplay:true,
    interval:1000,
    duration:1000,
    circular:true,
    indicatorDots:true
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },


  // 界面的改变，由数据决定
  // 界面的状态 === 数据的值
  // mvvm区分于dom api的本质
  clickTab: function(e){ 
    // 状态改变，data binding 值 
    console.log(e);
    var index = e.target.dataset.sss;
    this.setData({
      currentTab:index,
    });
  },

  swiperTab: function(e){
    console.log(e);
    var index = e.detail.current;
    this.setData({
      currentTab:index,
    });
  },

  onLoad: function () {

  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
