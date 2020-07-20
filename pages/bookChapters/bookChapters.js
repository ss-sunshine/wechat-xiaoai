// pages/bookChapters/bookChapters.js
import api from "../../http/api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book_id: '',
    body: '',
    title: '',
    fontSize: 32,
    flag: false,
    color: false,
    big: false,
    num: 0,
    rgb: '#fff'
  },
  click() {
    if (this.data.flag === false) {
      this.setData({
        flag: true
      })
    } else if (this.data.flag === true) {
      this.setData({
        flag: false
      })
    }
  },
  clickLess() {
    if (this.data.fontSize > 24 && this.data.fontSize <= 60) {
      this.setData({
        fontSize: this.data.fontSize - 2
      })
    } else if (this.data.fontSize === 24) {
      wx.showToast({
        title: '字体最小了',
        icon: 'none',
        duration: 2000 //持续的时间
      })
    }
  },
  clickAdd() {
    if (this.data.fontSize >= 24 && this.data.fontSize < 60) {
      this.setData({
        fontSize: this.data.fontSize + 2
      })
    } else if (this.data.fontSize === 60) {
      wx.showToast({
        title: '字体最大了',
        icon: 'none',
        duration: 2000 //持续的时间
      })
    }
  },
  clickColor() {
    if (this.data.color === false) {
      this.setData({
        color: true
      })
    } else if (this.data.color === true) {
      this.setData({
        color: false
      })
    }
  },
  clickColor_item(e) {
    this.setData({
      num: e.currentTarget.dataset.index
    })
    // console.log(this.data.num)
    if (this.data.num === 0) {
      this.setData({
        rgb: "#fff"
      })
    } else if (this.data.num === 1) {
      this.setData({
        rgb: "#E3E1C4"
      })
    } else if (this.data.num === 2) {
      this.setData({
        rgb: "#E6EAE2"
      })
    } else if (this.data.num === 3) {
      this.setData({
        rgb: "#A0A39F"
      })
    } else if (this.data.num === 4) {
      this.setData({
        rgb: "#CAECD1"
      })
    }
  },
  bookChapters() {
    this.setData({
      book_id: wx.getStorageSync('bookChapters')
    })
    api.bookChapters(this.data.book_id).then(res => {
      // console.log(res)
      api.chapterContent(res.chapters[0].link).then(res => {
        console.log(res)
        //正则替换  replace
        res.chapter.body = res.chapter.body.replace(/。/, "。<div>")
        res.chapter.body = res.chapter.body.replace(/安卓手机，推荐您：/g, "<div>安卓手机，推荐您：<div>")
        res.chapter.body = res.chapter.body.replace(/苹果手机，推荐您：/g, "<div>苹果手机，推荐您：<div>")
        this.setData({
          body: res.chapter.body,
          title: res.chapter.title
        })
      }).catch(err => {
        console.log(err)
      })
    }).catch(err => {
      console.log(err)
    })
  },
  clickContent() {
    wx.setStorageSync('bookChapters', this.data.book_id)
    wx.navigateTo({
      url: '/pages/tableContent/tableContent',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    })
    wx.setNavigationBarTitle({
      title: wx.getStorageSync('bookTitle')
    })
    setTimeout(() => {
      this.bookChapters()
      wx.hideLoading()
    }, 1500)
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