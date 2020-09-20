// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: 'cloudoa-1ex4g'})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection(event.collection).where(
      event.where_data
    )
    .update({
      data: event.update_data,
    })
  } catch(e) {

  }
}