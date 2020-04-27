import { request } from '../../request/index.js'
//导入支持async
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({


  data: {
    tabs: [
      {
        id: 0,
        value: '全部',
        isActive: true
      },
      {
        id: 1,
        value: '待付款',
        isActive: false
      },
      {
        id: 2,
        value: '待收货',
        isActive: false
      },
      {
        id: 3,
        value: '退款/退货',
        isActive: false
      }
    ],
    orders: [{
      "order_number": "HMDD20190802000000000428",
      "order_price": 13999,
      "create_time": 1564731518
    }, {
      "order_number": "HMDD20190802000000000428",
      "order_price": 13999,
      "create_time": 1564731518
    }, {
      "order_number": "HMDD20190802000000000428",
      "order_price": 13999,
      "create_time": 1564731518
    }, {
      "order_number": "HMDD20190802000000000428",
      "order_price": 13999,
      "create_time": 1564731518
    }],

  },

  onShow: function () {
    const token = wx.getStorageSync("token");
    if (!token) {
      return wx.navigateTo({
        url: '/pages/auth/index'
      });
    }

    // 小程序页面栈最大长度为10
    let pages = getCurrentPages();
    // 当前页面的索引为最后一个
    let currentPage = pages[pages.length - 1];
    // 拿到当前页面的参数
    const { type } = currentPage.options;
    this.changeTitleByIndex(type - 1)
    this.getOrders(type);



  },
  changeTitleByIndex(index) {
    let { tabs } = this.data;
    // 循环遍历tabs，修改tabs.isActive的值
    tabs.forEach((v, i) => {
      return i === index ? v.isActive = true : v.isActive = false
    });
    this.setData({
      tabs
    });
  },

  changeTabsItem(e) {
    // 接受子组件传进来的当前tab栏索引
    const { index } = e.detail;
    this.changeTitleByIndex(index);
    // type(1):index(0)
    this.getOrders(index + 1)
  },

  async getOrders(type) {
    // const res = await request({ url: '/my/orders/all', data: { type } });

    let orders = this.data.orders
    let newOrders = orders.map(i => ({
      ...i,
      create_time_filter: (new Date(i.create_time * 1000).toLocaleString())
      })
    );
    this.setData({
      orders: newOrders
    });
  }

})