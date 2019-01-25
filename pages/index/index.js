//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    searchKey: '我爱读书',
    books: [],
    detail: {}
  },
  /**
   * 获取搜索关键字
   */
  getSearchKey (e) {
    this.setData({ searchKey: e.detail.value})
  },
  /**
   * 搜索图书
   */
  searchBooks () {
    this.showLoading()
    wx.request({
      url: 'https://douban.smaug.top/v2/book/search',
      data: {
        q: this.data.searchKey,
        count: 50
      },
      header: {
        "Content-Type": "application-json"
      },
      success: (res) => {
        this.setData({books: res.data.books})
        this.cancelLoading()
      }
    })
  },
  /**
   * 获取图书详情
   */
  getDetail (e) {
    this.showLoading()
    wx.request({
      url: 'https://douban.smaug.top/v2/book/' + e.currentTarget.dataset.id,
      header: {
        "Content-Type": "json"
      },
      success: (res) => {
        this.setData({ detail: res.data })
        wx.navigateTo({url: '../detail/detail'})
        this.cancelLoading()
      }
    })
  },
  /**
   * 进入loading状态
   */
  showLoading () {
    wx.showLoading({
      title: '加载中',
      icon: 'loading'
    })
  },
  /**
   * 退出loading状态
   */
  cancelLoading () {
    wx.hideLoading()
  },
  /**
   * 页面加载完成进行的操作
   */
  onLoad () {
    this.searchBooks()
  }
})
