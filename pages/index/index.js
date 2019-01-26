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

    wx.cloud.init()
    wx.cloud.callFunction({
      name: 'request',
      data: {
        url: 'https://api.douban.com/v2/book/search',
        q: this.data.searchKey,
        count: 50
      },
    })
      .then(res => {
        this.setData({ books: res.result.books })
        this.cancelLoading()
      })
      .catch(console.error)
  },
  /**
   * 获取图书详情
   */
  getDetail (e) {
    this.showLoading()

    wx.cloud.init()
    wx.cloud.callFunction({
      name: 'request-detail',
      data: {
        url: 'https://api.douban.com/v2/book/' + e.currentTarget.dataset.id
      },
    })
      .then(res => {
        console.log(res.result)
        this.setData({ detail: res.result })
        wx.navigateTo({url: '../detail/detail'})
        this.cancelLoading()
      })
      .catch(console.error)
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
