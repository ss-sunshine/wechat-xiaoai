const {
  default: api
} = require("../../http/api")

// pages/bookmall_class/bookmall_class.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    typeList: [{
        id: 'hot',
        name: '热门'
      },
      {
        id: 'new',
        name: '新书'
      },
      {
        id: 'reputation',
        name: '好评'
      },
      {
        id: 'over',
        name: '完结'
      },
      {
        id: 'monthly',
        name: 'VIP'
      }
    ],
    female_mins: [],
    male_mins: [],
    press_mins: [],
    list: [],
    num: 0,
    sum: 0,
    gender: '',
    type: '',
    major: '',
    minor: '',
    start: 0,
    books: [],
    limit: 20
  },
  clickItem_one(e) {
    let index = e.currentTarget.dataset.index
    let item = e.currentTarget.dataset.item
    this.setData({
      num: index,
      type: item.id,
      major: wx.getStorageSync('title')
    })
    // console.log(this.data.minor)
    wx.setStorageSync('minor', this.data.minor)
    api.getCatsBooks(this.data.gender, this.data.type, this.data.major, '', this.data.start).then(res => {
      console.log(res)
      res.books.map(item => {
        item.cover = 'https://statics.zhuishushenqi.com' + item.cover
        item.tags = item.tags.slice(0, 3)
      })
      this.setData({
        books: res.books
      })
    }).catch(err => {
      console.log(err)
    })
  },
  clickItem_two(e) {
    let index = e.currentTarget.dataset.index
    let item = e.currentTarget.dataset.item
    this.setData({
      sum: index,
      minor: item,
      major: wx.getStorageSync('title')
    })
    // console.log(this.data.type)
    if (this.data.sum !== 0) {
      wx.setStorageSync('minor', this.data.minor)
      api.getCatsBooks(this.data.gender, this.data.type, this.data.major, this.data.minor, this.data.start).then(res => {
        console.log(res)
        res.books.map(item => {
          item.cover = 'https://statics.zhuishushenqi.com' + item.cover
          item.tags = item.tags.slice(0, 3)
        })
        this.setData({
          books: res.books
        })
      }).catch(err => {
        console.log(err)
      })
    }
    if (this.data.sum === 0) {
      wx.setStorageSync('minor', '')
      // console.log(wx.getStorageSync('minor'))
      api.getCatsBooks(this.data.gender, this.data.type, this.data.major, '', this.data.start).then(res => {
        console.log(res)
        res.books.map(item => {
          item.cover = 'https://statics.zhuishushenqi.com' + item.cover
          item.tags = item.tags.slice(0, 3)
        })
        this.setData({
          books: res.books
        })
      }).catch(err => {
        console.log(err)
      })
    }
  },
  getData() {
    api.getCatsBooks(this.data.gender, this.data.type, this.data.major, this.data.minor, this.data.start).then(res => {
      wx.hideLoading()
      wx.hideNavigationBarLoading()
      res.books.map(item => {
        item.cover = 'https://statics.zhuishushenqi.com' + item.cover
        item.tags = item.tags.slice(0, 3)
      })
      this.setData({
        books: this.data.books.concat(res.books)
      })
      // console.log(this.data.books)
    }).catch(err => {
      console.log(err)
    })
  },
  getMinor() {
    //loading弹框
    wx.showLoading({
      title: '加载中...',
    })
    api.getMinor().then(res => {
      console.log(res)
      //female
      res.female.map(item => {
        if (wx.getStorageSync('title') === item.major) {
          if (item.mins.length > 0) {
            item.mins.unshift('全部')
          }
          this.setData({
            list: item.mins,
            gender: 'female'
          })
          if (this.data.num === 0 && this.data.sum === 0) {
            this.setData({
              type: this.data.typeList[0].id,
              major: wx.getStorageSync('title'),
              gender: this.data.gender
            })
            console.log(this.data.gender)
            api.getCatsBooks(this.data.gender, this.data.type, this.data.major, '', this.data.start).then(res => {
              wx.hideLoading()
              console.log(res)
              res.books.map(item => {
                item.cover = 'https://statics.zhuishushenqi.com' + item.cover
                item.tags = item.tags.slice(0, 3)
              })
              this.setData({
                books: res.books
              })
            }).catch(err => {
              console.log(err)
            })
          }
          // wx.setStorageSync('gender', this.data.gender)
        }
      })
      // console.log(this.data.list)
      //male
      res.male.map(item => {
        if (wx.getStorageSync('title') === item.major) {
          if (item.mins.length > 0) {
            item.mins.unshift('全部')
          }
          this.setData({
            list: item.mins,
            gender: 'male'
          })
          if (this.data.num === 0 && this.data.sum === 0) {
            this.setData({
              type: this.data.typeList[0].id,
              major: wx.getStorageSync('title'),
              gender: this.data.gender
            })
            console.log(this.data.gender)
            api.getCatsBooks(this.data.gender, this.data.type, this.data.major, '', this.data.start).then(res => {
              wx.hideLoading()
              console.log(res)
              res.books.map(item => {
                item.cover = 'https://statics.zhuishushenqi.com' + item.cover
                item.tags = item.tags.slice(0, 3)
              })
              this.setData({
                books: res.books
              })
            }).catch(err => {
              console.log(err)
            })
          }
          // wx.setStorageSync('gender', this.data.gender)
        }
      })
      //press
      res.press.map(item => {
        if (wx.getStorageSync('title') === item.major) {
          if (item.mins.length > 0) {
            item.mins.unshift('全部')
          }
          this.setData({
            list: item.mins,
            gender: 'press'
          })
          if (this.data.num === 0 && this.data.sum === 0) {
            this.setData({
              type: this.data.typeList[0].id,
              major: wx.getStorageSync('title'),
              gender: this.data.gender
            })
            console.log(this.data.gender)
            api.getCatsBooks(this.data.gender, this.data.type, this.data.major, '', this.data.start).then(res => {
              wx.hideLoading()
              console.log(res)
              res.books.map(item => {
                item.cover = 'https://statics.zhuishushenqi.com' + item.cover
                item.tags = item.tags.slice(0, 3)
              })
              this.setData({
                books: res.books
              })
            }).catch(err => {
              console.log(err)
            })
          }
          // wx.setStorageSync('gender', this.data.gender)
        }
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
      title: wx.getStorageSync('title')
    })
    //小类数据
    this.getMinor()
    // this.getData()
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setStorageSync('minor', this.data.minor)
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
    wx.showNavigationBarLoading()
    this.setData({
      minor: wx.getStorageSync('minor'),
      major: wx.getStorageSync('title'),
      start: this.data.start + this.data.limit
    })
    setTimeout(() => {
      this.getData()
    }, 1500)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showLoading({
      title: '加载中...',
    })
    this.setData({
      minor: wx.getStorageSync('minor'),
      major: wx.getStorageSync('title'),
      start: this.data.start + this.data.limit
    })
    setTimeout(() => {
      this.getData()
    }, 1500)
    // console.log(this.data.gender)
    // console.log(this.data.type)
    // console.log(this.data.major)
    // console.log(this.data.minor)
    // console.log(this.data.start)
    // console.log(this.data.books)

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})