const db = wx.cloud.database({})
const _ = db.command
Page({
  data: {
    date: new Date().getFullYear() + "-" + (new Date().getMonth() + 1),
  },
  async DateChange(e) {
    wx.showLoading({
      title: '数据查询中',
    })
    const that = this
    const C = await db.collection('wages').where({
      C_063: "1234",
    }).get()
    const result = await db.collection('wages').where({
      C_009:wx.getStorageSync('userinfo').name,
      C_002: e.detail.value
    }
    ).get()
    delete C.data[0].C_063
    delete C.data[0]._id
    console.log(result.data.length)
    if (!result.data.length == 0) {
      that.setData({
        empty: false,
        list: C.data[0],
        wages: result.data[0]
      })
    } else {
      that.setData({
        empty: true
      })
    }
    wx.hideLoading()
  },
  async onLoad(options) {

  },
})