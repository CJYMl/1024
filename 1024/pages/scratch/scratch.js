import Scratch from '../../components/scratch/scratch.js'

Page({
    data: {
        isStart: true,
        txt: '开始刮奖'
    },

    onLoad () {
        let {windowWidth,windowHeight} = wx.getSystemInfoSync()
        this.setData({
            windowWidth,
            windowHeight
        })
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

    onReady () {
        console.log('onReady')
    },

    onStart () {
    }

})
