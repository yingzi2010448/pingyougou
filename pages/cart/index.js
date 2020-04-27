import { getSetting, chooseAddress, openSetting, showModal, showToast} from "../../utils/wxAsync.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

 
  data: {
    address: {},
    cart:[],
    isAllChecked:true,
    totalPrice:0,
    totalNum:0

  },

  
  onLoad: function (options) {

  },

  onShow: function() {
    const address = wx.getStorageSync('addressStorage');
    // 获取购物车缓存
    const cart = wx.getStorageSync('catStorage') || [];

    this.setData({address});
    // 结算购物车数据
    this.setCart(cart);
  },
  
  //选择收货地址
  async chooseRecevieAddress(){
  //   wx.getSetting({
  //     success: (result)=>{
  //       // 收货地址权限
  //       const scopeAddress = result.authSetting['scope.address'];
  //       // 如果已经允许调用收货地址权限或者没使用过
  //       if(scopeAddress === true || scopeAddress === undefined){
  //         wx.chooseAddress({
  //           success: (result2)=>{
  //             console.log(result2);
  //           }
  //         });
  //         // 如果曾拒绝给予收货地址权限，引导用户重新开放收货地址权限
  //       }else{
  //         wx.openSetting({
  //           success: (result3)=>{
  //             console.log(result3);
  //           }
  //         });
  //       }
  //     }
  //   });
     // 优化后
     try {
       const result = await getSetting();
       const scopeAddress = result.authSetting['scope.address'];
       if (scopeAddress === false){
         await openSetting();
       }
       let address = await chooseAddress();
       address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
       wx.setStorageSync("addressStorage", address);    
     } catch (error) {
       console.log(error)
     }
       

  },
  
  // 设置购物车结算数据
  setCart(cart){
    let isAllChecked = true;
    // let isAllChecked = cart.length? cart.every(i => i.checked === true): false; 
    // every：回调函数的值全部为true才为true，找到一个false就返回false;空数组调用every返回true
    let totalNum = 0,totalPrice = 0;
    cart.forEach(i => {
      if(i.checked){
        totalPrice += i.goods_price * i.num;
        totalNum += i.num
      }else{
        isAllChecked = false
      }
    });
    isAllChecked = cart.length !==0 ? isAllChecked : false;
    
    this.setData({
      cart,
      isAllChecked,
      totalPrice,
      totalNum
    });
    
    // 缓存数据
    wx.setStorageSync('catStroage',cart)
  },
  
  // 改变购物车中商品选择状态
  handleItemChange(e){
    // 找到该商品的id
    const goods_id = e.currentTarget.dataset.id;
    const { cart } = this.data;
    // 找到该商品id在商品数据中的索引
    let index = cart.findIndex(i => i.goods_id === goods_id);
    
    // checked属性取反
    cart[index].checked =! cart[index].checked;

    // 重新计算
    this.setCart(cart);
  },
  // 全选
  handleItemAllCheck() {
    let { cart, isAllChecked } = this.data;
    //点击全选后取反
    isAllChecked = !isAllChecked;
    // 购物中的商品的选取状态跟着全选状态改变
    cart.forEach(i => i.checked = isAllChecked);
    // 重新结算数据
    this.setCart(cart);
  },
  // 编辑商品数量
  async handleItemNum(e){
    const { operation,id } = e.currentTarget.dataset;
    let { cart } = this.data;
    const index = cart.findIndex( i => i.goods_id === id);
    // 当前商品数量为1时，用户减少商品数量触发提示
    if(cart[index].num === 1 && operation === -1){
      const res = await showModal({content:'您要删除该商品吗？'});
      if(res.confirm){
        // 根据索引删除该商品
        cart.splice(index, 1);
        this.setCart(cart);
      }
    }else{
      cart[index].num += operation;
      this.setCart(cart);
    }
  },
  
  // 结算
  async handlePay() {
    const { address, totalNum} = this.data
    if(!address.userName){
      return await showToast({title:'您还没有添加收货地址'});
    }
    if(totalNum === 0){
      return await showToast({title:'您还没有添加商品'});
    }
    wx.navigateTo({
      url: '/pages/pay/index'
    });
  }
})