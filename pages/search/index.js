import regeneratorRuntime from '../../lib/runtime/runtime';
import { request } from "../../request/index.js";
Page({

  
  data: {
    //满足的商品列表
    searchList:[],
    //取消框的显示
    isFocus: false,
    inputValue:''

  },
  // 定时器
  timeoutPoint: -1,

  onLoad: function (options) {

  },

  handleInput(e) {
    const { value } = e.detail;
    // 值校验，不能为空
    if(!value.trim()) {
      this.setData({
        searchList:[],
        isFocus:false
      });
      return
    };
    this.setData({isFocus:true});
    // 节流措施
    clearTimeout(this.timeoutPoint);

    this.timeoutPoint = setTimeout(() =>{
      this.searchGoods(value)
    }, 1000)
    // this.searchGoods(value);
  },
  
  // 根据关键字搜索商品
  async searchGoods(query) {
    const res = await request({url:'/goods/search', data:{ query }});
    this.setData({
      searchList:res.data.message.goods
    });
  },
  //取消搜索
  handleCancel(){
    //初始化数据
    this.setData({
      inputValue: '',
      isFocus: false,
      searchList:[]
    });
  }
})