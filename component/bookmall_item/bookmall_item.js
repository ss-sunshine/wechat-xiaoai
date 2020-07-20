// component/bookmall/bookmall_item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list:{
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
    goto(e){
      // console.log(e)
      wx.navigateTo({
        url: `/pages/bookmall_class/bookmall_class?title=${e.currentTarget.dataset.item.name}`,
      })
      wx.setStorageSync('title', e.currentTarget.dataset.item.name)
    }
  }
})
