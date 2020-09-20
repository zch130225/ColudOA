Component({
  options: {
    addGlobalClass: true,
  },
  data: {

  },
  lifetimes: {
    attached: function () {
      this.setData({
        userinfo: wx.getStorageSync('userinfo')
      })
    },
    detached: function () {

    },
  },
  methods: {
    
  }
})