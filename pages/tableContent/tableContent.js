// pages/tableContent/tableContent.js
import api from "../../http/api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book_id:"",
    chapters:[]
  },
  bookChapters() {
    this.setData({
      book_id: wx.getStorageSync('bookChapters')
    })
    api.bookChapters(this.data.book_id).then(res => {
      console.log(res.chapters)
      this.setData({
        chapters:res.chapters
      })
    }).catch(err => {
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: wx.getStorageSync('bookTitle')
    })
    this.bookChapters()
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