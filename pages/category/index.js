// pages/category/index.js
import { request } from '../../request/index.js'
//导入支持async
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    leftList:[],
    rightContent:[],
    // 初始左侧菜单索引
    currentIndex:0,
    // 右侧scroll-view距顶部的距离
    scrollTop: 0

  },
  catesList: [],

  onLoad: function () {
    // 获取本地缓存
    const catesStorage = wx.getStorageSync('catslist');
    if(!catesStorage){
      // 如不存在，直接获取
      this.getcates();
    }else if(Date.now()- catesStorage.time > 1000 * 20){
      // 如果缓存数据已经过期，重新获取
      this.getcates()
    }else{
      // 使用本地缓存
      this.catesList = catesStorage.data;
      let leftList = this.catesList.map(i => i.cat_name);
      let rightContent = this.catesList[0].children;
      this.setData({
        leftList,
        rightContent
      });
    }
  },

  async getcates(){
    const res = await request({ url:'/categories' });
    this.catesList = res.data.message;
    //缓存本地数据，提升性能
    wx.setStorageSync('catsList', {time: Date.now(), data: this.catesList});
    //左侧菜单数据
    let leftList  = this.catesList.map(i => i.cat_name);
    //右侧内容数据
    let rightContent = this.catesList[0].children;
    this.setData({
      leftList,
      rightContent
    });
  },
  

  //点击左侧菜单
  changeLeft(e){
    //获取当前点击切换菜单的索引
    const { index } = e.currentTarget.dataset;
    //根据索引切换右侧菜单显示数据
    let rightContent = this.catesList[index].children;
    this.setData({
      currentIndex:index,
      rightContent,
      //重置右侧scroll-view距离顶部的距离，提升体验
      scrollTop: 0
    });
  }
})