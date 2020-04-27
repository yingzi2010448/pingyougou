// pages/login/index.js
Page({
  handleLogin(e) {
    const { userInfo } = e.detail;
    
    wx.setStorageSync('userInfoStorage', userInfo);
    wx.navigateBack({
      delta: 1
    });
  }
 

})