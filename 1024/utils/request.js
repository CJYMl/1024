
const requestApi = (url, params, method, token) => {
     return new Promise((resolve,reject) => {
           wx.request({
             url,
             data:params,
             method:method || "GET",
             header: {
               authorization:token
             },
             success: (res) => {
               resolve(res)   
             },
             fail: (err) => {
               reject(err)
             }
           })
     })
}
module.exports = {
  requestApi
}

