//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    searchKey: '我爱读书',
    books: [],
    detail: {}
  },
  getSearchKey (e) {
    this.setData({ searchKey: e.detail.value})
  },
  //事件处理函数
  searchBooks () {
    let that = this
    this.showLoading()
    wx.request({
      url: 'https://douban.smaug.top/v2/book/search',
      data: {
        q: this.data.searchKey,
        count: 100
      },
      header: {
        "Content-Type": "application-json"
      },
      success: (res) => {
        that.setData({books: res.data.books})
        this.cancelLoading()
      }
    })
  },
  getDetail (e) {
    let that = this
    this.showLoading()
    wx.request({
      url: 'https://douban.smaug.top/v2/book/' + e.currentTarget.dataset.id,
      header: {
        "Content-Type": "json"
      },
      success: (res) => {
        that.setData({ detail: res.data })
        wx.navigateTo({url: '../detail/detail'})
        this.cancelLoading()
      }
    })
  },
  showLoading() {
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    })
  },
  cancelLoading() {
    wx.hideToast()
  },
  onLoad: function () {
    this.searchBooks()
  },
})
