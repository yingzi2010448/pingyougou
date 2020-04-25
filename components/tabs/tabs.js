// components/tabs/tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs:{
      type: Array,
      value:[]
    }

  },
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeTabsItem(e) {
      const { index } = e.currentTarget.dataset;
      this.triggerEvent('changeTabsItem', { index });
    }


  }
})
