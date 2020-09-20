const db = wx.cloud.database({})
let watcher
let list_id
Page({
  /**
   * 页面的初始数据
   */
  data: {

  },
  open_new(e) {
    wx.navigateTo({
      url: "../new/home",
      success: function (res) {
        res.eventChannel.emit('acceptDataFromOpenerPage', { condition: true })
      }
    })
  },
  showModal(e) {

    list_id = e.currentTarget.dataset.id
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  async onLoad(options) {
    const that = this
    const result = await db.collection('user').where({ user: wx.getStorageSync('userinfo').user }).field({
      position: true,
    }).get()

    if (result.data[0].position == 2) {
      watcher = db.collection('leave')
        .orderBy('Creationtime', 'desc')
        .where({
          applicant: wx.getStorageSync('userinfo').name
        })
        .watch({
          onChange: function (snapshot) {
            that.setData({
              list: snapshot.docs,
              position: result.data[0].position
            })
          },
          onError: function (err) {
            console.error('the watch closed because of error', err)
          }
        })
    } else {
      watcher = db.collection('leave')
        .orderBy('Creationtime', 'desc')
        .where({
          // applicant: ""
        })
        .watch({
          onChange: function (snapshot) {
            that.setData({
              list: snapshot.docs,
              position: result.data[0].position
            })
          },
          onError: function (err) {
            console.error('the watch closed because of error', err)
          }
        })
    }
  },
  no(e) {
  
    wx.cloud.callFunction({
      name: 'update',
      data: {
        collection: "leave",
        where_data: {
          _id: list_id
        },
        update_data: {
          status: "no"
        },

      }
    }).then(res => {
      this.hideModal()

    }).catch(err => {

    })
  },
  yes(e) {
    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'update',
      data: {
        collection: "leave",
        where_data: {
          _id: list_id
        },
        update_data: {
          status: "yes"
        },

      }
    }).then(res => {
      this.hideModal()
    }).catch(err => {
    })
  },
})