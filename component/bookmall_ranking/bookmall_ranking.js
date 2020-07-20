// component/bookmall_ranking/bookmall_ranking.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array
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
    clickItem(e) {
      console.log(e.currentTarget.dataset.item)
      let rank_title = e.currentTarget.dataset.item.title
      let rank_id = e.currentTarget.dataset.item._id
      let rank_monthRank = e.currentTarget.dataset.item.monthRank
      let rank_totalRank = e.currentTarget.dataset.item.totalRank
      wx.setStorageSync('rank_title', rank_title)
      wx.setStorageSync('rank_id', rank_id)
      wx.setStorageSync('rank_monthRank', rank_monthRank)
      wx.setStorageSync('rank_totalRank', rank_totalRank)
      wx.navigateTo({
        url: '/pages/ranking/ranking',
      })
    }
  }
})