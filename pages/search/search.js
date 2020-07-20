const {
  default: api
} = require("../../http/api")

// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newHotWords: [],
    flag: false,
    placeholder: '输入书名或者作者名',
    value: '',
    color: '',
    history: [],
    bookSearch: []
  },
  clickItem(e) {
    let book_id = e.currentTarget.dataset.item.book
    wx.setStorageSync('detail_id', book_id)
    wx.navigateTo({
      url: '/pages/detail/detail',
    })
  },
  clickItem1(e){
    this.setData({
      value: e.currentTarget.dataset.item
    })
    this.bookSearch()
  },
  hotWord() {
    api.hotWord().then(res => {
      console.log(res)
      //随机颜色
      res.newHotWords.map(item => {
        let r = parseInt(Math.random() * 256)
        let g = parseInt(Math.random() * 256)
        let b = parseInt(Math.random() * 256)
        let color = `rgb(${r}, ${g}, ${b})`
        item.color = color
      })
      this.setData({
        newHotWords: res.newHotWords
      })
      //随机数组
      let num1 = parseInt(Math.random() * this.data.newHotWords.length)
      let num2 = parseInt(Math.random() * this.data.newHotWords.length)
      if (num1 !== num2 && num1 < num2) {
        this.setData({
          newHotWords: this.data.newHotWords.slice(num1, num2)
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  bindInput(e) {
    this.setData({
      value: e.detail.value
    })
    this.bookSearch()
  },
  bindBlur() {
    //历史记录
    if (wx.getStorageSync('history')) {
      let arr = wx.getStorageSync('history')
      if (arr.indexOf(this.data.value) === -1) {
        arr.push(this.data.value)
        wx.setStorageSync('history', arr)
      }
    } else {
      let list = []
      list.push(this.data.value)
      wx.setStorageSync('history', list)
    }
    // console.log(this.data.value)
    this.setData({
      history: wx.getStorageSync('history')
    })
  },
  bindConfirm() {
    //历史记录
    if (wx.getStorageSync('history')) {
      let arr = wx.getStorageSync('history')
      if (arr.indexOf(this.data.value) === -1) {
        arr.push(this.data.value)
        wx.setStorageSync('history', arr)
      }
    } else {
      let list = []
      list.push(this.data.value)
      wx.setStorageSync('history', list)
    }
    // console.log(this.data.value)
    this.setData({
      history: wx.getStorageSync('history')
    })
  },
  del() {
    this.setData({
      value: '',
    })
  },
  //生成随机颜色
  clickNew() {
    this.hotWord()
  },
  //清空历史
  clickDel() {
    if (wx.getStorageSync('history')) {
      wx.showToast({
        title: '清空成功',
        icon: 'success'
      })
      wx.removeStorageSync('history')
    }
    this.setData({
      history: wx.getStorageSync('history')
    })
  },
  //历史记录
  history() {
    this.setData({
      history: wx.getStorageSync('history')
    })
  },
  bookSearch() {
    api.bookSearch(this.data.value).then(res => {
      console.log(res)
      res.books.map(item => {
        item.cover = 'https://statics.zhuishushenqi.com' + item.cover
      })
      this.setData({
        bookSearch: res.books
      })
    }).catch(err => {
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.hotWord()
    this.history()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})