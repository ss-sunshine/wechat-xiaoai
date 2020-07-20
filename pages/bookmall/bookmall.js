// pages/bookmall/bookmall.js
import api from "../../http/api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr: ['分类', '排行'],
    num: 0,
    female: [],
    male: [],
    press: [],
    female_item: [],
    male_item: []
  },
  clickItem(e) {
    let index = e.currentTarget.dataset.index
    this.setData({
      num: index
    })
    console.log(e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    api.getCats().then(res => {
      // console.log(res)
      this.setData({
        female: res.female,
        male: res.male,
        press: res.press
      })
    }).catch(err => {
      console.log(err)
    })
    api.rankCategory().then(res => {
      console.log(res)
      res.female.map(item=>{
        item.cover = 'https://statics.zhuishushenqi.com' + item.cover
      })
      res.male.map(item=>{
        item.cover = 'https://statics.zhuishushenqi.com' + item.cover
      })
      this.setData({
        female_item: res.female.slice(0,6),
        male_item: res.male.slice(0,6)
      })
    }).catch(err => {
      console.log(err)
    })
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