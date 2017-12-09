const app = getApp()
const backgroundAudioManager = wx.getBackgroundAudioManager();
var i = 0;
var proSet;
var rotSet;
var timeSet;
function secondToDate(result) {
    var m = Math.floor((result / 60 % 60));
    var s = Math.floor((result % 60));
    if(m<=9){
        m="0"+m;
    }
    if(s<=9){
        s="0"+s;
    }
    return result =  m + ":" + s;
}
Page({
    data: {
        currentTime:"00:00",
        run: 0,
        showList:0,
        rotate:0,
        progress: 0,
        left:0,
        songTime:0,
        songer:"",
        songName:"",
        music:[],
        time:""
    },
    nameBackMusic:function(){
        backgroundAudioManager.src = this.data.music[i].url;
        backgroundAudioManager.title = this.data.music[i].songName;
        backgroundAudioManager.epname = ''
        backgroundAudioManager.singer = this.data.music[i].songer;
    },
    running:function(){
        var triger = (this.data.run + 1) % 2
        app.globalData.running = triger;
        this.setData({
            run: triger
        })
        this.playMusic();
    },
    _next: function () {
        clearInterval(proSet);
        clearInterval(rotSet);
        clearInterval(timeSet);
        proSet = setInterval(() => {
            if (this.data.progress >= 100) {
                clearInterval(proSet);
                clearInterval(rotSet);
                this.setData({
                    progress: 0,
                    run: 0,
                    left: 0
                });
            }
            else if (this.data.run == 0) {
                clearInterval(proSet);
                clearInterval(rotSet);
            }
            this.setData({
                progress: 0.01 + this.data.progress,
                left: 0.0468 + this.data.left
            });
        }, this.data.music[i].songTime / 10);
        rotSet = setInterval(() => {
            this.setData({
                rotate: 1 + this.data.rotate,
            });
        }, 24);
        var time = 0;
        timeSet = setInterval(()=>{
            time++;
            this.setData({
                currentTime: secondToDate(time),
            });
        },1000)
    },
     playMusic:function() {
        if (this.data.run == 1) {
            if (backgroundAudioManager.paused) {
                backgroundAudioManager.play();

            }
            else {
                backgroundAudioManager.pause()
                this.nameBackMusic();
            }
            this._next();
        }
        else {
            backgroundAudioManager.pause();
        }
    },
     changeSong:function(e){
         if(e.currentTarget.dataset.index == 1){
             i--;
             if (i == -1) {
                 i = this.data.music.length-1;
             }
         }
         else{
             i++;
             if (i == this.data.music.length) {
                 i = 0;
             }
         }
        app.globalData.i = i;
        this.setData({
            rotate: 0,
            progress: 0,
            left: 0,
            songTime: this.data.music[i].songTime,
            songer: this.data.music[i].songer,
            songName: this.data.music[i].songName,
            time: secondToDate(this.data.music[i].songTime)
        })
        if(this.data.run==0){
            this.nameBackMusic();
            this.setData({
                run: 1
            })
            app.globalData.running=1;
            this._next();
        }
        this.playMusic();
        
    },
    showList:function(){
        this.setData({
            showList:1
        })
    },
    hiddenList:function(){
        this.setData({
            showList: 0
        })
    },
    choiceSong:function(e){
        i = e.currentTarget.dataset.index;
        app.globalData.i = i ;
        this.setData({
            run:1,
            showList:0,
            rotate: 0,
            progress: 0,
            left: 0,
            songTime: this.data.music[i].songTime,
            songer: this.data.music[i].songer,
            songName: this.data.music[i].songName,
            time: secondToDate(this.data.music[i].songTime)
        })
        backgroundAudioManager.stop();
        this.nameBackMusic();
        this._next();
    },
    onLoad: function (options) {
       wx.request({
           url: "https://www.easy-mock.com/mock/5a2ac29a0d73d175e0478566/music/list",
           method: 'GET',
           success:  (res)=>{
                this.setData({
                    music:res.data.music,
                    songTime: res.data.music[i].songTime,
                    songer: res.data.music[i].songer,
                    songName: res.data.music[i].songName,
                    time: secondToDate(res.data.music[i].songTime)
                })
                app.globalData.music=this.data.music;
           }
       })
    },
    onShow: function () {
        if (typeof (backgroundAudioManager.paused) !== "undefined") {
            var proNum = (backgroundAudioManager.currentTime / backgroundAudioManager.duration) * 100;
            var leftNum = proNum / 100 * 456;
            i = app.globalData.i;
            this.setData({
                progress: proNum,
                left: leftNum,
                music: app.globalData.music,
                songTime: app.globalData.music[i].songTime,
                songer: app.globalData.music[i].songer,
                songName: app.globalData.music[i].songName
            })
            if (backgroundAudioManager.paused == false) {
                this.setData({
                    run: 1,
                })
            }
            this._next();
        }
    },
})