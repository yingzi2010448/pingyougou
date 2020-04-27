// pages/goods_list/index.js
import { request } from '../../request/index.js'
//导入支持async
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({  
  data: {
    tabs:[
      {
        id: 0,
        value:'综合',
        isActive: true
      },
      {
        id: 1,
        value:'销量',
        isActive: false
      },
      {
        id: 2,
        value:'退款/退货',
        isActive: false
      }
    ],
    // 商品列表
    goodsList:[]
  },
  // 商品参数
  queryInfo: {
    query: '',
    cid:'',
    pagenum:1,
    pagesize:10
  },
  //商品总页数
  totalPages:1,

  onLoad: function (options) {
    this.queryInfo.cid = options.cid;
    this.getgoodsList();
  },
  // 获取商品列表
  async getgoodsList() {
    const res  = await request({url:'/goods/search', data: this.queryInfo });  
    //商品总数量
    const goodsTotal = res.data.message.total;
    // 向上取整商品总页数
    this.totalPages = Math.ceil(goodsTotal/this.queryInfo.pagesize)
    this.setData({
      // 数组拼接，上拉加载下一页时不重新获取整个商品列表，而是继续加载下一页
      goodsList:[...this.data.goodsList, ...res.data.message.goods] 
    });

    wx.stopPullDownRefresh(); //关闭下拉刷新加载条，如果没有也不会报错
  },

  // 切换tab栏
  changeTabsItem(e){
    // 接受子组件传进来的当前tab栏索引
    const { index } = e.detail;
    let { tabs } = this.data;
    // 循环遍历tabs，修改tabs.isActive的值
    tabs.forEach((v,i) => {
      return i===index? v.isActive=true : v.isActive= false
    });
    this.setData({
      tabs
    });
  },
  
  // 上拉加载下一页
  onReachBottom: function () {
    // 如果目前的页数大于商品总页数
    if(this.queryInfo.pagenum > this.totalPages) {
      wx.showToast({
        title: '已经到底了'});
    }else{
      // 加载下一页数据，当前商品页数++，获取下一页商品列表
      this.queryInfo.pagenum++;
      this.getgoodsList();
    }
  },
  

  //下拉刷新，需在json在配置enablePullDownRefresh属性
  onPullDownRefresh: function () {
    this.setData({
      goodsList:[]
    });
    this.queryInfo.pagenum = 1;
    this.getgoodsList();
    // 下拉刷新：重置商品列表，重置商品参数的页数，重新获取商品列表
  }
})