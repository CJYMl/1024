//index.js
//获取应用实例
import Scratch from "../../components/scratch/scratch.js"

const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    this.scratch = new Scratch(this, {
            canvasWidth: 197,
            canvasHeight: 72,
            imageResource: 'https://misc.aotu.io/pfan123/wx/placeholder.png',
            maskColor: 'red',
            r: 4,
            awardTxt: '中大奖',
            awardTxtColor: '#3985ff',
            awardTxtFontSize: '24px',
            callback: () => {
                wx.showModal({
                    title: '提示',
                    content: `您中奖了`,
                    showCancel: false,
                    success: res => {
                        this.scratch.reset()
                        if (res.confirm) {
                            console.log('用户点击确定')
                        } else if (res.cancel) {
                            console.log('用户点击取消')
                        }
                    }
                })
            }
        })
    //this.createLuckyCard()
    if (app.globalData.userInfo) {
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
  createLuckyCard() {
    this.ctx = wx.createCanvasContext('firstCanvas')
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(0, 0, 300, 200);
    this.ctx.draw(true)
  },
  bindtouchstart: function(e) {


  },
  bindtouchmove: function(e) {
    var evt = e.touches[0]
    console.log(evt["x"], evt["y"])
    //this.ctx.beginPath();
    this.ctx.fillStyle = 'transparent';
    //this.ctx.globalCompositeOperation = "destination-out";
    this.ctx.arc(evt["x"], evt["y"], 10, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.draw(true);

  },
  bindtouchend: function(e) {

  }
})