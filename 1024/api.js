import {requestApi} from "./utils/request.js"

const testUrl = 'https://1024-test.inansy.com';
const publicUrl = 'https://1024.inansy.com';

let envUrl = testUrl
//用戶登錄
let login = function(params,method){
  return requestApi(envUrl + '/fe/v1/common/login', params, method)
}
//更新用户信息
let updateUserInfo = function (params, method, token) {
  return requestApi(envUrl + '/fe/v1/user/updateUserInfo', params, method, token)
}

//获取用户信息
let getUserInfo = function (params, method, token) {
  return requestApi(envUrl + '/fe/v1/user/data', params, method, token)
}

//获取好友动态
let getFriendsDynamic = function (params, method, token) {
  return requestApi(envUrl + '/fe/v1/user/friends', params, method, token)
}

//获取奖品列表
let getPrizeList = function (params, method, token) {
  return requestApi(envUrl + '/fe/v1/prize/list', params, method, token)
}

//获取对碰记录
let getTouchList = function (params, method, token) {
  return requestApi(envUrl + '/fe/v1/touch/list', params, method, token)
}

//获取中奖记录
let getPrizeRedcord = function (params, method, token) {
  return requestApi(envUrl + '/fe/v1/user/prizeRecord', params, method, token)
}

//获取排行榜
let getRanking = function (params, method, token) {
  return requestApi(envUrl + '/fe/v1/user/ranking', params, method, token)
}

//获取手机验证码
let getPhoneValidateCode = function (params, method, token) {
  return requestApi(envUrl + '/fe/v1/code/phone', params, method, token)
}


//获取图片验证码
let getPictureValidateCode = function (params, method, token) {
  return requestApi(envUrl + '/fe/v1/code/pic', params, method, token)
}

//验证用户
let validateUser = function (params, method, token) {
  return requestApi(envUrl + '/fe/v1/user/sign', params, method, token)
}

//获取好友信息
let getFriendInfo = function (params, method, token) {
  return requestApi(envUrl + '/fe/v1/user/friend', params, method, token)
}

//对碰
let startPeng = function (params, method, token) {
  return requestApi(envUrl + '/fe/v1/touch/friend', params, method, token)
}

//抽奖
let lottery = function (params, method, token) {
  return requestApi(envUrl + '/fe/v1/draw/index', params, method, token)
}
module.exports = {
  login,
  updateUserInfo,
  getUserInfo,
  getFriendsDynamic,
  getPhoneValidateCode,
  getPictureValidateCode,
  getPrizeRedcord,
  getPrizeList,
  getTouchList,
  getRanking,
  validateUser
}