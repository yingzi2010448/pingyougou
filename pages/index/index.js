// 导入用promise封装后的ajxa请求
import { request } from '../../request/index.js'
//Page Object
Page({
  data: {
    //初始化轮播图数据
    swiperList: [],
    //初始化导航数据
    catesList: [
    ],
    floorList: []

  },
  //options(Object)
  onLoad: function (options) {
    //请求轮播图数据
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (res)=>{
    //     console.log(res.data.message);
    //     this.setData({
    //       swiperList: res.data.message
    //     });
    //   }
    // });
    this.getswiperList();
    this.getcatesList();
    this.getfloorList();
  },

  // 获取轮播数据
  getswiperList() {
    request({ url: '/home/swiperdata' })
      .then(res => {
        this.setData({
          swiperList: res.data.message
        });
      });
  },

  //获取导航数据
  getcatesList() {
    request({ url: '/home/catitems' })
      .then(res => {
        this.setData({
          catesList: res.data.message
        });
      });
  },
  //获取楼层数据
  getfloorList(){
    request({ url: '/home/floordata' })
      .then(res => {
        this.setData({
          floorList: res.data.message
        });
      });
  }



});