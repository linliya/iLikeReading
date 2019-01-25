// 云函数入口文件
const cloud = require('wx-server-sdk')
const axios = require('axios')

cloud.init()
// 云函数入口函数
exports.main = async (event, context) => {
  const { url, q, count, header } = event

  const res = await axios({
    method: 'post',
    url: url,
    data: {
      q: q,
      count: count
    },
    headers: header
  })

  return res
}