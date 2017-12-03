//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        currentTab: 0,
        autoplay:false,
        oneSwiperMusic: [],  //显示第一张滑动图片
        allImage:[],  //存储滑动图片所有路径
        showImage: [], //显示除一张外的的滑动图片
        listIcon: [{url:"../../images/fm.png", words:"私人FM"},
            {url: "../../images/recommend.png", words:"每日推荐"},
            {url:"../../images/musicList.png", words:"歌单"},
            {url:"../../images/rank.png", words:"排行榜"}],
        recommendList:[]
    },
    // 界面的改变，由数据决定
    // 界面的状态 === 数据的值
    // mvvm区分于dom api的本质
    clickTab: function (e) {
        // 状态改变，data binding 值 
        console.log(e);
        var index = e.target.dataset.index;
        this.setData({
            currentTab: index,
        });
    },

    swiperTab: function (e) {
        console.log(e);
        var index = e.detail.current;
        this.setData({
            currentTab: index,
        });
    },
    onLoad: function () {
        wx.request({
            url: "https://www.easy-mock.com/mock/5a0a4caeb31e3216824d4db7/getHoWoInfo/Music",
            success: (response) => {
                console.log(response.data.data.recommendList);
                this.setData({
                    'oneSwiperMusic[0]': response.data.data.oneSwiperImg[0],
                    recommendList: response.data.data.recommendList,
                    allImage: response.data.data.oneSwiperImg
                });
            }
        })
    },
    imageOnload:function(){
        this.setData({
            autoplay:true,
            showImage:this.data.allImage
        })
        console.log(this.data.allImage)
    },

    onShow: function () {

    },
    onReady: function () {
        console.log("onReady");
    },
    getUserInfo: function (e) {

    }
})
