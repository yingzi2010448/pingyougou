// pages/collect/index.js
Page({

  data: {
    collectList: [],
    tabs: [
      {
        id: 0,
        value: '商品收藏',
        isActive: true
      },
      {
        id: 1,
        value: '品牌收藏',
        isActive: false
      },
      {
        id: 2,
        value: '店铺收藏',
        isActive: false
      },
      {
        id: 3,
        value: '浏览足迹',
        isActive: false
      }
    ]

  },


  onLoad: function (options) {
    const collectStorage = wx.getStorageSync('collectStorage') || [];

    this.setData({
      collectList: collectStorage
    })

  },

  handleTabsItemChange(e) {
    // 接受子组件传进来的当前tab栏索引
    const { index } = e.detail;
    let { tabs } = this.data;
    // 循环遍历tabs，修改tabs.isActive的值
    tabs.forEach((v, i) => {
      return i === index ? v.isActive = true : v.isActive = false
    });
    this.setData({
      tabs
    });
  }

})