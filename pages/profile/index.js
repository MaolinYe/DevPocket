Page({
  data: { imgError: false },
  onAbout() {
    wx.showModal({ title: '关于我们', content: '程序员口袋 - 纯前端工具箱，所有数据本地存储。' })
  },
  onFeedback() {
    wx.showModal({ title: '意见反馈', content: '欢迎通过 issues 或邮件提交反馈（示例文本）。' })
  },
  onImgError() { this.setData({ imgError: true }) },
  onShareAppMessage() {
    return { title: '程序员口袋：面向开发者的纯前端工具箱', path: '/pages/tools/index' }
  }
})
