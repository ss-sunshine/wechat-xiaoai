// component/bookshelf_item/bookshelf_item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    bookshelf: {
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    flag: false,
    bookshelf: [],
    num: 0,
    animation: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickHelp() {
      wx.navigateTo({
        url: '/pages/help/help',
      })
    },
    refresh() {
      //如果想要用data当中的数据 this.data.xxx
      //如果想要改数据，要通过this.setData({})
      // this.data.flag = true
      this.setData({
        flag: true
      })
      //文字弹框
      setTimeout(() => {
        wx.showToast({
          title: '刷新成功',
          icon: 'none',
          duration: 2000 //持续的时间
        })
        this.setData({
          flag: false
        })
      }, 1000)
    },
    detail(e) {
      // console.log(e.currentTarget.dataset.item._id)
      let book_id = e.currentTarget.dataset.item._id
      wx.setStorageSync('detail_id', book_id)
      wx.navigateTo({
        url: '/pages/detail/detail',
      })
    },
    edit() {
      if (this.data.num === 0) {
        this.setData({
          num: 1
        })
      } else if (this.data.num === 1) {
        this.setData({
          num: 0
        })
      }
    },
    del(e) {
      // console.log(e.currentTarget.dataset.item._id)
      let book_id = e.currentTarget.dataset.item._id
      let bookshelf_detail = wx.getStorageSync('bookshelf_detail')
      let arr = bookshelf_detail.filter(item => {
        return item._id !== book_id
      })
      this.setData({
        bookshelf: arr
      })
      // console.log(arr)
      wx.setStorageSync('bookshelf_detail', this.data.bookshelf)
      wx.showToast({
        title: '删除成功',
        icon: 'success'
      })
    }
  },
  ready() {
    // //item
    // this.setData({
    //   bookshelf: wx.getStorageSync('bookshelf_detail')
    // })
  }

})