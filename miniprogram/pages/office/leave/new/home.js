const db = wx.cloud.database({})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picker: ['其他', '年假', '事假', '病假', '探亲假', '产假', '婚假'],
    numList: [{
      name: '开始'
    }, {
      name: '等待'
    }, {
      name: '错误'
    }, {
      name: '完成'
    },],
    starttime: '08:01',
    endtime: '20:01',
    startdate: '2018-2-25',
    enddate: '2018-2-25',
    index: "",
    leave_content: ""
  },
  PickerChange(e) {

    this.setData({
      index: e.detail.value
    })
  },

  startTimeChange(e) {
    this.setData({
      starttime: e.detail.value
    })
  },
  startDateChange(e) {
    this.setData({
      startdate: e.detail.value
    })
  },
  endTimeChange(e) {
    this.setData({
      endtime: e.detail.value
    })
  },
  endDateChange(e) {
    this.setData({
      enddate: e.detail.value
    })
  },
  leave_content(e) {
    this.setData({
      leave_content: e.detail.value
    })
  },

  Submit() {
    if (!this.data.index) {
      wx.showToast({
        title: '请选择流程类型',
        icon: 'success',
        duration: 2000
      })
      return
    }
    wx.showLoading({
      title: '数据提交中',
    })

    db.collection('leave').add({

      // data 字段表示需新增的 JSON 数据
      data: {
        applicant: wx.getStorageSync('userinfo').name,
        department: wx.getStorageSync('userinfo').department,
        startdate: this.data.startdate,
        starttime: this.data.starttime,
        enddate: this.data.enddate,
        endtime: this.data.endtime,
        Creationtime: new Date().getTime(new Date()),
        type: this.data.picker[this.data.index],
        leave_content: this.data.leave_content,
        status: "ing",

      }
    })
      .then(res => {
 
        if (res.errMsg == "collection.add:ok") {
          wx.hideLoading()
          wx.navigateBack()
        }
      })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})