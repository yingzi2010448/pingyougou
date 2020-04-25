import { request } from '../../request/index.js'
//导入支持async
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  
  data: {
    goodsObj:{}

  },

  goodsInfo:{},

  onLoad: function (options) {
    const {goods_id} = options;
    this.getgoodsObj(goods_id);

  },
  
  // 根据商品id获取商品详情
  async getgoodsObj(goods_id) {
    const res = await request({url:'/goods/detail', data: {goods_id} });
    const goods = res.data.message;
    this.goodsInfo = res.data.message;
    this.setData({
      goodsObj: {
        goods_name: goods.goods_name,
        goods_price: goods.goods_price,
        goods_introduce: goods.goods_introduce.replace(/\.webp/g, '.jpg'), //将.webp格式修改为.jpg格式
        pics: goods.pics,
      }
    });
  },
  

  //点击放大轮播图
  imagePreview(e) {
    // 轮播图地址数组
    const urls = this.goodsInfo.pics.map(i => i.pics_mid);
    // 当前显示图片的地址
    const currentUrl = e.currentTarget.dataset.url;
    wx.previewImage({
      current: currentUrl,
      urls
    });
  },
  

  // 加入购物车
  addCatesCat() {
    // 获取购车商品缓存
    let catesCatStorage = wx.getStorageSync('catStorage') || [];
    // 在购物车商品id中过寻找当前商品id对应的索引
    let index = catesCatStorage.findIndex(i => i.goods_id === this.goodsInfo.goods_id);
    if (index === -1){
      // 如果没有，则是新添加进购物车的商品，为其添加新属性：数量和是否添加
      this.goodsInfo.num = 1;
      this.goodsInfo.checked = true;
      // 再将其添加进缓存数据中
      catesCatStorage.push(this.goodsInfo);
    }else{
      // 如果有，则该商品对应的数量+1
      catesCatStorage[index].num++;
    }
    // 添加缓存
    wx.setStorageSync('catStorage',catesCatStorage);
    wx.showToast({
      title: '加入购物车成功',
      icon: 'successs',
      // 防频繁触发
      mask: true,
    });

  }



})