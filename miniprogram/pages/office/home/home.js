Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    iconList: [
      {
        icon: 'mail',
        color: 'blue',
        badge: 'email/email-home',
        name: '邮件服务'
      },
      {
        icon: 'taoxiaopu',
        color: 'green',
        badge: "leave/home",
        name: '请假审批'
      },
      {
        icon: 'moneybag',
        color: 'orange',
        badge: 'wages',
        name: '工资查询'
      },
      {
        icon: 'card',
        color: 'orange',
        badge: 'management/StorageRoom',
        name: '库房管理'
      },
      {
        icon: 'edit',
        color: 'orange',
        badge: 'management/Spotcheck',
        name: '设备点检'
      },
      {
        icon: 'warn',
        color: 'orange',
        badge: 'management/hiddendanger',
        name: '隐患排查'
      }
    ],
    gridCol: 3,
  },
  methods: {
    Navigation: function (e) {
      wx.navigateTo({
        url: "../office/" + e.currentTarget.dataset.index + "/home"
      })
    }
  }
})