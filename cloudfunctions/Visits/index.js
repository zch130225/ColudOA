// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: 'cloudoa-1ex4g'})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {

  const _ = db.command
  return await db.collection(event.collection).doc(event.id).update({
    data: {
      Visits: _.inc(1)
    },
    success:(res) => {
      console.log(res)
   
    },
    fail: (err) => {

   
    }
  })
  return 

  
}