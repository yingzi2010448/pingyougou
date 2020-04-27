// pages/user/index.js
Page({

  data: {
    userInfo:[],
    collectNum:0

  },


  onShow: function (options) {
    const userInfo = wx.getStorageSync('userInfoStorage');
    const collectStorage = wx.getStorageSync('collectStorage') || [];

    this.setData({
      userInfo,
      collectNum: collectStorage.length
    });

  },


})