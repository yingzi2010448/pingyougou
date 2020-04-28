// pages/feedback/index.js
Page({

  data: {
    tabs: [
      {
        id: 0,
        value: '体验问题',
        isActive: true
      },
      {
        id: 1,
        value: '商品上架投诉',
        isActive: false
      }
    ],
    chooseImgs: [],
    textValue: ''

  },
  timeoutPoint: -1,
  UpLoadImgs: [],


  onLoad: function (options) {

  },
  // 切换tab栏
  changeTabsItem(e) {
    // console.log(e);
    const { index } = e.detail;
    let { tabs } = this.data;
    tabs.forEach((v, i) => {
      return i === index ? v.isActive = true : v.isActive = false
    });
    this.setData({ tabs });
  },
  //添加图片
  handleChooseImg() {
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (result) => {
        // console.log(result);
        this.setData({
          // 可重选图片，进行数组拼接
          chooseImgs: [...this.data.chooseImgs, ...result.tempFilePaths]
        });
      }
    });
  },
  // 删除图片
  handleRemoveImg(e) {
    const { index } = e.currentTarget.dataset;
    let { chooseImgs } = this.data;
    // 重数组中删除图片对应索引的照片
    chooseImgs.splice(index, 1);
    this.setData({ chooseImgs });
  },
  // 输入框文本存储
  handleTextInput(e) {
    // console.log(e);
    // 防抖
    clearTimeout(this.timeoutPoint);
    this.timeoutPoint = setTimeout(() => {
      this.setData({
        textValue: e.detail.value
      });
    }, 3000);
  },
  //提交
  handleFormSubmit() {
    let { chooseImgs, textValue } = this.data;
    if (!textValue.trim()) {
      return wx.showToast({
        title: '不能为空',
        icon: 'none',
        mask: true,
      });
    }
    wx.showLoading({
      title: '上传中，请稍后',
      mask: true
    });
    if (chooseImgs.length !== 0) {
      //     1.不能为数组，循环遍历上传到外网
      chooseImgs.forEach((v, i) => {
        wx.uploadFile({
          url: 'https://imgchr.com/i/MjaXxU',
          filePath: v,
          name: 'file',
          formData: {},
          success: (result) => {
            // console.log(result);
            // 2.获取外网地址
            let url = result.cookies[0];
            // 3.将外面地址存储到上传图片数组中
            this.UpLoadImgs.push(url);
            // wx.hideLoading();
            // 4.所有图片上传完毕后
            if (chooseImgs.length === -1) {
              wx.hideLoading();
              //初始化本地数据
              this.setData({
                textValue: '',
                chooseImgs: []
              });
            };
            // 5.返回上一页
            wx.navigateBack({
              delta: 1
            });
          }
        });
      })
    }else{ //只上传文本域
      wx.hideLoading();
      wx.navigateBack({
        delta: 1
      });
    }
  }

})