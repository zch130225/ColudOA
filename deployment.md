部署说明

1、注册微信小程序账号获取AppID

2、将项目导入开发者工具中

3、开通云开发环境获取自己的环境ID

4、修改app.js文件中的开发环境ID

    wx.cloud.init({
      env: '',//设置成自己的环境ID
      traceUser: true
    })

5、上传云函数
   将cloudfunctions中的云函数上传到自己的云环境中
   云函数文件夹，右键，选择”上传并部署：云端安装依赖“
   修改所有云函数中index.js的环境ID
   cloud.init({
     env: ""  //设置为自己的环境ID
    })


6、点击开发者工具中“云开发”
   选择数据库，新建数据集合
   user：用户信息数据集合
   leave：请假流程数据集合
   mail_list:邮件列表数据集合
   notice_news：通知、动态数据集合
   wages：工资数据结合

   将文件夹“collection”中的json数据集合备份文件导入相应的数据集合中，作为初始数据

7、用户测试账号
    
    账号：admin 密码：123456
    账号：user  密码：123456