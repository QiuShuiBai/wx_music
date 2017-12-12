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
        time:"",
        highImg:"",
        lowImg:""
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
        var timeCount;
        clearInterval(proSet);
        clearInterval(rotSet);
        clearInterval(timeSet);
        proSet = setInterval(() => {
            if (this.data.progress >= 100) {
                i++;
                if(i==this.data.music.length){
                    i=0;
                }
                app.globalData.i=i;
                backgroundAudioManager.stop();                            
                this.nameBackMusic();
                timeCount = 0;
                this.setData({
                    progress: 0,
                    left: 0,
                    songTime: this.data.music[i].songTime,
                    songer: this.data.music[i].songer,
                    songName: this.data.music[i].songName,
                    time: secondToDate(this.data.music[i].songTime)
                });
            }
            else if (this.data.run == 0) {
                clearInterval(proSet);
                clearInterval(rotSet);
                clearInterval(timeSet);
            }
            this.setData({
                progress: 0.01 + this.data.progress,
                left: 0.0458 + this.data.left
            });
        }, this.data.music[i].songTime / 10);
        rotSet = setInterval(() => {
            this.setData({
                rotate: 1 + this.data.rotate,
            });
        }, 24);
        timeCount = backgroundAudioManager.currentTime;
        if (typeof (backgroundAudioManager.currentTime) === "undefined")
        {
            timeCount = 0;
        }
        timeSet = setInterval(()=>{
            timeCount++;
            this.setData({
                currentTime: secondToDate(timeCount),
            });
        },1000)
    },
     playMusic:function() {
        if (this.data.run == 1) {
            if (backgroundAudioManager.paused) {
                backgroundAudioManager.play();
            }
            else {
                backgroundAudioManager.stop()
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
            currentTime: "00:00",
            songTime: this.data.music[i].songTime,
            songer: this.data.music[i].songer,
            songName: this.data.music[i].songName,
            time: secondToDate(this.data.music[i].songTime),
            highImg: app.globalData.nowMusic[i].highImage,
            lowImg: app.globalData.nowMusic[i].lowImage
        })
        if(this.data.run==0){
            this.nameBackMusic();
            this.setData({
                run: 1
            })
            app.globalData.running=1;
            this._next();
        }
        
        backgroundAudioManager.stop();
        this.nameBackMusic();
        this._next();
        
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
            currentTime: "00:00",
            songTime: this.data.music[i].songTime,
            songer: this.data.music[i].songer,
            songName: this.data.music[i].songName,
            time: secondToDate(this.data.music[i].songTime),
            highImg: app.globalData.nowMusic[i].highImage,
            lowImg: app.globalData.nowMusic[i].lowImage
        })
        backgroundAudioManager.stop();
        this.nameBackMusic();
        this._next();
    },
    onLoad: function (options) { 

        if (options.id>=0) {
            i = app.globalData.i;
            console.log(app.globalData.i);
            app.globalData.running = 1;
            this.setData({
                run:1,
                music: app.globalData.nowMusic,
                songTime: app.globalData.nowMusic[i].songTime,
                songer: app.globalData.nowMusic[i].songer,
                songName: app.globalData.nowMusic[i].songName,
                time: secondToDate(app.globalData.nowMusic[i].songTime),
                highImg: app.globalData.nowMusic[i].highImage,
                lowImg: app.globalData.nowMusic[i].lowImage
            })
            backgroundAudioManager.stop();
            this.nameBackMusic();
            this._next();
        }
        this.setData({
            music: app.globalData.nowMusic,
            songTime: app.globalData.nowMusic[i].songTime,
            songer: app.globalData.nowMusic[i].songer,
            songName: app.globalData.nowMusic[i].songName,
            time: secondToDate(app.globalData.nowMusic[i].songTime),
            highImg: app.globalData.nowMusic[i].highImage,
            lowImg: app.globalData.nowMusic[i].lowImage
        })
        
    },
    onShow: function () {
        if (typeof (backgroundAudioManager.paused) !== "undefined") {            
            var proNum = (backgroundAudioManager.currentTime / (backgroundAudioManager.duration + 0.00000000000000001)) * 100;
            var leftNum = proNum / 100 * 456;
            i = app.globalData.i;
            this.setData({
                progress: proNum,
                left: leftNum,
                music: app.globalData.nowMusic,
                songTime: app.globalData.nowMusic[i].songTime,
                songer: app.globalData.nowMusic[i].songer,
                songName: app.globalData.nowMusic[i].songName,
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