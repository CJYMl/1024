//index.js
//获取应用实例
import Scratch from "../../components/scratch/scratch.js"
import API from "../../api.js"
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    windowWidth: "",
    windowHeight: "",
    showMask: true,
    showScratch: false,
    showAuth: true,
    showRecord: false,
    showPengTip: false,
    showScratchTip: false,
    showPengFail:false,
    showPengSuccess:false,
    showEgg:false,
    showEggAward:false,
    showShare:false,
    showDownload:false,
    showPrizeRecord:false,
    showRanking:false,
    isCanPeng: false  //是否能对碰
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    if (wx.getStorageSync("hasVisit")) {
      this.setData({
        showMask:false,
        showAuth:false
      })
    }
    console.log(API)
    this.setSystemSize()
    this.initScratch()
    if (app.globalData.userInfo) {
      console.log(app.globalData.userInfo)
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    wx.reLaunch({
      url: '../../pages/guide1/guide1',
    })
    // wx.navigateTo({
    //   url: '/packageA/index/index',
    // })
  },
  setSystemSize: function () {
    let {
      windowHeight,
      windowWidth
    } = wx.getSystemInfoSync()
    this.setData({
      windowHeight: windowHeight,
      windowWidth: windowWidth
    })
  },
  initScratch: function () {
    let { windowHeight, windowWidth } = this.data
    this.scratch = new Scratch(this, {
      canvasWidth: windowWidth * 0.72,
      canvasHeight: windowHeight * 0.2,
      imageResource: '../../images/card_img03@2x.png',
      maskColor: 'red',
      r: 4,
      awardTxt: '中大奖',
      awardTxtColor: '#ccc',
      awardTxtFontSize: '24px',
      callback: () => {
        wx.showModal({
          title: '提示',
          content: `您中奖了`,
          showCancel: false,
          success: res => {
            //this.scratch.reset()
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    })
    this.scratch.start()
  },
  closePopWin: function () {
    this.setData({
      showMask: false,
      showScratch: false,
      showAuth: false,
      showRecord: false,
      showPengTip: false,
      showScratchTip: false,
      showPengFail:false,
      showEgg:false,
      showShare:false,
      showEggAward:false,
      showDownload:false,
      showPengSuccess:false,
      showPrizeRecord:false,
      showRanking:false
    })
  },
  authHandle: function () {
    this.closePopWin()
  },
  showRecordHandle: function () {
    this.setData({
      showMask:true,
      showRecord: true
    })
  },
  showPrizeRecordHandle:function(){
    this.setData({
      showMask: true,
      showPrizeRecord: true
    })
  },
  showRankingHandle:function(){
    this.setData({
      showMask: true,
      showRanking: true
    })
  },
  startScratchHandle: function () {
    this.closePopWin();
    this.setData({
      showScratch: true,
      showMask: true
    })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '碰碰1024',
      path: '/packageA/index/index',
      imageUrl: '../../images/share@2x.png',
    }
  },
  //点击分享
  shareHandle:function(){
    this.setData({
      showShare: true,
      showMask: true
    })
  },
  //下载陆金所
  downloadHandle:function(){
    console.log("ds")
    this.setData({
      showDownload: true,
      showMask: true
    })
  }
})