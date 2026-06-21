Page({
  data: {
    imgError: false
  },

  onShow(){
    const tabBar = this.getTabBar && this.getTabBar()
    if (tabBar) tabBar.setData({ active: 2 })  
  },

  onImgError() {
    this.setData({
      imgError: true
    })
  },

  onAbout() {
    wx.showModal({
      title: '关于程序员口袋',
      content: '一个专为开发者打造的轻量级工具集合。',
      showCancel: false
    })
  },

  onFeedback() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    })
  },

  onShareAppMessage() {
    return {
      title: '程序员口袋 - 开发者工具箱',
      path: '/pages/tools/index'
    }
  },

  onShare() {
  wx.showShareMenu({
    menus: ['shareAppMessage']
  })
}
})