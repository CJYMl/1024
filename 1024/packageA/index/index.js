//index.js
//获取应用实例
import Scratch from "../../components/scratch/scratch.js"
import API from "../../api.js"
const app = getApp()

Page({
  data: {
    //用户游戏信息
    userGameInfo: {},
    touchRecords: {
      self: {
        "nickname": "nickname",
        "avatar": "avatar",
        "touchTime": 1538132079,
        "step": '4'
      },
      list: [{
          "nickname": "nickname",
          "avatar": "avatar",
          "touchTime": 1538132079,
          "step": '2'
        },
        {
          "nickname": "nickname",
          "avatar": "avatar",
          "touchTime": 1538132079,
          "step": '2'
        },
        {
          "nickname": "nickname",
          "avatar": "avatar",
          "touchTime": 1538132079,
          "step": '2'
        },
      ]
    },
    prizeRecords: [{
      "img": "img",
      "title": "2000积分",
      "drawTime": 1538132079
    }, {
      "img": "img",
      "title": "1000积分",
      "drawTime": 1538132079
    }, {
      "img": "img",
      "title": "50积分",
      "drawTime": 1538132079
    }],
    prizeList: [{
        "img": "img",
        "title": "title"
      },
      {
        "img": "img",
        "title": "title"
      },
      {
        "img": "img",
        "title": "title"
      },
    ],
    friendsDynamic: [{
      nickname: "cjy",
      avatar: "ds",
      step: 2
    }, {
      nickname: "cjy",
      avatar: "ds",
      step: 256
    }],
    rankings: [{
      "nickname": "nickname",
      "avatar": "avatar",
      "step": '4'
    }, {
      "nickname": "nickname",
      "avatar": "avatar",
      "step": '4'
    }, {
      "nickname": "nickname",
      "avatar": "avatar",
      "step": '4'
    }],
    homeBg: [
      "../../images/home_2@2x.png",
      "../../images/home_4@2x.png",
      "./img/home_8@2x.png",
      "./img/home_16@2x.png",
      "./img/home_32@2x.png",
      "./img/home_64@2x.png",
      "./img/home_128@2x.png",
      "./img/home_256@2x.png",
      "./img/home_512@2x.png",
      "./img/home_1024@2x.png",
    ],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    token: wx.getStorageSync("token") || "",
    friendId: "",
    friendInfo: {},
    windowWidth: "",
    windowHeight: "",
    showMask: true,
    showScratch: false,
    showAuth: true,
    showRecord: false,
    showPengTip: false,
    showScratchTip: false,
    showPengFail: false,
    showPengSuccess: true,
    showEgg: false,
    showEggAward: false,
    showShare: false,
    showDownload: false,
    showPrizeRecord: false,
    showRanking: false,
    isCanPeng: false, //是否能对碰,
    stepNumber:'526'
  },
  onLoad: function(options) {
    console.log(options)
    if (wx.getStorageSync("hasVisit")) {
      this.setData({
        showMask: false,
        showAuth: false
      })
   }
    if (options && options.friendId) {
      console.log("get friendId")
      this.setData({
        friendId: options.friendId,
        showMask: true,
        showPengTip: true
      })
    }
    this.initUserData()
    this.setSystemSize()
    this.initScratch()
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
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    let {
      token
    } = this.data

    console.log(token)
    //更新用户信息
    let {
      rawData,
      iv,
      signature,
      encryptedData,
      userInfo
    } = e.detail
    let that = this
    API.updateUserInfo({
      rawData,
      iv,
      signature,
      encryptedData,
      userInfo
    }, "post", token).then((res) => {
      if(res.data.retcode == 2000){
        API.getUserInfo({}, "get", token).then((res) => {
          //console.log(res.data.data)
          if (res.data.retcode == 2000) {
            console.log(res.data.data)
            that.setData({
              userGameInfo: res.data.data
            })
            // //获取好友信息
            // if (friendId) {
            //   API.getFriendInfo({
            //     friendId,
            //     playId: res.data.data.playId
            //   }, "get", token).then((res) => {
            //     if (res.data.retcode == 2000) {
            //       that.setData({
            //         friendInfo: res.data.data
            //       })
            //     } else {
            //       wx.showToast({
            //         title: res.data.info.msg,
            //       })
            //     }
            //   })
            // }
          } else {
            wx.showToast({
              title: res.data.info.msg,
            })
          }
        });
      }
    })
    wx.reLaunch({
      url: '../../pages/guide1/guide1',
    })
    // wx.navigateTo({

    //   url: '/packageA/index/index?friendId=' + this.data.userGameInfo.playId,
    // })
  },
  setSystemSize: function() {
    let {
      windowHeight,
      windowWidth
    } = wx.getSystemInfoSync()
    this.setData({
      windowHeight: windowHeight,
      windowWidth: windowWidth
    })
  },
  initScratch: function() {
    let {
      windowHeight,
      windowWidth
    } = this.data
    this.scratch = new Scratch(this, {
      canvasWidth: windowWidth * 0.72,
      canvasHeight: windowHeight * 0.2,
      imageResource: '../../images/card_img03@2x.png',
      maskColor: 'red',
      r: 15,
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
    this.scratch.restart()
    //this.scratch.start()
  },
  closePopWin: function() {
    this.setData({
      showMask: false,
      showScratch: false,
      showAuth: false,
      showRecord: false,
      showPengTip: false,
      showScratchTip: false,
      showPengFail: false,
      showEgg: false,
      showShare: false,
      showEggAward: false,
      showDownload: false,
      showPengSuccess: false,
      showPrizeRecord: false,
      showRanking: false
    })
  },
  authHandle: function() {
    this.closePopWin()
  },
  showRecordHandle: function() {
    let {
      token
    } = this.data
    //对碰记录
    API.getTouchList({}, "get", token).then((res) => {
      if (res.data.retcode == 2000) {
        that.setData({
          touchRecords: res.data.data
        })
      } else {
        wx.showToast({
          title: res.data.info.msg,
        })
      }
    })
    this.setData({
      showMask: true,
      showRecord: true
    })
  },
  showPrizeRecordHandle: function() {
    let {
      token
    } = this.data
    //中奖记录
    API.getPrizeRedcord({}, "get", token).then((res) => {
      if (res.data.retcode == 2000) {
        this.setData({
          prizeRecords: res.data.data
        })
      } else {
        wx.showToast({
          title: res.data.info.msg,
        })
      }
    })
    this.setData({
      showMask: true,
      showPrizeRecord: true
    })
  },
  showRankingHandle: function() {
    let {
      token
    } = this.data
    //获取排行榜
    API.getRanking({}, "get", token).then((res) => {
      if (res.data.retcode == 2000) {
        that.setData({
          rankings: res.data.data
        })
      } else {
        wx.showToast({
          title: res.data.info.msg,
        })
      }
    })
    this.setData({
      showMask: true,
      showRanking: true
    })
  },
  startScratchHandle: function() {
    this.closePopWin();
    this.setData({
      showScratch: true,
      showMask: true
    })
    this.initScratch()
  },
  onShareAppMessage: function(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
      this.setData({
        showShare: false,
        showMask: false
      })
    }
    return {
      title: '碰碰1024',
      path: '/packageA/index/index?friendId=' + this.data.userGameInfo.userId,
      imageUrl: '../../images/share@2x.png',
    }
  },
  //点击分享
  shareHandle: function() {
    this.setData({
      showShare: true,
      showMask: true
    })
  },
  //点击对碰
  startPenghandle: function() {
    let {
      token,
      friendId,
      userGameInfo
    } = this.data
    let that = this
    console.log("peng")
    //获取好友信息
    API.startPeng({
      friendId,
      playId: userGameInfo.playId+""
    }, "post", token).then((res) => {
      if (res.data.retcode == 2000) {
        that.initUserData()
        that.setData({
          showMask:true,
          showPengTip:false,
          showPengSuccess:true
        })
      } else {
        if (res.data.info.errCode == 310006006){
          that.setData({
            showMask: true,
            showPengTip: false,
            showPengFail: true
          })
        }else{
          wx.showToast({
            title: res.data.info.msg,
          }) 
        }
      }
    })
  },
  //点击砸金蛋
  touchEggHandle: function() {
    if (this.data.userGameInfo.step != 1024) {
      wx.showModal({
        title: '提示',
        content: `只有到小组第一到达1024才能砸金蛋`,
        showCancel: false,
        success: res => {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return
    }
    this.setData({
      showRanking: false,
      showEgg: true,
      showMask: true
    })
  },
  //点击金蛋
  startEggHandle: function() {
    this.setData({
      showEggAward: true,
      showEgg: false,
      showMask: true
    })
  },
  //开始刮奖
  startScratch: function() {
    this.setData({
      showPrizeRecord: false,
      showScratch: true,
      showMask: true
    })
    this.initScratch()
  },
  //下载陆金所
  downloadHandle: function() {
    this.setData({
      showDownload: true,
      showMask: true
    })
  },
  //
  initUserData: function() {
    let {
      token,
      friendId,
    } = this.data
    // 登录
    wx.login({
      success: res => {
        console.log("code",res.code)
        let token = ""
        API.login({
          jsCode: res.code
        }, "post").then((res) => {
          
          if (res.data.retcode == 2000) {
            wx.setStorageSync("token", res.data.data.token)
            
            token = res.data.data.token
            //获取用户信息
            let that = this
            that.setData({
              token
            })
            API.getUserInfo({}, "get", token).then((res) => {
              //console.log(res.data.data)
              if (res.data.retcode == 2000) {
                console.log(res.data.data)
                that.setData({
                  userGameInfo: res.data.data
                })
                //获取好友信息
                if (friendId) {
                  API.getFriendInfo({
                    friendId,
                    playId: res.data.data.playId
                  }, "get", token).then((res) => {
                    if (res.data.retcode == 2000) {
                      that.setData({
                        friendInfo: res.data.data
                      })
                    } else {
                      wx.showToast({
                        title: res.data.info.msg,
                      })
                    }
                  })
                }
              } else {
                wx.showToast({
                  title: res.data.info.msg,
                })
              }
            }),

              //获取好友动态
              API.getFriendsDynamic({}, "get", token).then((res) => {
                if (res.data.retcode == 2000) {
                  that.setData({
                    friendsDynamic: res.data.data
                  })
                } else {
                  wx.showToast({
                    title: res.data.info.msg,
                  })
                }
              })
            //获取奖品列表
            API.getPrizeList({}, "get", token).then((res) => {
              if (res.data.retcode == 2000) {
                that.setData({
                  prizeList: res.data.data
                })
              } else {
                wx.showToast({
                  title: res.data.info.msg,
                })
              }
            })
          } else {
            wx.showToast({
              title: '',
            })
          }
        })
        //发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
   
  }
})