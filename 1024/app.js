//app.js
import API from "./api.js"
App({
  onLaunch: function() {
    // 登录
    wx.login({
      success: res => {
        let token = ""
        API.login({
          jsCode: res.code
        }, "post").then((res) => {

          if (res.data.retcode == 2000) {
            wx.setStorageSync("token", res.data.data.token)
            token = res.data.data.token
            console.log("token", token)

            // //获取图片验证码
            API.getPictureValidateCode({}, "get", token).then((data) => {
              console.log(data)
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
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            withCredentials: true,
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              let token = wx.getStorageSync("token")

              //更新用户信息
              let {
                rawData,
                iv,
                signature,
                encryptedData,
                userInfo
              } = res
              API.updateUserInfo({
                rawData,
                iv,
                signature,
                encryptedData,
                userInfo
              }, "post", token).then((data) => {
                console.log(data)
              })
              
            
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})