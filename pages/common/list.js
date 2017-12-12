const app = getApp()
Page({
    data: {
        wRun: 0,
        music:""
    },
    playing:function(e){
        var i = e.currentTarget.dataset.index;
        app.globalData.i = i;
        app.globalData.nowMusic = this.data.music;
    },
    onLoad: function (options) {
        var num = options.id;
        app.globalData.num = num;
        if(num>=0&&num<=5){
            this.setData({
                music:app.globalData.music.common[num]
            })
        }
        if(num==-1){
            this.setData({
                music: app.globalData.music.music
            })
        }
    },
    onShow:function(){
        this.setData({
            wRun: app.globalData.running
        })
    }
})