
const db = wx.cloud.database()
const app = getApp();
let url_list
Page({

  data: {
    imgList: [],
    fileURLs: [],
    condition: false
  },
  mail_to: function (e) {
    this.setData({
      mail_to: e.detail.value
    })
  },
  mail_theme: function (e) {
    this.setData({
      mail_theme: e.detail.value
    })
  },
  mail_content(e) {
    this.setData({
      mail_content: e.detail.value
    })
  },
  ChooseFile() {
    wx.chooseMessageFile({
      count: 4,
      type: 'all',
      success: (res) => {
    
        if (this.data.imgList.length != 0) {
          this.data.imgList = this.data.imgList.concat(res.tempFiles)
          this.setData({
            imgList: this.data.imgList
          })
        } else {
          this.data.imgList = this.data.imgList.concat(res.tempFiles)
          this.setData({
            imgList: res.tempFiles
          })
        }
      }
    });
  },
  DelFile(e) {
    wx.showModal({
      title: '文件去留',
      content: '确定要删除\n\r' + this.data.imgList[e.currentTarget.dataset.index].name + '\n这个文件吗？',
      cancelText: '琢磨琢磨',
      confirmText: '狠心删了',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  userlist(e) {
    wx.navigateTo({
      url: "../../../userlist/home"
    })
  },
  onLoad: function (options) {
    wx.showLoading({
      mask: true,
      title: '数据加载中',
    })
    const that = this
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', function (data) {
      that.setData({
        condition: true
      })
    })
    if (!app.globalData.mail_id) {

      try {
        var value = wx.getStorageSync('mail_info')
        if (value) {
        } else {
          wx.setStorage({
            key: "mail_info",
            data: {
              imgList: [],
              to: '',
              content: '',
              theme: '',
            }
          })

        }
      } catch (e) {

      }
      this.setData({
        mail_from: wx.getStorageSync('userinfo').name,
        mail_to: wx.getStorageSync('mail_info').to,
        mail_theme: wx.getStorageSync('mail_info').theme,
        mail_content: wx.getStorageSync('mail_info').content,
        imgList: wx.getStorageSync('mail_info').imgList
      })
      wx.hideLoading()
    } else {

      db.collection('mail_list').doc(app.globalData.mail_id).get().then(res => {
        url_list = res.data.enclosure
        this.setData({
          mail_from: res.data.From,
          mail_to: wx.getStorageSync('mail_info').to,
          mail_theme: res.data.theme,
          mail_content: res.data.content,
          imgList: res.data.imgList
        })
        wx.hideLoading()
      })
    }
  },
  save: function (e) {
    wx.setStorage({
      key: "mail_info",
      data: {
        imgList: this.data.imgList,
        to: this.data.mail_to,
        content: this.data.mail_content,
        theme: this.data.mail_theme,
      }
    })
  },
  Reset: function (e) {
    wx.setStorage({
      key: "mail_info",
      data: {
        imgList: [],
        to: '',
        content: '',
        theme: '',
      }
    })
    this.setData({
      mail_from: "赵晨辉,<zch130225@163.com>",
      mail_to: wx.getStorageSync('mail_info').to,
      mail_theme: wx.getStorageSync('mail_info').theme,
      mail_content: wx.getStorageSync('mail_info').content,
      imgList: wx.getStorageSync('mail_info').imgList
    })

  },
  async send_mail() {
    const that = this
    if (this.data.mail_to == "") {
      wx.showToast({
        title: '收信人不能为空！！',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (this.data.mail_theme == "") {
      wx.showToast({
        title: '信件主题不能为空！！',
        icon: 'none',
        duration: 2000
      })
      return
    }

    if (this.data.imgList.length == 0) {
      that.addfile()
    } else {
      let img_list = this.data.imgList
      wx.showLoading({
        title: '上传中',
      })
      var promise = Promise.all(img_list.map((tempFilePath, index) => {
        return new Promise(function (resolve, reject) {
          wx.cloud.uploadFile({
            cloudPath: wx.getStorageSync('userinfo').user +"/" + img_list[index].name,
            filePath: img_list[index].path,
            success: function (res) {
      
              resolve(res);
            },
            fail: function (err) {

              reject(new Error('failed to upload file'));
            }
          });
        });
      }));
      promise.then(function (results) {
        wx.showToast({
          title: "上传成功",
        })
        that.addfile(results)

      }).catch(function (err) {

      });
    }
  },
  addfile: function (results) {
    const that = this
    db.collection('mail_list').add({
      data: {
        From: that.data.mail_from,
        To: that.data.mail_to,
        content: that.data.mail_content,
        date: new Date().getTime(new Date()),
        status: true,
        theme: that.data.mail_theme,
        imgList: that.data.imgList,
        enclosure: results
      }
    })
      .then(res => {
        wx.showToast({
          title: "发送成功",
        })
      })
      .catch(console.error)
  },
  download(e) {
    wx.showLoading({
      title: '打开文件中',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 5000)

    wx.cloud.downloadFile({
      fileID: url_list[e.currentTarget.dataset.index].fileID,
      success: res => {
        wx.openDocument({
          filePath: res.tempFilePath,
          showMenu: true,
          success: function (res) {
            wx.hideLoading()

          }
        })
      },
      fail: err => {
        wx.hideLoading()
      }
    })
  },
  onShow: function () {
 
    const that = this
    try {
      let name = app.globalData.userinfo.name
      that.setData({
        mail_to: name
      })
    }
    catch{

    }

  },
})
