import requestApi from "./utils/request.js"

const testUrl = 'https://1024-test.inansy.com';
const publicUrl = 'https://1024.inansy.com';

//用戶登錄
let userLogin = function(params,method){
  return requestApi(testUrl, params, method)
}

module.exports = {
  userLogin
}