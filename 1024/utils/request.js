
const requestApi = (url,params,method) => {
     return new Promise((resolve,reject) => {
           wx.request({
             url,
             data:params,
             method:method || "GET",
             success: (res) => {
               resolve(res)   
             },
             fail: (err) => {
               reject(err)
             }
           })
     })
}


