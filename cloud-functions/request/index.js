const axios = require('axios')

// 云函数入口函数
exports.main = async (event, context) => {
  const res = axios.get(event.url, {
    params: {
      q: event.q,
      count: event.count
    }
  }).then(
    res => {
      return res.data
    }
  )
  return res
}