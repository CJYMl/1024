//index.js
//获取应用实例
import Scratch from "../../components/scratch/scratch.js"
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    windowWidth: "",
    windowHeight: "",
    showMask:true,
    showScratch:true
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    this.initScratch()
    this.setSystemSize()
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
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  setSystemSize: function() {
    let {
      windowHeight,
      windowWidth
    } = wx.getSystemInfoSync()
    console.log(windowHeight, windowWidth)
    this.setData({
      windowHeight: windowHeight + "px",
      windowWidth: windowWidth + "px"
    })
  },
  initScratch: function() {
    this.scratch = new Scratch(this, {
      canvasWidth: 230,
      canvasHeight: 100,
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
  closePopWin:function(){
    
  }
})