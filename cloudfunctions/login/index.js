const cloud = require('wx-server-sdk')
const crypto = require('crypto')
const db = cloud.database()
const _ = db.command
cloud.init({
  env: "cloudoa-1ex4g"
})
exports.main = async (event, context) => {
  let data
  let md5 = crypto.createHash('md5')
  let newpwd = md5.update(event.psw).digest('hex')
  const result = await db.collection('user')
    .where({
      user: event.user
    }).get()

  if (result.data.length == 0) {
    data = {
      msg: "not ok",
      statuse: false
    }
  } else if (result.data[0].user == event.user && result.data[0].password == newpwd) {
    delete result.data[0].password
    db.collection('user').doc(result.data[0]._id).update({
      data: {
        Login_status: true,
      }
    })
    data = {
      userinfo: result.data[0],
      msg: "ok",
      statuse: true
    }
  } else {
    data = {
      msg: "not ok",
      statuse: false
    }
  }
  return {
    data
  }
}

