// 云函数入口文件
const cloud = require('wx-server-sdk')
const pinyin = require("node-pinyin");
cloud.init({
  env: "cloudoa-1ex4g"
})
const db = cloud.database()
let data

const data_demo = [
  { "kind": "A", "entitys": [] },
  { "kind": "B", "entitys": [] },
  { "kind": "C", "entitys": [] },
  { "kind": "D", "entitys": [] },
  { "kind": "E", "entitys": [] },
  { "kind": "F", "entitys": [] },
  { "kind": "G", "entitys": [] },
  { "kind": "H", "entitys": [] },
  { "kind": "I", "entitys": [] },
  { "kind": "J", "entitys": [] },
  { "kind": "K", "entitys": [] },
  { "kind": "L", "entitys": [] },
  { "kind": "M", "entitys": [] },
  { "kind": "N", "entitys": [] },
  { "kind": "O", "entitys": [] },
  { "kind": "P", "entitys": [] },
  { "kind": "Q", "entitys": [] },
  { "kind": "R", "entitys": [] },
  { "kind": "S", "entitys": [] },
  { "kind": "T", "entitys": [] },
  { "kind": "U", "entitys": [] },
  { "kind": "V", "entitys": [] },
  { "kind": "W", "entitys": [] },
  { "kind": "X", "entitys": [] },
  { "kind": "Y", "entitys": [] },
  { "kind": "Z", "entitys": [] },
]
const str = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

function userlist(userlist) {

  for (i = 0; i < userlist.length; i++) {
    let name_py = pinyin(userlist[i].name)

    var pos = str.indexOf(name_py[0].toString().slice(0, 1));
    data[pos].entitys.push({ "name": userlist[i].name, "email": userlist[i].email })
  };
}
// 云函数入口函数
exports.main = async (event, context) => {
  for (i = 0; i < 26; i++) {
    data_demo[i].entitys=[]
  };
  data=data_demo

  const result = await db.collection('user').field({
    user: true,
    name: true,
    email: true,
  }).get()
  await userlist(result.data)


  return {
    data

  }
}