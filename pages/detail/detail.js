// pages/detail/detail.js
import api from "../../http/api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book_id: '',
    detail: {},
    arr: ['开始阅读', '加入书架'],
    list: ['详情', '评价'],
    num: 0,
    sum: 0,
    books: [],
    bookList: [],
    docs: [],
    chapters: '',
    flag: false
  },
  detail(e) {
    // console.log(e.currentTarget.dataset.item._id)
    let book_id = e.currentTarget.dataset.item._id
    wx.setStorageSync('detail_id', book_id)
    wx.navigateTo({
      url: '/pages/detail/detail',
    })
  },
  clickNew() {
    this.getbooks()
  },
  getbooks() {
    api.relatedRecommendedBooks(this.data.book_id).then(res => {
      console.log(res)
      res.books.map(item => {
        item.cover = 'https://statics.zhuishushenqi.com' + item.cover
      })
      this.setData({
        books: res.books
      })
      //while循环   不满足条件跳出循环
      // let arr = []
      // let add = 0
      // while (add < 3) {
      //   let num = Math.floor(30 * Math.random());
      //   if (arr.indexOf(num) == -1) {
      //     arr.push(num)
      //     add++
      //   }
      // }
      // console.log(arr)

      //parseInt强制取整  0~length-1
      //Math.random() 0~1之间的小数
      let num1 = parseInt(Math.random() * this.data.books.length)
      let num2 = parseInt(Math.random() * this.data.books.length)
      let num3 = parseInt(Math.random() * this.data.books.length)
      if (num1 !== num2 && num1 !== num3 && num2 !== num3) {
        let list = []
        list.push(this.data.books[num1])
        list.push(this.data.books[num2])
        list.push(this.data.books[num3])
        this.setData({
          bookList: list
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  clickItem(e) {
    let index = e.currentTarget.dataset.index
    this.setData({
      num: index
    })
    if (this.data.num === 0) {
      wx.setStorageSync('bookChapters', this.data.book_id)
      wx.setStorageSync('bookTitle', this.data.detail.title)
      wx.navigateTo({
        url: '/pages/bookChapters/bookChapters',
      })
    } else if (this.data.num === 1) {
      //item
      this.setData({
        arr: ['开始阅读', '已加入书架']
      })
      if (wx.getStorageSync('bookshelf_detail')) {
        let bookshelfdetail = wx.getStorageSync('bookshelf_detail')
        let index = bookshelfdetail.findIndex(item => {
          return item._id === this.data.detail._id
        })
        console.log(index)
        if (index < 0) {
          //没有
          bookshelfdetail.push(this.data.detail)
          wx.setStorageSync('bookshelf_detail', bookshelfdetail)
          wx.showToast({
            title: '加入书架成功',
            icon: 'success',
            duration: 2000 //持续的时间
          })
        } else {
          //有了
          wx.showToast({
            title: '您已经添加了',
            icon: 'none',
            duration: 2000 //持续的时间
          })
        }
      } else {
        let arr = []
        arr.push(this.data.detail)
        wx.setStorageSync('bookshelf_detail', arr)
      }

    }
  },
  clickItem1(e) {
    let index = e.currentTarget.dataset.index
    this.setData({
      sum: index
    })
  },
  //评价
  shortReviews() {
    api.shortReviews(this.data.book_id).then(res => {
      console.log(res.docs)
      res.docs.map(item => {
        item.author.avatar = 'https://statics.zhuishushenqi.com' + item.author.avatar
      })
      this.setData({
        docs: res.docs
      })
    }).catch(err => {
      console.log(err)
    })
  },
  bookInfo() {
    wx.showLoading({
      title: '加载中...',
    })
    this.setData({
      book_id: wx.getStorageSync('detail_id')
    })
    setTimeout(() => {
      api.bookInfo(this.data.book_id).then(res => {
        console.log(res)
        wx.hideLoading()
        res.cover = 'https://statics.zhuishushenqi.com' + res.cover
        this.setData({
          detail: res
        })
      }).catch(err => {
        console.log(err)
      })
    }, 1500)
  },
  clickImg1() {
    // wx.previewImage({
    //   urls: [this.data.detail.cover],
    //   // 当前显示图片的http列表
    // })
    this.setData({
      flag: true
    })
  },
  clickImg2() {
    this.setData({
      flag: false
    })
  },
  // 长按保存图片
  clickSave(e) {
    //显示操作菜单的弹框
    wx.showActionSheet({
      itemList: ['保存图片'],
      success: (res) => {
        if (res.tapIndex === 0) {
          let url = e.currentTarget.dataset.detail.cover;
          //用户需要授权
          wx.getSetting({
            //回调函数（普通函数/箭头函数）
            //普通：this指向window
            //箭头：this指向函数里面定义的
            success: (res) => {
              if (!res.authSetting['scope.writePhotosAlbum']) {
                wx.authorize({
                  scope: 'scope.writePhotosAlbum',
                  success: () => {
                    // 同意授权
                    this.saveImg1(url);
                  },
                  fail: (res) => {
                    console.log(res);
                  }
                })
              } else {
                // 已经授权了
                this.saveImg1(url);
              }
            },
            fail: (res) => {
              console.log(res);
            }
          })
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
    console.log(e)


  },
  //保存图片，相册授权
  saveImg1(url) {
    wx.getImageInfo({
      src: url,
      success: (res) => {
        let path = res.path;
        //相册授权
        wx.saveImageToPhotosAlbum({
          filePath: path,
          success: (res) => {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 1000 //持续的时间
            })
            setTimeout(()=>{
              this.setData({
                flag: false
              })
            },1000)
            console.log(res);
          },
          fail: (res) => {
            console.log(res);
          }
        })
      },
      fail: (res) => {
        console.log(res);
      }
    })
  },
  clickContent() {
    wx.setStorageSync('bookChapters', this.data.book_id)
    wx.setStorageSync('bookTitle', this.data.detail.title)
    wx.navigateTo({
      url: '/pages/tableContent/tableContent',
    })
  },
  bookshelf() {
    //item
    let bookshelfdetail = wx.getStorageSync('bookshelf_detail')
    let index = bookshelfdetail.findIndex(item => {
      return item._id === this.data.book_id
    })
    // console.log(index)
    if (index < 0) {
      this.setData({
        arr: ['开始阅读', '加入书架']
      })
    } else {
      this.setData({
        arr: ['开始阅读', '已加入书架']
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.bookInfo()
    this.getbooks()
    this.shortReviews()
    this.bookshelf()
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