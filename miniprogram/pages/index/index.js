const app = getApp()
const db = wx.cloud.database({})
Page({
  data: {
    height: app.globalData.wind_height - app.globalData.CustomBar,
    PageCur: 'home',
    login_user: "",
    login_pwd: "",
  },
  login_user: function (e) {
    this.setData({
      login_user: e.detail.value
    })
  },
  login_psw: function (e) {
    this.setData({
      login_psw: e.detail.value
    })
  },
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
  },
  async login(e) {
    const that=this
    if (e.detail.userInfo) {
      wx.showLoading({
        title: '登录中。。。',
      })
      wx.cloud.callFunction({
        name: 'login',
        data: {
          user: that.data.login_user,
          psw: that.data.login_psw
        }
      }).then(res => {
        if (res.result.data.statuse) {
          wx.showToast({
            title: '登录成功',
            icon: 'none',
            duration: 1000
          })
          try {
            wx.setStorageSync('userinfo', res.result.data.userinfo)
          } catch (e) {
    
          }
          that.setData({
            login_status: true,
            name: wx.getStorageSync('userinfo').name
          })
        } else {
          wx.showToast({
            title: '登录失败！！',
            icon: 'none',
            duration: 1000
          })
        }
      }).catch(err => {
        wx.showToast({
          title: '登录失败！！',
          icon: 'none',
          duration: 2000
        })
      })
      wx.hideLoading()
    } else {
      wx.showModal({
        title: '警告',
        content: '您取消授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {

          }
        }
      })
    }

  },
  async onload(e) {

    try {
      var value = wx.getStorageSync('userinfo')
      if (value) {
        this.setData({
          login_status: true,
          name: wx.getStorageSync('userinfo').name
        })
      } else {
  
      }
    } catch (e) {
  
    }
  },

  logout: function (e) {
    this.setData({
      PageCur: "home",
      login_status: app.globalData.login_status,
    })
  }

})
