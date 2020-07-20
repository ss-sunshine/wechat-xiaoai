// component/ranking_Item/ranking_Item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
books:{
  type:Array
}
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    detail(e){
      // console.log(e.currentTarget.dataset.item._id)
      let book_id = e.currentTarget.dataset.item._id
      wx.setStorageSync('detail_id', book_id)
      wx.navigateTo({
        url: '/pages/detail/detail',
      })
    }
  }
})
