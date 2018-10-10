// pages/user/user.js
import API from "../../api.js"
import {
  Base64
} from "../../utils/base64.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    validCodeSvg: "",
    token: wx.getStorageSync("token") || "",
    picCode: "",
    phone:"",
    phoneCode: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getCodeImage()
  },
  removeValue:function(){
    console.log("ds")
    this.setData({
      phone: "",
    })
  },
  //获取图片验证码
  getCodeImage: function() {
    let {
      token
    } = this.data
    API.getPictureValidateCode({}, "get", token).then((res) => {
      if (res.data.retcode == 2000) {
        this.setData({
          validCodeSvg: Base64.encode(res.data.data.img)
        })
      } else {
        wx.showToast({
          title: res.data.info.msg,
        })
      }
    })
  },
  //获取手机验证码
  getDynamicCode: function() {
    let {
      token,
      phone
    } = this.data
    if (!this.checkPhone()){
      wx.showToast({
        title: '手机号码不合法',
      })
      return true
    }
    API.getPhoneValidateCode({
      phone
    }, "post", token).then((data) => {
      if (res.data.retcode == 2000) {

      } else {
        wx.showToast({
          title: res.data.info.msg,
        })
      }
    })
  },
  //设置用户手机号
  setPhoneValue: function(e) {
    let phone = e.detail.value
    this.setData({
      phone
    })
  },
  //设置手机动态码
  setPhoneCode: function(e) {
    let phoneCode = e.detail.value
    this.setData({
      phoneCode
    })
  },
  //设置图片验证码
  setPicCode: function(e) {
    let picCode = e.detail.value
    this.setData({
      picCode
    })
  },
  //验证手机号码
  checkPhone: function() {
    let {
      phone,
    } = this.data
    if ((/^1[34578]\d{9}$/.test(phone))) {
      return true;
    }
  },
  //验证用户
  validateUser: function() {
    let {
      token,
      phone,
      phoneCode,
      picCode
    } = this.data
    if (!this.checkPhone()) {
      wx.showToast({
        title: '手机号码不合法',
      })
      return true
    }
    if (!phoneCode || !picCode){
      wx.showToast({
        title: '请输入验证码',
      })
      return true
    }
    API.validateUser({
      phone,
      phoneCode,
      picCode
    }, "get", token).then((data) => {
      // if (res.data.retcode != 2000) {
      //   wx.showToast({
      //     title: res.data.info.msg,
      //   })
      // }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})