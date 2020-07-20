const {
  default: api
} = require("../../http/api")

// pages/ranking/ranking.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr:['周榜','月榜','总榜'],
    rank_id: '',
    rank_monthRank: '',
    rank_totalRank: '',
    num:0,
    flag:true,
    books:[]
  },
  clickItem(e) {
    let index = e.currentTarget.dataset.index
    this.setData({
      num: index
    })
    if(this.data.num===0){
      this.rankInfo()
    }else if(this.data.num===1){
      this.rank_monthRank()
    }else if(this.data.num===2){
      this.rank_totalRank()
    }
  },
  rank_totalRank(){
    api.rankInfo(this.data.rank_totalRank).then(res => {
      // console.log(res.ranking.books)
      res.ranking.books.map(item=>{
        item.cover = 'https://statics.zhuishushenqi.com' + item.cover
      })
      this.setData({
        books: res.ranking.books
      })
    }).catch(err => {
      console.log(err)
    })
  },
  rank_monthRank(){
    api.rankInfo(this.data.rank_monthRank).then(res => {
      // console.log(res.ranking.books)
      res.ranking.books.map(item=>{
        item.cover = 'https://statics.zhuishushenqi.com' + item.cover
      })
      this.setData({
        books: res.ranking.books
      })
    }).catch(err => {
      console.log(err)
    })
  },
  rankInfo() {
    api.rankInfo(this.data.rank_id).then(res => {
      console.log(res.ranking.books)
      res.ranking.books.map(item=>{
        item.cover = 'https://statics.zhuishushenqi.com' + item.cover
      })
      this.setData({
        books: res.ranking.books
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
      title: wx.getStorageSync('rank_title')
    })
    this.setData({
      //周
      rank_id: wx.getStorageSync('rank_id'),
      //月
      rank_monthRank: wx.getStorageSync('rank_monthRank'),
      //总
      rank_totalRank: wx.getStorageSync('rank_totalRank')
    })
    console.log(this.data.rank_monthRank)
    this.rankInfo()
    if(this.data.rank_monthRank===''&&this.data.rank_totalRank===''){
      this.setData({
        flag:false
      })
    }
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