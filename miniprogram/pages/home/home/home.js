const app = getApp()
const db = wx.cloud.database({})
const _ = db.command
let watcher_notice
let watcher_news
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    cardCur: 0,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://6561-eaamsys-01i0z-1254125800.tcb.qcloud.la/1.png'
    }, {
      id: 1,
      type: 'image',
      url: 'https://6561-eaamsys-01i0z-1254125800.tcb.qcloud.la/2.png',
    }, {
      id: 2,
      type: 'image',
      url: 'https://6561-eaamsys-01i0z-1254125800.tcb.qcloud.la/3.png'
    }, {
      id: 3,
      type: 'image',
      url: 'https://6561-eaamsys-01i0z-1254125800.tcb.qcloud.la/4.png'
    }],
  },
  lifetimes: {
    attached: function () {
      const that = this
      try {
        db.collection('notice_news').where({
          date: _.gt(new Date("2020/08/01 11:36")),
          type: "notice"
        })
          .orderBy('date', 'desc')
          .limit(4)
          .field({
            _id: true,
            theme: true,
            Visits: true,
            date: true,
          })
          .get()
          .then(res => {
            that.setData({
              noticelist: res.data
            })
          })
        db.collection('notice_news').where({
          date: _.gt(new Date("2020/08/01 11:36")),
          type: "news"
        })
          .orderBy('date', 'desc')
          .limit(4)
          .field({
            _id: true,
            theme: true,
            Visits: true,
            date: true,
          })
          .get()
          .then(res => {
            that.setData({
              newslist: res.data
            })
          })
        watcher_notice = db.collection('notice_news')
          .where({
            type: "notice"
          })
          .orderBy('date', 'desc')
          .watch({
            onChange: function (snapshot) {
              that.setData({
                Visits_notice: snapshot.docs
              })
            },
            onError: function (err) {
            }
          })
        watcher_news = db.collection('notice_news')
        .where({
          type: "news"
        })
          .orderBy('date', 'desc')
          .watch({
            onChange: function (snapshot) {
              that.setData({
                Visits_news: snapshot.docs
              })
            },
            onError: function (err) {
            }
          })
      }
      catch (error) {

      }
    },
    detached: function () {

    },
  },
  methods: {
    DotStyle(e) {
      this.setData({
        DotStyle: e.detail.value
      })
    },
    cardSwiper(e) {
      this.setData({
        cardCur: e.detail.current
      })
    },
    goto_notice(e) {
      wx.cloud.callFunction({
        name: 'Visits',
        data: {
          collection: "notice_news",
          id: e.currentTarget.dataset._id,
        }
      }).then(res => {


      }).catch(err => {

      })
      app.globalData.details_id = e.currentTarget.dataset._id
      wx.navigateTo({
        url: "../home/details/home"
      })
    }
  }
})