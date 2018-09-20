
const requestApi = (url,params) => {
     return new Promise((resolve,reject) => {
           wx.request({
             url,
             data:params,
             success: (res) => {
               resolve(res)   
             },
             fail: (err) => {
               reject(err)
             }
           })
     })
}


