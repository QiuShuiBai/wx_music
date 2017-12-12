const app = getApp()
Page({
    data: {
        wRun: 0,
        musicList: [{
                'url': '../../images/music.png',
                'words': '本地音乐',
                'num': '53'
            },{'url': '../../images/history.png',
                'words': '最近播放',
                'num': '100'
            },{
                'url': '../../images/radio.png',
                'words': '我的电台', 
                'num': '0'
            },{ 
                'url': '../../images/collection.png',
                'words': '我的收藏', 
                'num': '6'
            }]
    },
   onShow: function () {
        this.setData({
            wRun: app.globalData.running
        })
    },
})