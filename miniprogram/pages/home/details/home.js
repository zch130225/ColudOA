const app = getApp()
const db = wx.cloud.database({})
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
  },
  onLoad: async function (options) {
    wx.showLoading({
      title: '加载中',
    })

     db.collection('notice_news').doc(app.globalData.details_id).get().then(res => {
 
       const year=res.data.date.getFullYear(); 
       const month=res.data.date.getMonth(); 
       const date=res.data.date.getDate();
      this.setData({
         details:res.data,
         date:year +"-"+ (month+1) + "-" + date
        })
        wx.hideLoading()
     })
  },
})