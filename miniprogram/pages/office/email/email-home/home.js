const app = getApp()
const db = wx.cloud.database({})
const _ = db.command
let watcher
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
  },
  open_new_mail(e) {
    app.globalData.mail_id = ""
    wx.navigateTo({
      url: "../email-new/home",
      success: function (res) {
        res.eventChannel.emit('acceptDataFromOpenerPage', { condition: true })
      }
    })
  },
  details(e) {
    wx.cloud.callFunction({
      name: 'update',
      data: {
        collection: "mail_list",
        where_data: {
          _id: e.currentTarget.dataset._id
        },
        update_data: {
          status: false
        }
      }
    }).then(res => {

    }).catch(err => {

    })
    app.globalData.mail_id = e.currentTarget.dataset._id
    wx.navigateTo({
      url: "../email-new/home"
    })
  },
  onShow: function () {
    const that = this
    watcher = db.collection('mail_list') .where({
      To:wx.getStorageSync('userinfo').name
    })
      .orderBy('date', 'desc')
      .limit(10)
      .watch({
        onChange: function (snapshot) {
          console.log(snapshot.docs)
          that.setData({
            mail: snapshot.docs
          })
        },
        onError: function (err) {
          console.error('the watch closed because of error', err)
        }
      })
  }
})
